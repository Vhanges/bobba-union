"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import {
  ArrowUpIcon,
  RotateCcwIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  chatTransport,
  createChat,
  getMessageText,
  resetSessionId,
} from "@/lib/ai";
import { MessageAnimated } from "@/components/message-animated";
import { ChatMarkdown } from "@/components/chat/chat-markdown";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { SuggestionChips, type Suggestion } from "@/components/chat/suggestion-chips";
import {
  AssistantMessageActions,
  UserMessageActions,
} from "@/components/chat/message-actions";
import type { MessageStatus } from "@/components/chat/message-status";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageScrollerProvider } from "@/components/ui/message-scroller";
import {
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
} from "@/components/ui/message-scroller";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const initialMessages = createChat()
  .assistant(
    "Welcome to Bobba Union! I'm here to help you pick the perfect bubble tea, check today's specials, or answer any menu questions. What are you craving?"
  )
  .get();

const SUGGESTIONS: Suggestion[] = [
  { label: "Today's special", prompt: "What's today's special?" },
  { label: "Recommend a drink", prompt: "Recommend me a drink" },
  { label: "Caffeine-free options", prompt: "Do you have caffeine-free options?" },
];

/** Distance from the bottom, in px, still considered "pinned". */
const BOTTOM_THRESHOLD_PX = 48;

export function ChatWidget({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [openThread, setOpenThread] = React.useState(true);
  const [input, setInput] = React.useState("");
  /**
   * True while the viewport is parked at the bottom. Drives whether incoming
   * messages count toward the "New messages" affordance.
   */
  const [isPinnedToBottom, setIsPinnedToBottom] = React.useState(true);
  const [unreadCount, setUnreadCount] = React.useState(0);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);

  /**
   * The composer floats over the message list so text genuinely scrolls behind
   * its blur. That means the list needs bottom padding equal to the composer's
   * height, otherwise the newest message sits permanently underneath it. The
   * height is dynamic (the textarea grows, the starter chips appear and
   * disappear), so it is measured rather than hard-coded.
   */
  const [footerHeight, setFooterHeight] = React.useState(0);

  React.useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const measure = () => setFooterHeight(el.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const {
    messages,
    sendMessage,
    regenerate,
    status,
    error,
    stop,
    setMessages,
  } = useChat({
    transport: chatTransport,
    messages: initialMessages,
  });

  const isLoading = status === "submitted" || status === "streaming";
  const hasInput = input.trim().length > 0;
  const canSend = hasInput && !isLoading;

  const lastMessage = messages[messages.length - 1];
  const lastMessageText = lastMessage
    ? lastMessage.parts.map(getMessageText).join("")
    : "";
  const isLastMessageStreaming =
    status === "streaming" && lastMessage?.role === "assistant";

  /**
   * The typing bubble is only useful until the first token lands — after that
   * it would sit alongside a reply that is already visibly filling in.
   */
  const showTyping =
    isLoading &&
    (status === "submitted" ||
      lastMessage?.role !== "assistant" ||
      lastMessageText.length === 0);

  // Index of the most recent user turn, used for status, edit and retry.
  const lastUserIndex = React.useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === "user") return i;
    }
    return -1;
  }, [messages]);

  const hasUserMessage = lastUserIndex >= 0;

  const lastUserMessageId =
    lastUserIndex >= 0 ? messages[lastUserIndex].id : undefined;
  const lastUserMessageText =
    lastUserIndex >= 0
      ? messages[lastUserIndex].parts.map(getMessageText).join("")
      : "";

  const userMessageStatus: MessageStatus =
    status === "error"
      ? "failed"
      : status === "submitted"
        ? "sending"
        : "sent";

  /* ---------------------------------------------------------------- scroll */

  const seenCountRef = React.useRef(messages.length);

  React.useEffect(() => {
    const arrived = messages.length - seenCountRef.current;
    seenCountRef.current = messages.length;

    if (arrived > 0 && !isPinnedToBottom) {
      setUnreadCount((count) => count + arrived);
    }
  }, [messages.length, isPinnedToBottom]);

  const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    const pinned = distanceFromBottom <= BOTTOM_THRESHOLD_PX;

    setIsPinnedToBottom((wasPinned) => {
      if (pinned && !wasPinned) {
        // Back at the bottom: the backlog has been read.
        setUnreadCount(0);
      }
      return pinned;
    });
  }, []);

  const scrollToLatest = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setUnreadCount(0);
  }, []);

  const handleWheel = React.useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const viewport = event.currentTarget;
      const deltaY = event.deltaY;
      const scrollTopBeforeWheel = viewport.scrollTop;

      // Keep the primitive's normal wheel handling. Some browsers leave the
      // viewport unchanged when the headless scroller is auto-following, so
      // only provide a fallback if no native movement occurred.
      requestAnimationFrame(() => {
        if (
          viewport.isConnected &&
          viewport.scrollTop === scrollTopBeforeWheel &&
          deltaY !== 0
        ) {
          viewport.scrollTop += deltaY;
        }
      });
    },
    []
  );

  /* --------------------------------------------------------------- actions */

  const resetThread = React.useCallback(() => {
    stop();
    setMessages([]);
    setInput("");
    setUnreadCount(0);
    resetSessionId();
    // Remount the scroller so it re-anchors to a now-empty thread.
    setOpenThread(false);
    requestAnimationFrame(() => setOpenThread(true));
  }, [setMessages, stop]);

  /**
   * While a reply is in flight the composer stays visible but is disabled, and
   * "Stop generating" remains available in both the header row and the composer
   * so the user is never trapped waiting on a slow upstream.
   *
   * Note: sending a second message by aborting the in-flight one is not safe
   * with this SDK. Status writes are guarded by `isCurrentRequest()`, which is
   * unconditionally true for a non-resume request, so the aborted request's
   * `catch` resets status to "ready" *after* the new request set "submitted"
   * and desyncs the UI from the stream actually running.
   */
  const submit = React.useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || isLoading) return;

      setUnreadCount(0);
      setInput("");
      void sendMessage({ text: trimmed });
      // Return focus so the next message can be typed straight away, including
      // when the send was triggered by a starter chip or the Enter key.
      textareaRef.current?.focus();
    },
    [isLoading, sendMessage]
  );

  /**
   * Loads the last user turn back into the composer and drops it (plus anything
   * after it) from the thread, so sending re-asks from that point.
   */
  const editLastUserMessage = React.useCallback(() => {
    if (lastUserIndex < 0) return;

    setMessages(messages.slice(0, lastUserIndex));
    setInput(lastUserMessageText);
    setUnreadCount(0);
    textareaRef.current?.focus();
  }, [lastUserIndex, lastUserMessageText, messages, setMessages]);

  /**
   * Re-sends the last user turn in place. Passing `messageId` makes the SDK
   * replace that message and drop any partial reply behind it, so a mid-stream
   * failure does not leave an orphan bubble.
   */
  const retryLastUserMessage = React.useCallback(() => {
    if (!lastUserMessageId || !lastUserMessageText) return;
    void sendMessage({
      text: lastUserMessageText,
      messageId: lastUserMessageId,
    });
  }, [lastUserMessageId, lastUserMessageText, sendMessage]);

  const regenerateLastResponse = React.useCallback(() => {
    if (isLoading) return;
    setUnreadCount(0);
    void regenerate();
  }, [isLoading, regenerate]);

  return (
    <Card
      className={cn("relative flex size-full flex-col", className)}
      // Exposed so the jump-to-latest control can sit clear of the floating
      // composer rather than underneath it.
      style={
        { "--composer-height": `${footerHeight}px` } as React.CSSProperties
      }
    >
      {/*
        A single polite live region for the conversation's status. Announcing
        the streaming text itself would be unusable — it re-reads every token —
        so this reports transitions instead.
      */}
      <span role="status" aria-live="polite" className="sr-only">
        {isLoading
          ? "Bobba is replying"
          : status === "error"
            ? "The message could not be sent"
            : "Reply ready"}
      </span>
      <CardHeader className="border-b">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/assets/images/logo.webp"
            alt="Bobba Union"
            width={44}
            height={44}
            className="size-11 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <CardTitle className="font-semibold text-lg text-primary">
              Bobba AI
            </CardTitle>
            <CardDescription className="truncate">
              Your personal bubble tea assistant.
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger render={<DropdownMenuTrigger />} />
              <TooltipContent>Chat options</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={resetThread}>
                <RotateCcwIcon />
                Start a new chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close chat"
            onClick={onClose}
          >
            <XIcon />
          </Button>
        </CardAction>
      </CardHeader>

      {/*
        `min-h-0` is load-bearing. As a column flex item, CardContent defaults
        to `min-height: auto`, which resolves to its content size — so without
        it the message list refuses to shrink, grows past the card's fixed
        height and pushes the footer out past the card's `overflow-hidden`.
        That is what made the composer appear to vanish once a long reply
        arrived. `flex flex-col` additionally makes the height constraint
        explicit, so the scroller is sized by the flex algorithm rather than by
        resolving a percentage through a block box.
      */}
      <CardContent
        className="flex min-h-0 grow flex-col p-0"
        data-chat-surface=""
      >
        <MessageScrollerProvider autoScroll>
          <MessageScroller>
            <MessageScrollerViewport
              ref={viewportRef}
              className="scroll-fade-b scrollbar-thin"
              data-chat-viewport=""
              aria-label="Chat messages"
              onScroll={handleScroll}
              onWheel={handleWheel}
            >
              <MessageScrollerContent
                // `px-4` aligns the message column with the header and composer
                // gutters; the list itself carries no padding, so without this
                // bubbles sit flush against the card's left and right borders.
                className="gap-4 px-4 pt-3"
                // Reserve room for the floating composer, with a little air so
                // the last message never rests directly on the input.
                style={{ paddingBottom: Math.max(footerHeight, 12) }}
              >
                {openThread &&
                  messages.map((message, index) => {
                    const text = message.parts.map(getMessageText).join("");
                    const isUser = message.role === "user";
                    const isLast = index === messages.length - 1;
                    const isStreaming = isLastMessageStreaming && isLast;

                    // Hold back the empty assistant bubble the SDK creates on
                    // `text-start`, so the typing indicator is the only thing
                    // on screen until the first token lands.
                    if (!isUser && text.length === 0 && isLoading) {
                      return null;
                    }

                    // Delivery state belongs to the most recent user turn
                    // regardless of whether it can be edited right now —
                    // conflating the two made an in-flight message report
                    // "sent" instead of "sending".
                    const isLastUserMessage =
                      isUser && lastUserMessageId === message.id;
                    const canEdit = isLastUserMessage && !isLoading;
                    const canRegenerate =
                      !isUser && isLast && hasUserMessage && !isLoading;

                    return (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                        scrollAnchor={isUser}
                      >
                        <MessageAnimated>
                          <Message
                            align={isUser ? "end" : "start"}
                            data-streaming={
                              isStreaming ? "true" : undefined
                            }
                          >
                            <MessageContent>
                              <div
                                className={cn(
                                  isUser
                                    ? "flex items-center justify-end gap-1"
                                    : "contents"
                                )}
                              >
                                <Bubble
                                  variant={isUser ? "chat-user" : "chat-bot"}
                                  align={isUser ? "end" : "start"}
                                  // Replies carry the content — code blocks and
                                  // tables need the extra measure, whereas short
                                  // user turns read better kept narrow.
                                  className={isUser ? undefined : "max-w-[92%]"}
                                >
                                  <BubbleContent>
                                    {isUser ? (
                                      <span className="whitespace-pre-wrap">
                                        {text}
                                      </span>
                                    ) : (
                                      <ChatMarkdown>{text}</ChatMarkdown>
                                    )}
                                  </BubbleContent>
                                </Bubble>

                                {isUser ? (
                                  <UserMessageActions
                                    status={
                                      isLastUserMessage
                                        ? userMessageStatus
                                        : "sent"
                                    }
                                    onEdit={
                                      canEdit
                                        ? editLastUserMessage
                                        : undefined
                                    }
                                    onRetry={
                                      isLastUserMessage &&
                                      userMessageStatus === "failed"
                                        ? retryLastUserMessage
                                        : undefined
                                    }
                                  />
                                ) : null}
                              </div>

                              {!isUser && canRegenerate ? (
                                <AssistantMessageActions
                                  onRegenerate={regenerateLastResponse}
                                />
                              ) : null}
                            </MessageContent>
                          </Message>
                        </MessageAnimated>
                      </MessageScrollerItem>
                    );
                  })}

                {showTyping ? (
                  <MessageScrollerItem>
                    <Message align="start">
                      <MessageContent>
                        <Bubble variant="chat-bot" align="start">
                          <BubbleContent>
                            <TypingIndicator />
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ) : null}
              </MessageScrollerContent>
            </MessageScrollerViewport>

            {/*
              Jump-to-latest control. `autoScroll` on the provider has already
              paused while the user is parked above the bottom, so this only has
              to resume it — and clear the unread badge. Offset by the measured
              composer height so it floats above the input rather than behind it.
            */}
            {!isPinnedToBottom && messages.length > 1 ? (
              <button
                type="button"
                onClick={scrollToLatest}
                style={{
                  bottom: "calc(var(--composer-height, 0px) + 0.75rem)",
                }}
                className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <ArrowUpIcon className="size-3.5 rotate-180" aria-hidden="true" />
                {unreadCount > 0 ? "New messages" : "Jump to latest"}
                {unreadCount > 1 ? (
                  <span className="rounded-full bg-primary px-1.5 text-[0.65rem] leading-4 text-primary-foreground">
                    {unreadCount}
                  </span>
                ) : null}
                <span className="sr-only">Scroll to latest message</span>
              </button>
            ) : null}
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>

      {/*
        Floats over the list so messages pass behind it. `pt-5` reserves the
        empty 20px band that the `.chat-composer` gradient fades across, so the
        dissolve happens in blank space and never behind the chip or input text.
      */}
      <CardFooter
        ref={footerRef}
        className="chat-composer pointer-events-none absolute inset-x-0 bottom-0 z-10 flex-col items-stretch gap-2 pt-5"
      >
        {!hasUserMessage ? (
          <SuggestionChips
            suggestions={SUGGESTIONS}
            disabled={isLoading}
            onSelect={submit}
            className="pointer-events-auto"
          />
        ) : null}

        <form
          className="pointer-events-auto flex w-full items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
        >
          <InputGroup className="h-auto flex-1">
            <InputGroupTextarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isLoading
                  ? "Brewing your answer…"
                  : "Ask about drinks, ingredients, or specials…"
              }
              rows={1}
              aria-label="Message Bobba Union"
              // Visible at all times; only inert while a reply is in flight.
              disabled={isLoading}
              onKeyDown={(event) => {
                // Enter sends; Shift+Enter inserts a newline.
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submit(input);
                }
              }}
            />
          </InputGroup>

          {/*
            One control, two states. While a reply is in flight this is Stop
            (the composer is disabled, so there is nothing to submit); once
            ready it becomes Send, muted until there is text.
          */}
          {isLoading ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton
                    type="button"
                    size="icon-sm"
                    onClick={() => stop()}
                    aria-label="Stop generating"
                    className="shrink-0"
                  />
                }
              >
                <SquareIcon className="size-3.5 fill-current" />
              </TooltipTrigger>
              <TooltipContent>Stop generating</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton
                    type="submit"
                    size="icon-sm"
                    disabled={!canSend}
                    aria-label="Send message"
                    className={cn(
                      "shrink-0 transition-colors duration-200",
                      // Muted while there is nothing to send, sunflower gold
                      // once the composer has content.
                      canSend
                        ? "bg-sunflower-gold text-shadow-grey hover:bg-sunflower-gold/90"
                        : "bg-muted text-muted-foreground"
                    )}
                  />
                }
              >
                <ArrowUpIcon />
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          )}
        </form>

        {error ? (
          <p className="text-xs text-destructive" role="alert">
            {error.message || "Something went wrong."}
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
