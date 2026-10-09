import { DefaultChatTransport } from "ai";

export type ChatRole = "user" | "assistant";

export type ChatMessageLike = {
  id: string;
  role: ChatRole;
  parts: Array<{ type: "text"; text: string }>;
};

const SESSION_KEY = "bobba-union.chat.sessionId";

function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `sess-${crypto.randomUUID()}`;
  }
  return `sess-${createId()}${createId()}`;
}

export function getSessionId(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;

    const next = createSessionId();
    window.localStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return createSessionId();
  }
}

export function resetSessionId(): string {
  const next = createSessionId();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(SESSION_KEY, next);
    } catch {
      // ignore storage failures (private mode, quota)
    }
  }
  return next;
}

export const chatTransport = new DefaultChatTransport({
  api: "/api/chat",
  prepareSendMessagesRequest: ({ id, messages, trigger, messageId, body }) => ({
    body: {
      ...body,
      id,
      messages,
      trigger,
      messageId,
      sessionId: getSessionId(),
    },
  }),
});

export function getMessageText(
  part: { type?: string; text?: string }
): string {
  return part.type === "text" ? part.text ?? "" : "";
}

export function createId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function createChat(messages: ChatMessageLike[] = []) {
  const queue: ChatMessageLike[] = [...messages];

  const builder = {
    user(text: string) {
      queue.push({
        id: createId(),
        role: "user",
        parts: [{ type: "text", text }],
      });
      return builder;
    },
    assistant(text: string) {
      queue.push({
        id: createId(),
        role: "assistant",
        parts: [{ type: "text", text }],
      });
      return builder;
    },
    get(n?: number) {
      return n == null ? [...queue] : queue.slice(0, n);
    },
    next(messages: ChatMessageLike[]) {
      return messages;
    },
  };

  return builder;
}
