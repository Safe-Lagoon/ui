"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Switch } from "../ui/switch";

export interface StrokeRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  leading?: React.ReactNode;
  chevron?: boolean;
  alert?: boolean;
  selected?: boolean;
  toggle?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function StrokeRow({
  title,
  subtitle,
  trailing,
  leading,
  chevron = false,
  alert = false,
  selected = false,
  toggle,
  checked,
  onCheckedChange,
  className,
  type = "button",
  ...props
}: StrokeRowProps) {
  return (
    <button
      type={type}
      data-slot="stroke-row"
      data-selected={selected || undefined}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3.5 text-start transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        alert
          ? "bg-destructive-soft"
          : selected
            ? "bg-lilac-soft"
            : "bg-card hover:bg-[#fafbfc]",
        className,
      )}
      {...props}
    >
      {leading}
      <span className="min-w-0 flex-1">
        <span className={cn("block text-[15px] font-semibold text-ink", alert && "text-destructive")}>{title}</span>
        {subtitle ? <span className="mt-0.5 block text-[13px] text-muted-foreground">{subtitle}</span> : null}
      </span>
      {trailing ? <span className="shrink-0 text-[13px] text-muted-foreground">{trailing}</span> : null}
      {toggle ? (
        <Switch checked={checked} onCheckedChange={onCheckedChange} onClick={(e) => e.stopPropagation()} />
      ) : null}
      {chevron ? <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
    </button>
  );
}

export function StrokeGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="stroke-group"
      className={cn(
        "overflow-hidden rounded-[10px] border border-border-soft bg-card shadow-card",
        "[&>[data-slot=stroke-row]+[data-slot=stroke-row]]:border-t [&>[data-slot=stroke-row]+[data-slot=stroke-row]]:border-border-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
