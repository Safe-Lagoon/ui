"use client";

import * as React from "react";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { cn } from "../lib/utils";
import { LocationPin } from "./location-pin";
import type { LatLngLiteral } from "./types";

export interface MiniMapProps {
  apiKey: string;
  center: LatLngLiteral;
  zoom?: number;
  className?: string;
  height?: number;
  width?: number | string;
  showPin?: boolean;
}

export function MiniMap({
  apiKey,
  center,
  zoom = 14,
  className,
  height = 120,
  width = "100%",
  showPin = true,
}: MiniMapProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg", className)}
      style={{ width, height }}
    >
      <APIProvider apiKey={apiKey} libraries={["marker"]}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="none"
          disableDefaultUI
          clickableIcons={false}
          scrollwheel={false}
          mapId="safelagoon-minimap"
          style={{ width: "100%", height: "100%" }}
        >
          {showPin ? <LocationPin position={center} /> : null}
        </Map>
      </APIProvider>
    </div>
  );
}
