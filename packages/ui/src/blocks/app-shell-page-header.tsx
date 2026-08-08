"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface AppShellPageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  showDivider?: boolean;
  sticky?: boolean;
  className?: string;
}

export function AppShellPageHeader({
  title,
  icon,
  description,
  actions,
  showDivider = false,
  sticky = true,
  className,
}: AppShellPageHeaderProps) {
  return (
    <header
      data-slot="app-shell-page-header"
      className={cn(
        "-mx-6 mb-6 bg-background px-6",
        sticky &&
          "sticky top-0 z-10 pt-4 max-lg:pt-12 group-data-[shell-collapsed]/shell:lg:pt-12",
        showDivider ? "border-b border-border-soft pb-5" : "pb-0",
        className,
      )}
    >
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
            <h1 className="text-h1 text-foreground">{title}</h1>
            {description ? (
              <div className="mt-1 text-body-16 text-muted-foreground">{description}</div>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
