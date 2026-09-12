"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type ChoiceOption = {
  id: string;
  label: React.ReactNode;
};

export interface ChoiceRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: ChoiceOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  label?: string;
}

export function ChoiceRow({
  items,
  value,
  defaultValue,
  onValueChange,
  label,
  className,
  ...props
}: ChoiceRowProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id ?? "");
  const selected = value ?? internal;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-slot="choice-row"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {items.map((item) => {
        const on = item.id === selected;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={on}
            data-choice={item.id}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-full border px-3 text-[13px] font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              on
                ? "border-lilac bg-lilac text-white"
                : "border-border-soft bg-card text-foreground hover:border-lilac",
            )}
            onClick={() => {
              if (value === undefined) setInternal(item.id);
              if (item.id !== selected) onValueChange?.(item.id);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
