"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            className={cn(
              "flex h-14 w-full rounded-[10px] border border-input bg-background py-0 pl-4 pr-12 text-body-16 text-foreground transition-colors",
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
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-[6px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
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
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
