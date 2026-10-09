"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type Suggestion = {
  label: string;
  prompt: string;
};

/**
 * Shown only while the conversation is still empty (i.e. just the seeded
 * greeting), so first-time visitors get a sense of what the bot can answer.
 */
export function SuggestionChips({
  suggestions,
  onSelect,
  disabled,
  className,
}: {
  suggestions: Suggestion[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  if (suggestions.length === 0) return null;

  return (
    <div
      data-slot="chat-suggestions"
      className={cn("flex flex-wrap justify-center gap-1.5", className)}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion.prompt)}
          className="max-w-full truncate rounded-full border border-border/70 bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}

export default SuggestionChips;
