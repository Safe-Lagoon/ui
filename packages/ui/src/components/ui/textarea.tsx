import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-[10px] border border-input bg-background px-4 py-3 text-body-16 text-foreground transition-colors",
          "placeholder:text-muted-foreground",
          "hover:border-brand-blue-400",
          "focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
