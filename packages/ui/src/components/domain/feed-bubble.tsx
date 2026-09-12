import * as React from "react";
import { cn } from "../../lib/utils";

export type FeedBubbleVariant = "in" | "out";

export interface FeedBubbleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: FeedBubbleVariant;
}

/** Activity chat bubble — proto `.bubble.in` / `.bubble.out`. */
export function FeedBubble({ variant = "in", className, ...props }: FeedBubbleProps) {
  return (
    <p
      data-slot="feed-bubble"
      data-variant={variant}
      className={cn(
        "m-0 max-w-[85%] px-3 py-2 text-[14px]",
        variant === "out"
          ? "ms-auto rounded-xl rounded-se-sm bg-lilac-soft"
          : "rounded-xl rounded-ss-sm bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function ChatDayLabel({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="chat-day-label"
      className={cn("text-[12px] font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}
