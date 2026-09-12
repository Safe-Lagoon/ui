import * as React from "react";
import { cn } from "../../lib/utils";

export const APP_MARK_COLORS = {
  tiktok: "#111",
  roblox: "#e2231a",
  minecraft: "#5d9b32",
  youtube: "#ff0000",
} as const;

export type AppMarkKind = keyof typeof APP_MARK_COLORS;

export interface AppMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  kind?: AppMarkKind | (string & {});
  mark: React.ReactNode;
}

/** 40×40 app glyph from proto `.sr-icon-*`. */
export function AppMark({ kind = "tiktok", mark, className, style, ...props }: AppMarkProps) {
  const background =
    kind in APP_MARK_COLORS ? APP_MARK_COLORS[kind as AppMarkKind] : APP_MARK_COLORS.tiktok;

  return (
    <span
      data-slot="app-mark"
      data-kind={kind}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-[10px] text-[14px] font-bold text-white",
        className,
      )}
      style={{ background, ...style }}
      aria-hidden
      {...props}
    >
      {mark}
    </span>
  );
}
