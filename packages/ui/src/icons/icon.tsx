import * as React from "react";
import { cn } from "../lib/utils";
import type { IconProps } from "./types";

export function Icon({
  size,
  className,
  children,
  viewBox = "0 0 24 24",
  ...props
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      className={cn("size-6 shrink-0", className)}
      {...(size != null ? { width: size, height: size } : {})}
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  );
}
