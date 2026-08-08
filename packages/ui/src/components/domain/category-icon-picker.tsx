"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface CategoryIconOption {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface CategoryIconPickerProps {
  options: CategoryIconOption[];
  value?: string;
  onChange: (id: string) => void;
  className?: string;
}

export function CategoryIconPicker({
  options,
  value,
  onChange,
  className,
}: CategoryIconPickerProps) {
  return (
    <div
      className={cn("grid grid-cols-4 gap-2 sm:grid-cols-6", className)}
      role="radiogroup"
    >
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex aspect-square flex-col items-center justify-center gap-1 rounded-[10px] border-2 p-2 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected
                ? "border-lilac bg-lilac-300/30 text-lilac"
                : "border-border-soft bg-background text-muted-foreground hover:border-brand-blue hover:text-foreground",
            )}
          >
            <span className="flex size-8 items-center justify-center">{option.icon}</span>
            <span className="w-full truncate text-body-14">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
