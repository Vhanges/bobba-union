"use client";

import { PencilIcon, RefreshCwIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  MessageStatusIndicator,
  type MessageStatus,
} from "@/components/chat/message-status";

const actionClass =
  "inline-flex items-center gap-1 rounded px-1 py-0.5 text-muted-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

export function UserMessageActions({
  status,
  onEdit,
  onRetry,
  className,
}: {
  status: MessageStatus;
  onEdit?: () => void;
  onRetry?: () => void;
  className?: string;
}) {
  if (status === "sent" && !onEdit && !onRetry) return null;

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      {status !== "sent" ? (
        <MessageStatusIndicator status={status} onRetry={onRetry} />
      ) : null}

      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className={cn(
            actionClass,
            "opacity-0 group-focus-within/message:opacity-100 group-hover/message:opacity-100"
          )}
        >
          <PencilIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">Edit message</span>
        </button>
      ) : null}
    </div>
  );
}

export function AssistantMessageActions({
  onRegenerate,
  className,
}: {
  onRegenerate?: () => void;
  className?: string;
}) {
  if (!onRegenerate) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-1 text-xs text-muted-foreground",
        className
      )}
    >
      <button
        type="button"
        onClick={onRegenerate}
        className={cn(
          actionClass,
          "opacity-0 group-focus-within/message:opacity-100 group-hover/message:opacity-100"
        )}
      >
        <RefreshCwIcon className="size-3" />
        Regenerate
      </button>
    </div>
  );
}
