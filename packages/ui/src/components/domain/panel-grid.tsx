import * as React from "react";
import { cn } from "../../lib/utils";

export interface PanelGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Home KPI grid. 3 / 2 / 1 columns from AppShell `data-shell-mode` (desktop / tablet / phone). */
export function PanelGrid({ className, children, ...props }: PanelGridProps) {
  return (
    <div
      data-slot="panel-grid"
      className={cn(
        "mb-5 grid grid-cols-3 gap-3.5",
        "group-data-[shell-mode=tablet]/shell:grid-cols-2",
        "group-data-[shell-mode=phone]/shell:grid-cols-1 group-data-[shell-mode=phone]/shell:gap-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
