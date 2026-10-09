"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Three soft pulsing dots rendered inside a bot-styled bubble. Each dot is
 * offset via `animationDelay` so the pulse travels rather than blinking in
 * unison. Paired with `aria-live` so screen readers announce the wait state
 * once instead of on every re-render.
 */
export function TypingIndicator({
  className,
  label = "Bobba is typing",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "flex items-center gap-1.5 py-0.5",
        // Respect users who have asked the OS to reduce motion.
        "motion-reduce:animate-none",
        className
      )}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="animate-typing-dot size-1.5 rounded-full bg-current opacity-60 motion-reduce:animate-none"
          style={{ animationDelay: `${index * 160}ms` }}
        />
      ))}
    </span>
  );
}

export default TypingIndicator;
