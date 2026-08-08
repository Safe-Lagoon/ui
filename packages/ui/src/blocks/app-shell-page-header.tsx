"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface AppShellPageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  showDivider?: boolean;
  className?: string;
}

export function AppShellPageHeader({
  title,
  icon,
  description,
  actions,
  showDivider = false,
  className,
}: AppShellPageHeaderProps) {
  return (
    <header className={cn("mb-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {icon ? (
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue text-white [&_svg]:size-5"
              aria-hidden
            >
              {icon}
            </div>
          ) : null}
          <div className="min-w-0">
            <h1 className="text-h2 text-foreground">{title}</h1>
            {description ? (
              <div className="mt-1 text-body-16 text-muted-foreground">{description}</div>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      {showDivider ? <div className="mt-5 border-b border-border-soft" aria-hidden /> : null}
    </header>
  );
}
