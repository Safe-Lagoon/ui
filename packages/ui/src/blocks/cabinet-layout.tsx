"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { Separator } from "../components/ui/separator";

export interface CabinetNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface CabinetLayoutProps {
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  navItems: CabinetNavItem[];
  children: React.ReactNode;
  sidebarLabel?: string;
  className?: string;
}

export function CabinetLayout({
  sidebarHeader,
  sidebarFooter,
  navItems,
  children,
  sidebarLabel = "Navigation",
  className,
}: CabinetLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sidebarContent = (
    <>
      {sidebarHeader ? <div className="p-4">{sidebarHeader}</div> : null}
      <nav className="flex-1 space-y-1 p-3" aria-label={sidebarLabel}>
        {navItems.map((item) => {
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
      {sidebarFooter ? (
        <>
          <Separator />
          <div className="p-4">{sidebarFooter}</div>
        </>
      ) : null}
    </>
  );

  return (
    <div className={cn("flex min-h-svh bg-background", className)}>
      <aside className="hidden w-64 shrink-0 flex-col border-e border-border-soft bg-muted/20 lg:flex">
        {sidebarContent}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close sidebar"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-64 flex-col border-e border-border-soft bg-background shadow-lg">
            <div className="flex justify-end p-2">
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X />
              </Button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </Button>
        </div>
        <main className="flex-1 overflow-auto p-5">{children}</main>
      </div>
    </div>
  );
}
