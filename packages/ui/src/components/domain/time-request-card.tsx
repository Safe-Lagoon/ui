"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";

export interface TimeRequestCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  declineLabel?: string;
  allowLabel?: string;
  onDecline?: () => void;
  onAllow?: () => void;
}

export function TimeRequestCard({
  title,
  subtitle,
  declineLabel = "Decline",
  allowLabel = "Allow 30 min",
  onDecline,
  onAllow,
  className,
  ...props
}: TimeRequestCardProps) {
  return (
    <article
      data-slot="time-request-card"
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-lg border border-border-soft bg-card p-4",
        "shadow-card",
        className,
      )}
      {...props}
    >
      <div className="min-w-[180px] flex-1">
        <p className="text-[15px] font-semibold text-foreground">{title}</p>
        {subtitle ? <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {onDecline ? (
          <Button variant="outline" size="portal-sm" onClick={onDecline}>
            {declineLabel}
          </Button>
        ) : null}
        {onAllow ? (
          <Button
            variant="primary"
            size="portal-sm"
            className="bg-success-strong hover:bg-success-strong/90"
            onClick={onAllow}
          >
            {allowLabel}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
