"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { useAppShellNavigation } from "./app-shell-navigation-context";

export interface AppShellPageHeaderProps {
  title?: string;
  breadcrumbs?: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  showDivider?: boolean;
  sticky?: boolean;
  className?: string;
}

export function AppShellPageHeader({
  title,
  breadcrumbs,
  icon,
  description,
  actions,
  showDivider = false,
  sticky = false,
  className,
}: AppShellPageHeaderProps) {
  const navigation = useAppShellNavigation();
  const phone = navigation?.shellMode === "phone";
  const showCrumbs = Boolean(breadcrumbs);
  const showTitle = Boolean(title);

  React.useEffect(() => {
    navigation?.setInlineMenuActive(true);
    return () => navigation?.setInlineMenuActive(false);
  }, [navigation]);

  if (!showCrumbs && !showTitle && !description && !actions) return null;

  return (
    <header
      data-slot="app-shell-page-header"
      className={cn(
        "mb-5 flex flex-wrap items-start justify-between gap-3",
        sticky && "sticky top-0 z-10 bg-canvas pt-1",
        showDivider && "border-b border-border-soft pb-4",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start gap-2">
          {!phone && navigation?.menuButton ? <div className="shrink-0">{navigation.menuButton}</div> : null}
          <div className="min-w-0 flex-1">
            {showCrumbs ? <div className="mb-1.5 min-w-0">{breadcrumbs}</div> : null}
            {showTitle ? (
              <div className="flex min-w-0 items-center gap-2">
                {icon ? (
                  <div
                    className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-blue text-white [&_svg]:size-4"
                    aria-hidden
                  >
                    {icon}
                  </div>
                ) : null}
                <h1
                  className={cn(
                    "min-w-0 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-ink",
                    phone && "text-[22px]",
                  )}
                >
                  {title}
                </h1>
              </div>
            ) : null}
          </div>
        </div>
        {description ? <div className="mt-2 text-[13px] text-muted-foreground">{description}</div> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}
