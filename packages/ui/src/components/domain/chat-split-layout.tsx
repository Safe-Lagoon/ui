import * as React from "react";
import { cn } from "../../lib/utils";

export interface ChatSplitLayoutProps {
  threads: React.ReactNode;
  conversation: React.ReactNode;
  className?: string;
}

export function ChatSplitLayout({ threads, conversation, className }: ChatSplitLayoutProps) {
  return (
    <div data-slot="chat-split-layout" className={cn("flex h-full min-h-0 w-full flex-1 gap-3", className)}>
      <aside className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-border-soft bg-background">
        {threads}
      </aside>
      <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-border-soft bg-background">
        {conversation}
      </section>
    </div>
  );
}
