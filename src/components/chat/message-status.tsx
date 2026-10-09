"use client";

import * as React from "react";
import { TriangleAlertIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type MessageStatus = "sending" | "sent" | "failed";

/**
 * Delivery state for a user message. Only exceptional states are shown so the
 * normal conversation stays visually quiet.
 */
export function MessageStatusIndicator({
  status,
  onRetry,
  className,
}: {
  status: MessageStatus;
  onRetry?: () => void;
  className?: string;
}) {
  if (status === "failed") {
    return (
      <span
        data-slot="message-status"
        data-status="failed"
        className={cn("flex items-center gap-1.5", className)}
      >
        <TriangleAlertIcon
          className="size-3.5 text-destructive"
          aria-hidden="true"
        />
        <span className="text-destructive/90">Failed to send</span>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="rounded font-medium text-destructive underline decoration-destructive/40 underline-offset-2 transition-colors hover:decoration-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50"
          >
            Retry
          </button>
        ) : null}
      </span>
    );
  }

  if (status === "sending") {
    return null;
  }

  return null;
}

export default MessageStatusIndicator;
