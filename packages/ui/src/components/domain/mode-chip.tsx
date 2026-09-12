"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type ModeChipState = "off" | "on-override" | "on-block";

export interface ModeChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  state?: ModeChipState;
}

/** @deprecated Use DeviceModeControl for the Home hero. Kept for existing screens. */
export function ModeChip({ label, state = "off", className, type = "button", ...props }: ModeChipProps) {
  return (
    <button
      type={type}
      data-state={state}
      className={cn(
        "inline-flex h-[34px] items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        state === "on-override" && "border-[#a8e0bf] bg-[#e8f8ef] text-[#30a46c]",
        state === "on-block" && "border-[#f5c4c0] bg-[#fdecea] text-destructive",
        state === "off" && "border-border-soft bg-card text-foreground hover:border-lilac hover:text-violet",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          state === "on-override" && "bg-[#30a46c]",
          state === "on-block" && "bg-destructive",
          state === "off" && "bg-border",
        )}
      />
      {label}
    </button>
  );
}

export interface ModeBarProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  children: React.ReactNode;
}

/** @deprecated Use DeviceModeControl. */
export function ModeBar({ label, hint, children, className, ...props }: ModeBarProps) {
  return (
    <div
      data-slot="mode-bar"
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-lg border border-border-soft bg-card px-3.5 py-3",
        "shadow-[0_1px_2px_rgba(45,44,50,0.06),0_4px_12px_rgba(45,44,50,0.04)]",
        className,
      )}
      {...props}
    >
      {label ? <span className="me-1 text-xs font-medium text-muted-foreground">{label}</span> : null}
      {children}
      {hint ? <span className="ms-auto text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  );
}
