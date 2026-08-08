import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-14 w-full rounded-[10px] border border-input bg-background px-4 text-body-16 text-foreground transition-colors",
            "placeholder:text-muted-foreground",
            "hover:border-brand-blue-400",
            "focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
            className,
          )}
          ref={ref}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-body-14 text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
