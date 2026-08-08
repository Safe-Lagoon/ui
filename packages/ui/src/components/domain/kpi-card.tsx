"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type KpiTrendDirection = "up" | "down" | "neutral";

export interface KpiCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trendLabel?: string;
  trendDirection?: KpiTrendDirection;
  onClick?: () => void;
  className?: string;
}

const trendColor: Record<KpiTrendDirection, string> = {
  up: "text-green",
  down: "text-destructive",
  neutral: "text-muted-foreground",
};

export function KpiCard({
  icon,
  value,
  label,
  trendLabel,
  trendDirection = "neutral",
  onClick,
  className,
}: KpiCardProps) {
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex min-w-0 flex-col gap-4 rounded-[10px] border border-border-soft bg-card p-5 text-start transition-colors",
        onClick &&
          "cursor-pointer hover:border-brand-blue hover:bg-brand-blue-100/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-blue-100 text-brand-blue [&_svg]:size-5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-body-32-medium text-foreground">{value}</p>
        <p className="mt-1 text-body-14 text-muted-foreground">{label}</p>
        {trendLabel ? (
          <p className={cn("mt-2 text-body-14 font-medium", trendColor[trendDirection])}>{trendLabel}</p>
        ) : null}
      </div>
    </Comp>
  );
}
