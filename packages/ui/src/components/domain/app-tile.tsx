import * as React from "react";
import { cn } from "../../lib/utils";
import { Tag } from "../brand/tag";

export type AppTileMode = "blacklist" | "whitelist" | "in-review";

export interface AppTileProps {
  icon: React.ReactNode;
  name: string;
  time: string;
  mode: AppTileMode;
  modeLabel: string;
  onClick?: () => void;
  className?: string;
}

const modeStyles: Record<AppTileMode, string> = {
  blacklist: "border-destructive/30 bg-destructive/5",
  whitelist: "border-green/30 bg-green-100/50",
  "in-review": "border-brand-blue-300 bg-brand-blue-100/50",
};

const tagVariants: Record<AppTileMode, "default" | "success" | "price"> = {
  blacklist: "default",
  whitelist: "success",
  "in-review": "price",
};

export function AppTile({
  icon,
  name,
  time,
  mode,
  modeLabel,
  onClick,
  className,
}: AppTileProps) {
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-[10px] border p-3 text-start transition-colors",
        modeStyles[mode],
        onClick && "cursor-pointer hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-background">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-body-16-semibold text-foreground">{name}</p>
        <p className="text-body-14 text-muted-foreground">{time}</p>
      </div>
      <Tag variant={tagVariants[mode]} size="sm">
        {modeLabel}
      </Tag>
    </Comp>
  );
}
