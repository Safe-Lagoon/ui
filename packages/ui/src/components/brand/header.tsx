"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export interface HeaderLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: React.ReactNode;
  links?: HeaderLink[];
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ logo, links = [], actions, className }: HeaderProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-border-soft bg-background/95 backdrop-blur", className)}>
      <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between px-5">
        <div className="flex items-center gap-8">
          {logo}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body-16 text-foreground transition-colors hover:text-brand-blue"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-3 lg:flex">{actions}</div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open ? (
        <nav className="border-t border-border-soft px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block py-2 text-body-18 text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {actions ? <div className="mt-4 flex flex-col gap-2">{actions}</div> : null}
        </nav>
      ) : null}
    </header>
  );
}

export function BurgerMenu({
  items,
  trigger,
  className,
}: {
  items: HeaderLink[];
  trigger?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={cn("relative", className)}>
      <div onClick={() => setOpen(true)}>{trigger ?? <Button variant="ghost" size="icon"><Menu /></Button>}</div>
      {open ? (
        <div className="fixed inset-0 z-50 bg-footer/95 p-6 text-white">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
              <X className="text-white" />
            </Button>
          </div>
          <nav className="mt-8 flex flex-col gap-4">
            {items.map((item) => (
              <a key={item.href} href={item.href} className="text-h3 text-white" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
