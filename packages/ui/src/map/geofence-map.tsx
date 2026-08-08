"use client";

import * as React from "react";
import {
  APIProvider,
  AdvancedMarker,
  Circle,
  Map,
} from "@vis.gl/react-google-maps";
import { cn } from "../lib/utils";
import type { LatLngLike, LatLngLiteral } from "./types";

const BRAND_BLUE = "#2F77EE";

export interface GeofenceMapProps {
  apiKey: string;
  center: LatLngLiteral;
  radius: number;
  onRadiusChange?: (radius: number) => void;
  onCenterChange?: (center: LatLngLiteral) => void;
  className?: string;
  style?: React.CSSProperties;
  zoom?: number;
  editable?: boolean;
  height?: number | string;
}

export function GeofenceMap({
  apiKey,
  center,
  radius,
  onRadiusChange,
  onCenterChange,
  className,
  style,
  zoom = 15,
  editable = true,
  height = 320,
}: GeofenceMapProps) {
  const handleCenterChanged = React.useCallback(
    (nextCenter: LatLngLike | null | undefined) => {
      if (!nextCenter || !onCenterChange) return;
      onCenterChange({ lat: nextCenter.lat(), lng: nextCenter.lng() });
    },
    [onCenterChange],
  );

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      style={{ height, ...style }}
    >
      <APIProvider apiKey={apiKey} libraries={["marker"]}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI
          mapId="safelagoon-geofence"
          style={{ width: "100%", height: "100%" }}
        >
          <AdvancedMarker position={center}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F77EE] shadow-lg ring-4 ring-[#2F77EE]/25">
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>
          </AdvancedMarker>
          <Circle
            center={center}
            radius={radius}
            editable={editable}
            draggable={Boolean(onCenterChange)}
            onRadiusChanged={onRadiusChange}
            onCenterChanged={onCenterChange ? handleCenterChanged : undefined}
            fillColor={BRAND_BLUE}
            fillOpacity={0.15}
            strokeColor={BRAND_BLUE}
            strokeOpacity={0.85}
            strokeWeight={2}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
