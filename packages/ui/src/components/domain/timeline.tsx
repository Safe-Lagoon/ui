import * as React from "react";
import { cn } from "../../lib/utils";

export interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <ol className={cn("relative flex flex-col gap-0", className)}>
      {children}
    </ol>
  );
}

export interface TimelineItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
  isLast?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function TimelineItem({
  icon,
  title,
  description,
  timestamp,
  isLast = false,
  className,
  children,
}: TimelineItemProps) {
  return (
    <li className={cn("relative flex gap-4 pb-6", className)}>
      {!isLast ? (
        <span
          className="absolute start-5 top-10 bottom-0 w-px bg-border-soft"
          aria-hidden="true"
        />
      ) : null}
      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-border-soft bg-background text-brand-blue">
        {icon}
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="text-body-16-semibold text-foreground">{title}</h4>
          {timestamp ? (
            <time className="text-body-14 text-muted-foreground">{timestamp}</time>
          ) : null}
        </div>
        {description ? (
          <p className="mt-1 text-body-14 text-muted-foreground">{description}</p>
        ) : null}
        {children}
      </div>
    </li>
  );
}
