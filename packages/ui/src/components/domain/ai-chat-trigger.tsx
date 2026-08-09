"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { LogoMark } from "../../icons/logo-mark";

export interface AiChatTriggerProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export function AiChatTrigger({ onClick, label, className }: AiChatTriggerProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "ai-chat-trigger relative size-12 overflow-hidden rounded-full bg-background p-[2px] shadow-md",
        "transition-shadow hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
        className,
      )}
    >
      <span
        aria-hidden
        className="ai-chat-trigger-ring absolute left-1/2 top-1/2 size-[220%] bg-[conic-gradient(from_0deg,#2f77ee,#b97cff,#ffffff,#f5c842,#2f77ee)]"
      />
      <span className="relative grid size-full place-items-center rounded-full bg-background">
        <LogoMark className="size-6" />
      </span>
    </button>
  );
}
