"use client";

import * as React from "react";
import { MessageCircleIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChatWidget } from "@/components/chat/chat-widget";

export function FloatingChatButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("fixed z-50 flex flex-col items-end gap-3", className)}>
      {isOpen && (
        <div className="h-[min(70vh,560px)] w-[min(calc(100vw-2rem),380px)] shadow-2xl">
          <ChatWidget onClose={() => setIsOpen(false)} />
        </div>
      )}

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              size="icon"
              aria-label={isOpen ? "Close chat" : "Open chat"}
              className="size-14 rounded-full shadow-xl"
              onClick={() => setIsOpen((open) => !open)}
            />
          }
        >
          {isOpen ? <XIcon /> : <MessageCircleIcon />}
          <span className="sr-only">
            {isOpen ? "Close chat" : "Open chat"}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          {isOpen ? "Close chat" : "Chat with us"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
