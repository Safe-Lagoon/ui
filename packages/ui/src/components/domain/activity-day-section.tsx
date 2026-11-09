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
  /** Proto Today/Yesterday are static `.day-header` rows. Older days stay a control. */
  collapsible?: boolean;
  children?: React.ReactNode;
}

const DAY_HEADER =
  "mb-3 flex w-full items-center gap-2 text-start text-sm font-semibold uppercase tracking-wider text-muted-foreground";
const DAY_RULE = "border-b border-border-soft pb-1.5";

export function ActivityDaySection({
  title,
  count,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  collapsedLabel,
  collapsible = true,
  children,
  className,
  ...props
}: ActivityDaySectionProps) {
  const [internal, setInternal] = React.useState(defaultExpanded);
  const open = !collapsible || (expanded ?? internal);

  const toggle = () => {
    if (!collapsible) return;
    const next = !open;
    if (expanded === undefined) setInternal(next);
    onExpandedChange?.(next);
  };

  const label = <span className="min-w-0 flex-1 truncate">{title}</span>;
  const countMark =
    collapsible && !open && count != null ? (
      <span className="ms-auto font-medium">{count} events ›</span>
    ) : null;

  return (
    <section
      data-slot="activity-day-section"
      data-expanded={open || undefined}
      data-collapsible={collapsible || undefined}
      className={cn("[&+&]:mt-7", className)}
      {...props}
    >
      {collapsible ? (
        <button type="button" className={cn(DAY_HEADER, DAY_RULE)} aria-expanded={open} onClick={toggle}>
          <ChevronDown
            className={cn("size-3.5 shrink-0 opacity-50 transition-transform", !open && "-rotate-90")}
            aria-hidden
          />
          {label}
          {countMark}
        </button>
      ) : (
        <div className={DAY_HEADER}>{label}</div>
      )}
      {open ? (
        <div data-slot="feed-list" className="overflow-hidden rounded-lg border border-border-soft bg-card shadow-card">
          {children}
        </div>
      ) : collapsedLabel ? (
        <p className="text-[13px] text-muted-foreground">{collapsedLabel}</p>
      ) : null}
    </section>
  );
}
