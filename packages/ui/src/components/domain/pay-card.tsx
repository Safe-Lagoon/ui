import * as React from "react";
import { cn } from "../../lib/utils";

export interface PayCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label?: string;
}

export function PayCardGroup({ children, label = "Payment method", className, ...props }: PayCardGroupProps) {
  return (
    <div
      data-slot="pay-card-group"
      role="radiogroup"
      aria-label={label}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface PayCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  selected?: boolean;
}

/** Billing payment radio — proto `.pay-card`. */
export function PayCard({ label, selected, className, type = "button", ...props }: PayCardProps) {
  return (
    <button
      type={type}
      role="radio"
      aria-checked={!!selected}
      data-slot="pay-card"
      data-selected={selected || undefined}
      className={cn(
        "w-full rounded-[10px] border px-3.5 py-3 text-start text-[13px] font-semibold",
        selected ? "border-lilac bg-lilac-soft" : "border-border-soft bg-card",
        className,
      )}
      {...props}
    >
      {label}
    </button>
  );
}
