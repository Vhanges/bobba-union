"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type MessageAnimatedProps = React.ComponentProps<"div"> & {
  animate?: boolean;
};

/**
 * Entrance animation for a chat bubble. Elements are keyed by message id, so
 * this runs once on mount and never replays as the list re-renders during
 * streaming.
 *
 * Uses the CSS animation utilities rather than GSAP: this is a one-shot
 * transform on mount, and a JS timeline would only add a hydration-time layout
 * read for no visual gain.
 */
function MessageAnimated({
  className,
  animate = true,
  ...props
}: MessageAnimatedProps) {
  return (
    <div
      data-slot="message-animated"
      className={cn(
        animate &&
          "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 motion-safe:ease-out",
        className
      )}
      {...props}
    />
  );
}

export { MessageAnimated };
