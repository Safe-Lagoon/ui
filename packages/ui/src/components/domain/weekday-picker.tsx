"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type WeekdayValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface WeekdayOption {
  value: WeekdayValue;
  label: string;
}

export interface WeekdayPickerProps {
  value: WeekdayValue[];
  onChange: (value: WeekdayValue[]) => void;
  weekdays: WeekdayOption[];
  className?: string;
  disabled?: boolean;
}

export function WeekdayPicker({
  value,
  onChange,
  weekdays,
  className,
  disabled = false,
}: WeekdayPickerProps) {
  const toggle = (day: WeekdayValue) => {
    if (disabled) return;
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day].sort((a, b) => a - b));
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group">
      {weekdays.map((day) => {
        const selected = value.includes(day.value);
        return (
          <button
            key={day.value}
            type="button"
            disabled={disabled}
            aria-pressed={selected}
            onClick={() => toggle(day.value)}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border-2 text-body-14 font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              selected
                ? "border-violet bg-violet text-white"
                : "border-border-soft bg-background text-muted-foreground hover:border-brand-blue hover:text-foreground",
            )}
          >
            {day.label}
          </button>
        );
      })}
    </div>
  );
}
