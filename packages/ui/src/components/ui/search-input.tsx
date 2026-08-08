"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref={ref}
            type="search"
            className={cn(
              "flex h-14 w-full rounded-[10px] border border-input bg-background py-0 pl-11 pr-4 text-body-16 text-foreground transition-colors",
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
SearchInput.displayName = "SearchInput";

export { SearchInput };
