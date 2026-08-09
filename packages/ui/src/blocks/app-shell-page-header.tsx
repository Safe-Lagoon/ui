"use client";

import * as React from "react";
import { Title } from "../components/brand/title";
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
          "sticky top-0 z-10 pt-4 @max-lg:pt-12 group-data-[shell-collapsed]/shell:@lg:pt-12",
        showDivider ? "border-b border-border-soft pb-5" : "pb-0",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <Title title={title} icon={icon} subtitle={description} />
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
