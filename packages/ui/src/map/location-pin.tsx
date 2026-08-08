"use client";

import * as React from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { cn } from "../lib/utils";
import type { LatLngLiteral } from "./types";

export interface LocationPinProps {
  position: LatLngLiteral;
  label?: string;
  className?: string;
  color?: string;
}

export function LocationPin({
  position,
  label,
  className,
  color = "#2F77EE",
}: LocationPinProps) {
  return (
    <AdvancedMarker position={position} title={label}>
      <div
        className={cn("flex flex-col items-center", className)}
        aria-label={label}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full shadow-md ring-4 ring-white/80"
          style={{ backgroundColor: color }}
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
        <div
          className="mt-0.5 h-2 w-2 rotate-45"
          style={{ backgroundColor: color }}
        />
      </div>
    </AdvancedMarker>
  );
}
