import { createUIMessageStream, createUIMessageStreamResponse } from "ai";

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "http://localhost:5678/webhook/bobba-union";

const REQUEST_TIMEOUT_MS = 60_000;

/**
 * n8n hands back the whole reply in one JSON body, so there is no upstream
 * stream to forward. We re-emit it as a series of small `text-delta` chunks
 * instead of one giant delta: that is what makes the text render progressively
 * on the client, and it is what lets the user interrupt a long reply before it
 * is fully painted.
 *
 * The reveal is planned against the reply length rather than fixed per chunk,
 * so a 2,000-character answer does not take eight seconds to appear.
 */
const CHUNK_DELAY_MS = 14;
const CHARS_PER_SECOND = 90;
const MIN_REVEAL_MS = 350;
const MAX_REVEAL_MS = 5_000;

/** How many characters to emit per `text-delta` to land on the target duration. */
function planChunkSize(length: number): number {
  if (length <= 0) return 0;

  const targetMs = Math.min(
    MAX_REVEAL_MS,
    Math.max(MIN_REVEAL_MS, (length / CHARS_PER_SECOND) * 1000)
  );
  const chunkCount = Math.max(1, Math.ceil(targetMs / CHUNK_DELAY_MS));

  return Math.max(1, Math.ceil(length / chunkCount));
}


const SESSION_ID_PATTERN = /^[\w-]{1,128}$/;

type IncomingMessage = {
  role?: string;
  parts?: Array<{ type?: string; text?: string }>;
};

type IncomingBody = {
  messages?: IncomingMessage[];
  sessionId?: unknown;
};

function getPartText(part: { type?: string; text?: string }): string {
  return part.type === "text" ? part.text ?? "" : "";
}

function getMessageText(message: IncomingMessage): string {
  return (message.parts ?? []).map(getPartText).join("");
}

// n8n returns { "response": string }. Per the integration contract the `data`
// field was removed, so only `response` is read.
function getReplyText(json: unknown): string {
  if (json == null || typeof json !== "object" || Array.isArray(json)) {
    return "";
  }
  const reply = (json as Record<string, unknown>).response;
  return typeof reply === "string" ? reply : "";
}

export async function POST(req: Request) {
  let body: IncomingBody = {};
  try {
    body = await req.json();
  } catch {
    // fall through with empty body
  }

  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.trim() : "";

  if (!SESSION_ID_PATTERN.test(sessionId)) {
    return Response.json(
      { error: "A valid sessionId is required." },
      { status: 400 }
    );
  }

  const messages = body.messages ?? [];
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");
  const userMessage = lastUserMessage ? getMessageText(lastUserMessage) : "";

  if (!userMessage.trim()) {
    return Response.json(
      { error: "A user message is required." },
      { status: 400 }
    );
  }

  let replyText = "";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message: userMessage }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    const text = await response.text();
    let json: unknown = text;
    try {
      json = JSON.parse(text);
    } catch {
      // keep raw text
    }

    replyText = getReplyText(json);

    if (!replyText.trim()) {
      // n8n returns 200 with an empty body when a node fails before the
      // Respond node runs (no onError configured).
      throw new Error("The assistant returned an empty response");
    }
  } catch (error) {
    const isAbort = error instanceof Error && error.name === "AbortError";
    const isEmptyReply =
      error instanceof Error && error.message === "The assistant returned an empty response";

    console.error("[bobba-union] n8n request failed:", error);

    if (isEmptyReply) {
      replyText =
        "Sorry, the assistant couldn't complete that request. Please try again in a moment.";
    } else {
      const reason = isAbort
        ? "the assistant took too long to respond"
        : error instanceof Error
          ? error.message
          : "Unknown error";

      replyText =
        `Sorry, I couldn't reach the assistant right now. (${reason})\n\n` +
        `Please make sure the n8n workflow is running and the webhook is active.`;
    }
  } finally {
    clearTimeout(timeout);
  }

  const chunkSize = planChunkSize(replyText.length);

  const stream = createUIMessageStream({
    async execute({ writer }) {
      writer.write({ type: "text-start", id: "assistant-response" });

      for (let i = 0; i < replyText.length; i += chunkSize) {
        // The client aborts the request when the user hits "Stop generating",
        // which aborts `req.signal`. Bail out rather than painting the rest of
        // a reply nobody is waiting for.
        if (req.signal.aborted) break;

        writer.write({
          type: "text-delta",
          id: "assistant-response",
          delta: replyText.slice(i, i + chunkSize),
        });

        await new Promise((resolve) => setTimeout(resolve, CHUNK_DELAY_MS));
      }

      writer.write({ type: "text-end", id: "assistant-response" });
      writer.setOutcome({ status: "completed" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
