"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";

export type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
};

export interface SidebarProps {
  items: SidebarItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  label?: string;
  className?: string;
}

export function Sidebar({ items, header, footer, label = "Navigation", className }: SidebarProps) {
  return (
    <aside className={cn("flex h-full w-64 flex-col border-e border-border-soft bg-muted/20", className)}>
      {header ? <div className="p-4">{header}</div> : null}
      <nav className="flex-1 space-y-1 p-3" aria-label={label}>
        {items.map((item) => {
          const Comp = item.href ? "a" : "button";
          return (
            <Comp
              key={item.id}
              {...(item.href ? { href: item.href } : { type: "button" as const, onClick: item.onClick })}
              className={cn(
                "flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-body-16 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                item.active
                  ? "bg-lilac text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={item.active ? "page" : undefined}
            >
              {item.icon}
              {item.label}
            </Comp>
          );
        })}
      </nav>
      {footer ? (
        <>
          <Separator />
          <div className="p-4">{footer}</div>
        </>
      ) : null}
    </aside>
  );
}
