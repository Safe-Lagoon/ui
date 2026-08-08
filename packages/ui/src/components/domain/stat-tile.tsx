import * as React from "react";
import { cn } from "../../lib/utils";

export interface StatTileProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function StatTile({ icon, value, label, onClick, className }: StatTileProps) {
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-3 rounded-[10px] border border-border-soft bg-card p-5 text-start transition-colors",
        onClick && "cursor-pointer hover:border-brand-blue hover:bg-brand-blue-100/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-[10px] bg-brand-blue-100 text-brand-blue">
        {icon}
      </div>
      <div>
        <p className="text-body-32-medium text-foreground">{value}</p>
        <p className="mt-1 text-body-14 text-muted-foreground">{label}</p>
      </div>
    </Comp>
  );
}
