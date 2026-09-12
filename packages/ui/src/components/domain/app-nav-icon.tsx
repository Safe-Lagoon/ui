import * as React from "react";
import { cn } from "../../lib/utils";

const PATHS = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z",
  feed: "M4 6h16M4 12h16M4 18h10",
  rules: "M12 2v2M12 20v2M2 12h2M20 12h2",
  settings:
    "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
} as const;

export type AppNavIconKind = keyof typeof PATHS;

export interface AppNavIconProps extends React.SVGAttributes<SVGSVGElement> {
  kind: AppNavIconKind;
}

/** Proto sidebar stroke icons (18px, 1.75 stroke). */
export function AppNavIcon({ kind, className, ...props }: AppNavIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      data-slot="app-nav-icon"
      data-kind={kind}
      className={cn("size-[18px]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {kind === "rules" || kind === "settings" ? <circle cx="12" cy="12" r="3" /> : null}
      <path d={PATHS[kind]} />
    </svg>
  );
}
