import * as React from "react";
import { cn } from "../../lib/utils";

const BLUE = "#2F77EE";
const LILAC = "#B97CFF";

const PATHS = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z",
  feed: "M4 6h16M4 12h16M4 18h10",
  rules: "M12 2v2M12 20v2M2 12h2M20 12h2",
  settings:
    "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0-1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
} as const;

export type AppNavIconKind = keyof typeof PATHS;

export interface AppNavIconProps extends React.SVGAttributes<SVGSVGElement> {
  kind: AppNavIconKind;
}

/** Sidebar marks in the same blue / lilac as the Services feature icons. */
export function AppNavIcon({ kind, className, ...props }: AppNavIconProps) {
  const stroke = { fill: "none", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const marks =
    kind === "home"
      ? [
          <path key="house" d={PATHS.home} stroke={BLUE} {...stroke} />,
          <path key="door" d="M10 21v-5h4v5" stroke={LILAC} {...stroke} />,
        ]
      : kind === "feed"
        ? [
            <path key="a" d="M4 6h16" stroke={BLUE} {...stroke} />,
            <path key="b" d="M4 12h16" stroke={LILAC} {...stroke} />,
            <path key="c" d="M4 18h10" stroke={BLUE} {...stroke} />,
          ]
        : [
            <circle key="hub" cx="12" cy="12" r="3" stroke={LILAC} {...stroke} />,
            <path key="gear" d={PATHS[kind]} stroke={BLUE} {...stroke} />,
          ];

  return (
    <svg
      viewBox="0 0 24 24"
      data-slot="app-nav-icon"
      data-kind={kind}
      className={cn("size-5", className)}
      fill="none"
      aria-hidden
      {...props}
    >
      {marks}
    </svg>
  );
}
