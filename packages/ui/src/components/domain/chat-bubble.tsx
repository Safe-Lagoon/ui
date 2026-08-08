"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ScrollArea } from "../ui/scroll-area";

export type ChatBubbleVariant = "sent" | "received";

export interface ChatBubbleProps {
  message: string;
  timestamp: string;
  variant?: ChatBubbleVariant;
  senderLabel?: string;
  className?: string;
}

export function ChatBubble({
  message,
  timestamp,
  variant = "received",
  senderLabel,
  className,
}: ChatBubbleProps) {
  const isSent = variant === "sent";

  return (
    <div
      className={cn(
        "flex w-full",
        isSent ? "justify-end" : "justify-start",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-[10px] px-4 py-3",
          isSent
            ? "rounded-se-sm bg-lilac text-white"
            : "rounded-ss-sm border border-border-soft bg-background text-foreground",
        )}
      >
        {senderLabel && !isSent ? (
          <p className="mb-1 text-body-14 font-medium text-brand-blue">{senderLabel}</p>
        ) : null}
        <p className="whitespace-pre-wrap text-body-16">{message}</p>
        <time className="mt-1 block text-end text-body-14 opacity-70">{timestamp}</time>
      </div>
    </div>
  );
}

export interface ConversationMessage {
  id: string;
  message: string;
  timestamp: string;
  variant?: ChatBubbleVariant;
  senderLabel?: string;
}

export interface ConversationViewProps {
  messages: ConversationMessage[];
  emptyLabel?: string;
  className?: string;
}

export function ConversationView({ messages, emptyLabel, className }: ConversationViewProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className={cn("h-full min-h-[300px] rounded-[10px] border border-border-soft bg-muted/20 p-4", className)}>
      <div className="flex flex-col gap-3">
        {messages.length === 0 && emptyLabel ? (
          <p className="py-8 text-center text-body-16 text-muted-foreground">{emptyLabel}</p>
        ) : null}
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.message}
            timestamp={msg.timestamp}
            variant={msg.variant}
            senderLabel={msg.senderLabel}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
