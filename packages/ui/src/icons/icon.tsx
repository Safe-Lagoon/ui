import * as React from "react";
import { cn } from "../lib/utils";
import type { IconProps } from "./types";

export function Icon({
  size = 24,
  className,
  children,
  viewBox = "0 0 24 24",
  ...props
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  );
}
