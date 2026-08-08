"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface DashboardNavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface DashboardLayoutProps {
  profileCarousel?: React.ReactNode;
  navItems?: DashboardNavItem[];
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({
  profileCarousel,
  navItems = [],
  header,
  children,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background", className)}>
      {header ? (
        <header className="border-b border-border-soft bg-background px-5 py-4">{header}</header>
      ) : null}

      {profileCarousel ? (
        <section className="border-b border-border-soft bg-muted/20 px-5 py-4">
          {profileCarousel}
        </section>
      ) : null}

      {navItems.length > 0 ? (
        <nav
          className="flex gap-1 overflow-x-auto border-b border-border-soft px-5 py-2"
          aria-label="Dashboard"
        >
          {navItems.map((item) => {
            const Comp = item.href ? "a" : "button";
            return (
              <Comp
                key={item.id}
                {...(item.href ? { href: item.href } : { type: "button" as const, onClick: item.onClick })}
                className={cn(
                  "shrink-0 rounded-[10px] px-4 py-2 text-body-16 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  item.active
                    ? "bg-lilac text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </Comp>
            );
          })}
        </nav>
      ) : null}

      <main className="flex-1 px-5 py-6">{children}</main>
    </div>
  );
}
