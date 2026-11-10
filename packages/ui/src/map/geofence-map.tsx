"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import {
  APIProvider,
  AdvancedMarker,
  Circle,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import { cn } from "../lib/utils";
import { useTheme } from "../components/theme-provider";
import type { LatLngLiteral } from "./types";

const BRAND_BLUE = "#2F77EE";
const MIN_RADIUS = 50;
const MAX_RADIUS = 3000;
const EARTH_M = 6371000;
const BEARINGS = [0, 90, 180, 270];

type MapsCircle = {
  getCenter: () => unknown;
  getBounds: () => unknown;
};

type MapsMap = {
  setCenter: (center: LatLngLiteral) => void;
  fitBounds: (bounds: unknown, padding?: number) => void;
  getZoom: () => number | null | undefined;
  setZoom: (zoom: number) => void;
};

type MapsMouseEvent = {
  latLng?: { lat: () => number; lng: () => number } | LatLngLiteral | null;
};

type MapsApi = {
  Circle: new (opts: { center: LatLngLiteral; radius: number }) => MapsCircle;
};

function mapsApi(): MapsApi | undefined {
  return (window as Window & { google?: { maps?: MapsApi } }).google?.maps;
}

function readLatLng(raw: unknown): LatLngLiteral | null {
  if (!raw || typeof raw !== "object") return null;
  const rec = raw as { lat?: unknown; lng?: unknown };
  const lat = typeof rec.lat === "function" ? (rec.lat as () => number)() : Number(rec.lat);
  const lng = typeof rec.lng === "function" ? (rec.lng as () => number)() : Number(rec.lng);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

function offsetPoint(center: LatLngLiteral, radiusM: number, bearingDeg: number): LatLngLiteral {
  const brng = (bearingDeg * Math.PI) / 180;
  const lat1 = (center.lat * Math.PI) / 180;
  const lng1 = (center.lng * Math.PI) / 180;
  const ang = radiusM / EARTH_M;
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(ang) + Math.cos(lat1) * Math.sin(ang) * Math.cos(brng));
  const lng2 =
    lng1 +
    Math.atan2(Math.sin(brng) * Math.sin(ang) * Math.cos(lat1), Math.cos(ang) - Math.sin(lat1) * Math.sin(lat2));
  return { lat: (lat2 * 180) / Math.PI, lng: (lng2 * 180) / Math.PI };
}

function metersBetween(a: LatLngLiteral, b: LatLngLiteral) {
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_M * Math.asin(Math.min(1, Math.sqrt(x)));
}

function FrameCircle({
  center,
  fallback,
  radius,
}: {
  center: LatLngLiteral | null;
  fallback?: LatLngLiteral;
  radius: number;
}) {
  const map = useMap();
  const framed = React.useRef(false);
  const lastCenter = React.useRef<LatLngLiteral | null>(null);
  const lastRadius = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!map) return;
    if (!center) {
      if (fallback) map.setCenter(fallback);
      return;
    }
    const prevCenter = lastCenter.current;
    const prevRadius = lastRadius.current;
    lastCenter.current = center;
    lastRadius.current = radius;
    const jumped = Boolean(prevCenter && metersBetween(prevCenter, center) > 4000);
    const radiusJump = Boolean(prevRadius && (radius / prevRadius < 0.45 || radius / prevRadius > 2.2));
    if (framed.current && !jumped && !radiusJump) return;
    const gmaps = mapsApi();
    if (!gmaps?.Circle) return;
    const bounds = new gmaps.Circle({ center, radius: Math.max(MIN_RADIUS, radius) }).getBounds();
    if (!bounds) return;
    map.fitBounds(bounds, 56);
    framed.current = true;
  }, [map, center, fallback, radius]);

  return null;
}

function CaptureMap({ onReady }: { onReady: (map: MapsMap | null) => void }) {
  const map = useMap() as MapsMap | null;
  React.useEffect(() => {
    onReady(map);
  }, [map, onReady]);
  return null;
}

function ZoomControls({
  map,
  zoomInLabel = "Zoom in",
  zoomOutLabel = "Zoom out",
}: {
  map: MapsMap | null;
  zoomInLabel?: string;
  zoomOutLabel?: string;
}) {
  const nudge = (delta: number) => {
    if (!map) return;
    const current = map.getZoom();
    if (current == null) return;
    map.setZoom(Math.min(21, Math.max(3, current + delta)));
  };

  return (
    <div className="absolute right-3 top-3 z-10 flex flex-col overflow-hidden rounded-lg border border-border-soft bg-card shadow-card">
      <button
        type="button"
        aria-label={zoomInLabel}
        className="grid size-9 place-items-center text-ink hover:bg-muted/60"
        onClick={() => nudge(1)}
      >
        <Plus size={16} aria-hidden />
      </button>
      <button
        type="button"
        aria-label={zoomOutLabel}
        className="grid size-9 place-items-center border-t border-border-soft text-ink hover:bg-muted/60"
        onClick={() => nudge(-1)}
      >
        <Minus size={16} aria-hidden />
      </button>
    </div>
  );
}

function Handle({
  position,
  label,
  cursor,
  size,
  onMove,
}: {
  position: LatLngLiteral;
  label: string;
  cursor: string;
  size: number;
  onMove: (next: LatLngLiteral) => void;
}) {
  const dragging = React.useRef(false);
  const [held, setHeld] = React.useState(position);

  React.useEffect(() => {
    if (!dragging.current) setHeld(position);
  }, [position]);

  const emit = (event: MapsMouseEvent | null | undefined) => {
    const parsed = readLatLng(event?.latLng);
    if (parsed) onMove(parsed);
  };

  return (
    <AdvancedMarker
      position={held}
      title={label}
      draggable
      clickable
      zIndex={40}
      anchorLeft="-50%"
      anchorTop="-50%"
      onDragStart={() => {
        dragging.current = true;
      }}
      onDrag={emit}
      onDragEnd={(event) => {
        dragging.current = false;
        const parsed = readLatLng(event?.latLng);
        if (parsed) setHeld(parsed);
        emit(event);
      }}
    >
      <div
        role="button"
        aria-label={label}
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          background: "#fff",
          border: `2.5px solid ${BRAND_BLUE}`,
          boxShadow: "0 1px 4px rgba(15,23,42,.35)",
          cursor,
        }}
      />
    </AdvancedMarker>
  );
}

function ZoneHandles({
  center,
  radius,
  onCenterChange,
  onRadiusChange,
  moveLabel = "Move place",
  resizeLabel = "Resize place",
}: {
  center: LatLngLiteral;
  radius: number;
  onCenterChange: (center: LatLngLiteral) => void;
  onRadiusChange: (radius: number) => void;
  moveLabel?: string;
  resizeLabel?: string;
}) {
  const r = Math.max(MIN_RADIUS, radius);
  return (
    <>
      <Handle position={center} label={moveLabel} cursor="move" size={18} onMove={onCenterChange} />
      {BEARINGS.map((bearing) => (
        <Handle
          key={bearing}
          position={offsetPoint(center, r, bearing)}
          label={resizeLabel}
          cursor={bearing % 180 === 0 ? "ns-resize" : "ew-resize"}
          size={16}
          onMove={(next) => onRadiusChange(Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, metersBetween(center, next))))}
        />
      ))}
    </>
  );
}

export interface GeofenceMapProps {
  apiKey: string;
  center: LatLngLiteral | null;
  fallbackCenter?: LatLngLiteral;
  radius: number;
  onRadiusChange?: (radius: number) => void;
  onCenterChange?: (center: LatLngLiteral) => void;
  clickHint?: string;
  className?: string;
  style?: React.CSSProperties;
  zoom?: number;
  editable?: boolean;
  height?: number | string;
  zoomInLabel?: string;
  zoomOutLabel?: string;
  language?: string;
  moveLabel?: string;
  resizeLabel?: string;
}

export function GeofenceMap({
  apiKey,
  center,
  fallbackCenter,
  radius,
  onRadiusChange,
  onCenterChange,
  clickHint,
  className,
  style,
  zoom = 15,
  editable = true,
  height = 320,
  zoomInLabel,
  zoomOutLabel,
  moveLabel,
  resizeLabel,
  language,
}: GeofenceMapProps) {
  const { resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "DARK" : "LIGHT";
  const placed = Boolean(center);
  const camera = center ?? fallbackCenter ?? { lat: 47.6205, lng: -122.3493 };
  const canEdit = Boolean(editable && onCenterChange);
  const circleRef = React.useRef<MapsCircle | null>(null);
  const [map, setMap] = React.useState<MapsMap | null>(null);

  const handleMapClick = React.useCallback(
    (event: { detail?: { latLng?: unknown } }) => {
      if (placed || !onCenterChange) return;
      const parsed = readLatLng(event?.detail?.latLng);
      if (parsed) onCenterChange(parsed);
    },
    [placed, onCenterChange],
  );

  const handleRadiusChanged = React.useCallback(
    (next: number) => {
      if (!onRadiusChange || !Number.isFinite(next)) return;
      onRadiusChange(Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, next)));
    },
    [onRadiusChange],
  );

  const commitCircleCenter = React.useCallback(() => {
    const parsed = readLatLng(circleRef.current?.getCenter());
    if (parsed && onCenterChange) onCenterChange(parsed);
  }, [onCenterChange]);

  return (
    <div
      className={cn("sl-geofence-map relative h-full min-h-0 overflow-hidden rounded-xl", className)}
      style={{ height, ...style }}
    >
      <APIProvider apiKey={apiKey} libraries={["marker"]} language={language}>
        <Map
          key={colorScheme}
          defaultCenter={camera}
          defaultZoom={zoom}
          onClick={handleMapClick}
          gestureHandling="greedy"
          disableDefaultUI
          clickableIcons={false}
          mapId="safelagoon-geofence"
          colorScheme={colorScheme}
          style={{ width: "100%", height: "100%", cursor: placed ? undefined : "crosshair" }}
        >
          {placed && center ? (
            <Circle
              ref={circleRef}
              center={center}
              radius={Math.max(MIN_RADIUS, radius)}
              editable={false}
              draggable={canEdit}
              onDragEnd={canEdit ? commitCircleCenter : undefined}
              fillColor={BRAND_BLUE}
              fillOpacity={0.15}
              strokeColor={BRAND_BLUE}
              strokeOpacity={0.85}
              strokeWeight={2}
            />
          ) : null}
          {placed && center && canEdit && onCenterChange ? (
            <ZoneHandles
              center={center}
              radius={radius}
              onCenterChange={onCenterChange}
              onRadiusChange={handleRadiusChanged}
              moveLabel={moveLabel}
              resizeLabel={resizeLabel}
            />
          ) : null}
          <FrameCircle center={center ?? null} fallback={fallbackCenter} radius={radius} />
          <CaptureMap onReady={setMap} />
        </Map>
      </APIProvider>
      {!placed && clickHint ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-3 z-10 text-center text-[13px] font-medium text-ink">
          <span className="rounded-full bg-card/90 px-3 py-1.5 shadow-card">{clickHint}</span>
        </p>
      ) : null}
      <ZoomControls map={map} zoomInLabel={zoomInLabel} zoomOutLabel={zoomOutLabel} />
    </div>
  );
}
