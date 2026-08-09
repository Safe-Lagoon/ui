"use client";

import * as React from "react";
import { Title } from "../components/brand/title";
import { cn } from "../lib/utils";
import { useAppShellNavigation } from "./app-shell-navigation-context";

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
  const navigation = useAppShellNavigation();

  React.useEffect(() => {
    navigation?.setInlineMenuActive(true);
    return () => navigation?.setInlineMenuActive(false);
  }, [navigation]);

  return (
    <header
      data-slot="app-shell-page-header"
      className={cn(
        "-mx-6 mb-6 bg-background px-6",
        sticky && "sticky top-0 z-10 pt-4 group-data-[shell-collapsed]/shell:@lg:pt-4",
        showDivider ? "border-b border-border-soft pb-5" : "pb-0",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-2">
            {navigation?.menuButton ? (
              <div className="shrink-0">{navigation.menuButton}</div>
            ) : null}
            <Title title={title} icon={icon} className="min-w-0 flex-1" />
          </div>
          {description ? (
            <div className="mt-2 text-body-16 text-muted-foreground">{description}</div>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
