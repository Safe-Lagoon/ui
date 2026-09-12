"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type DotCrumb = {
  label: string;
  href?: string;
};

export interface DotCrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<string | DotCrumb>;
  onNavigate?: (href: string) => void;
}

function asCrumb(item: string | DotCrumb): DotCrumb {
  return typeof item === "string" ? { label: item } : item;
}

export function DotCrumbs({ items, onNavigate, className, ...props }: DotCrumbsProps) {
  const crumbs = items.map(asCrumb);

  return (
    <nav aria-label="Breadcrumb" data-slot="dot-crumbs" className={cn("min-w-0", className)} {...props}>
      <ol className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="inline-flex min-w-0 items-baseline gap-1.5">
              {index > 0 ? (
                <span className="text-border" aria-hidden>
                  ·
                </span>
              ) : null}
              {last ? (
                <strong aria-current="page" className="min-w-0 truncate font-semibold text-ink">
                  {crumb.label}
                </strong>
              ) : crumb.href && onNavigate ? (
                <button
                  type="button"
                  className="font-medium text-brand-blue underline underline-offset-2 hover:text-violet"
                  onClick={() => onNavigate(crumb.href!)}
                >
                  {crumb.label}
                </button>
              ) : crumb.href ? (
                <a
                  href={crumb.href}
                  className="font-medium text-brand-blue underline underline-offset-2 hover:text-violet"
                >
                  {crumb.label}
                </a>
              ) : (
                <span>{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
