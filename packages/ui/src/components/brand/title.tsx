import * as React from "react";
import { cn } from "../../lib/utils";

export interface TitleProps {
  title: string;
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  showDivider?: boolean;
  className?: string;
}

export function Title({ title, icon, subtitle, showDivider = false, className }: TitleProps) {
  return (
    <div
      className={cn(
        "min-w-0",
        showDivider && "border-b border-border-soft pb-5",
        className,
      )}
    >
      <div
        className={cn(
          "grid min-w-0 gap-x-3 gap-y-1",
          icon ? "grid-cols-[auto_1fr]" : "grid-cols-1",
        )}
      >
        {icon ? (
          <div
            className="flex size-10 shrink-0 items-center justify-center self-start rounded-lg bg-brand-blue text-white [&_svg]:size-5"
            aria-hidden
          >
            {icon}
          </div>
        ) : null}
        <h1 className="text-h1 text-foreground">{title}</h1>
        {subtitle ? (
          <div
            className={cn(
              "text-body-16 text-muted-foreground",
              icon ? "col-start-2" : "col-start-1",
            )}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
}
