"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  countryPrefix?: string;
  error?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryPrefix = "+1", error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-14 shrink-0 items-center justify-center rounded-[10px] border border-input bg-muted px-3",
              "text-body-16 text-muted-foreground",
            )}
            aria-hidden="true"
          >
            {countryPrefix}
          </div>
          <input
            ref={ref}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            className={cn(
              "flex h-14 w-full flex-1 rounded-[10px] border border-input bg-background px-4 text-body-16 text-foreground transition-colors",
              "placeholder:text-muted-foreground",
              "hover:border-brand-blue-400",
              "focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
              "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
              error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
              className,
            )}
            aria-invalid={error ? true : undefined}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1.5 text-body-14 text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
