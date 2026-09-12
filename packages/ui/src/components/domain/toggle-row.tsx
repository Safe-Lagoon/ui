"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface ToggleRowProps {
  title: string;
  subtitle?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/** Settings toggle row — proto `.toggle-row` + 44×24 lilac switch. */
export function ToggleRow({
  title,
  subtitle,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  className,
}: ToggleRowProps) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = checked ?? internal;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <div
      data-slot="toggle-row"
      className={cn(
        "flex items-center justify-between gap-3 border-b border-border-soft py-2.5 last:border-b-0",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="text-[15px] font-semibold text-ink">{title}</div>
        {subtitle ? <div className="text-[13px] text-muted-foreground">{subtitle}</div> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={title}
        disabled={disabled}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full",
          on ? "bg-lilac" : "bg-border",
          disabled && "cursor-not-allowed opacity-50",
        )}
        onClick={toggle}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow-[0_1px_2px_rgba(45,44,50,0.2)] transition-transform",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
