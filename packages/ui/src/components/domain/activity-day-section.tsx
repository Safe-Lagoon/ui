"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ActivityDaySectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  count?: number;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  collapsedLabel?: React.ReactNode;
  children?: React.ReactNode;
}

export function ActivityDaySection({
  title,
  count,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  collapsedLabel,
  children,
  className,
  ...props
}: ActivityDaySectionProps) {
  const [internal, setInternal] = React.useState(defaultExpanded);
  const open = expanded ?? internal;

  const toggle = () => {
    const next = !open;
    if (expanded === undefined) setInternal(next);
    onExpandedChange?.(next);
  };

  return (
    <section
      data-slot="activity-day-section"
      data-expanded={open || undefined}
      className={cn("[&+&]:mt-7", className)}
      {...props}
    >
      <button
        type="button"
        className="mb-2 flex w-full items-center gap-2 border-b border-border-soft pb-1.5 text-start text-[12px] font-semibold tracking-[0.02em] text-muted-foreground"
        aria-expanded={open}
        onClick={toggle}
      >
        <ChevronDown
          className={cn("size-3.5 shrink-0 opacity-50 transition-transform", !open && "-rotate-90")}
          aria-hidden
        />
        <span className="min-w-0 flex-1 truncate">{title}</span>
        {count != null ? <span className="ms-auto font-medium">{count} events ›</span> : null}
      </button>
      {open ? (
        <div
          data-slot="feed-list"
          className="overflow-hidden rounded-lg border border-border-soft bg-card shadow-card"
        >
          {children}
        </div>
      ) : collapsedLabel ? (
        <p className="text-[13px] text-muted-foreground">{collapsedLabel}</p>
      ) : null}
    </section>
  );
}
