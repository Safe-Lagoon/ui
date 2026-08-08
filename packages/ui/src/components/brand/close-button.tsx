import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function CloseButton({ className, label = "Close", ...props }: CloseButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex h-[38px] items-center gap-2 rounded-[10px] px-4 text-body-16 text-muted-fg transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    >
      <X className="size-4" />
      <span>{label}</span>
    </button>
  );
}
