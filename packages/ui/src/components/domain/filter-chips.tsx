"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type FilterChip = {
  id: string;
  label: React.ReactNode;
  count?: number;
};

export interface FilterChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: FilterChip[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
}

export function FilterChips({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: FilterChipsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id ?? "");
  const selected = value ?? internal;

  return (
    <div
      role="toolbar"
      aria-label="Filters"
      data-slot="filter-chips"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {items.map((item) => {
        const on = item.id === selected;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={on}
            className={cn(
              "inline-flex h-[30px] items-center gap-1 rounded-full border px-3 text-[12.5px] font-medium leading-none transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              on
                ? "border-lilac bg-lilac text-white"
                : "border-border-soft bg-card text-fg hover:border-lilac",
            )}
            onClick={() => {
              if (value === undefined) setInternal(item.id);
              onValueChange?.(item.id);
            }}
          >
            {item.label}
            {item.count != null ? (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] font-bold",
                  on ? "bg-white/25 text-white" : "bg-muted text-muted-foreground",
                )}
              >
                {item.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
