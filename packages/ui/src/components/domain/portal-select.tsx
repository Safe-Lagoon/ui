import * as React from "react";
import { cn } from "../../lib/utils";

export type PortalSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/** Native 40px proto field select — blue focus ring, 10px radius. */
export const PortalSelect = React.forwardRef<HTMLSelectElement, PortalSelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      data-slot="portal-select"
      className={cn(
        "h-10 w-full rounded-[10px] border border-border bg-card px-3 text-[14px] text-ink",
        "focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(47,119,238,0.18)] focus:outline-none",
        className,
      )}
      {...props}
    />
  ),
);
PortalSelect.displayName = "PortalSelect";
