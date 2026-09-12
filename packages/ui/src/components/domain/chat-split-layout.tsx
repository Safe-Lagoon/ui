import * as React from "react";
import { cn } from "../../lib/utils";

export interface ChatSplitLayoutProps {
  threads: React.ReactNode;
  conversation: React.ReactNode;
  className?: string;
}

export function ChatSplitLayout({ threads, conversation, className }: ChatSplitLayoutProps) {
  return (
    <div data-slot="chat-split-layout" className={cn("flex min-h-0 flex-1 gap-3", className)}>
      <aside className="flex w-[260px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-border-soft bg-background">
        {threads}
      </aside>
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-border-soft bg-background">
        {conversation}
      </section>
    </div>
  );
}
