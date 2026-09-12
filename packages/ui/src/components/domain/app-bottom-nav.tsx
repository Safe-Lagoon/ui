import * as React from "react";
import { cn } from "../../lib/utils";
import type { AppSidebarLink, AppSidebarLinkComponentProps } from "./app-sidebar";

/** @deprecated Phone nav is the hamburger sheet. Do not mount this in AppShellLayout. */
export interface AppBottomNavProps {
  items: AppSidebarLink[];
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  className?: string;
}

/** @deprecated Phone nav is the hamburger sheet. Do not mount this in AppShellLayout. */
export function AppBottomNav({ items, LinkComponent, className }: AppBottomNavProps) {
  if (!items.length) return null;

  return (
    <nav
      data-slot="app-bottom-nav"
      aria-label="Primary"
      className={cn(
        "flex shrink-0 items-stretch justify-around border-t border-border-soft bg-card px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5",
        className,
      )}
    >
      {items.map((item) => {
        const itemClass = cn(
          "relative flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[11px] font-semibold",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          item.active ? "text-brand-blue" : "text-muted-foreground",
        );
        const content = (
          <>
            {item.icon ? <span className="[&_svg]:size-[18px]">{item.icon}</span> : null}
            <span className="truncate">{item.label}</span>
            {item.badgeCount && item.badgeCount > 0 ? (
              <span className="absolute end-1/4 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
                {item.badgeCount}
              </span>
            ) : null}
          </>
        );
        if (item.href && LinkComponent) {
          return (
            <LinkComponent
              key={item.id}
              href={item.href}
              className={itemClass}
              aria-current={item.active ? "page" : undefined}
              onClick={item.onClick}
            >
              {content}
            </LinkComponent>
          );
        }
        const Comp = item.href ? "a" : "button";
        return (
          <Comp
            key={item.id}
            {...(item.href ? { href: item.href, onClick: item.onClick } : { type: "button", onClick: item.onClick })}
            className={itemClass}
            aria-current={item.active ? "page" : undefined}
          >
            {content}
          </Comp>
        );
      })}
    </nav>
  );
}
