"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Input, type InputProps } from "../brand/input";

export interface MoneyInputProps extends Omit<InputProps, "type" | "inputMode"> {
  currencySymbol?: string;
}

export function MoneyInput({
  currencySymbol = "$",
  className,
  ...props
}: MoneyInputProps) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-body-16 text-muted-foreground">
        {currencySymbol}
      </span>
      <Input
        type="text"
        inputMode="decimal"
        className={cn("ps-9", className)}
        {...props}
      />
    </div>
  );
}
