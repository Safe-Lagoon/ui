"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Input } from "../brand/input";
import { Slider } from "../brand/slider";
import { ChoiceRow, type ChoiceOption } from "./choice-row";
import { DangerAction, FieldHint, FormCard, LabeledField } from "./form-surface";

export type PlaceTypeId = "HOME" | "SCHOOL" | "UNKNOWN" | "DANGER" | "YARD";

export type PlaceTypeOption = ChoiceOption & { id: PlaceTypeId };

export const PLACE_TYPES: PlaceTypeOption[] = [
  { id: "HOME", label: "Home" },
  { id: "SCHOOL", label: "School" },
  { id: "UNKNOWN", label: "Place" },
  { id: "DANGER", label: "Danger" },
  { id: "YARD", label: "Yard" },
];

export function placeTypeLabel(type?: string) {
  return PLACE_TYPES.find((row) => row.id === type)?.label ?? "Place";
}

export type PlaceCenter = { lat: number; lng: number };

export const DEFAULT_PLACE_CENTER: PlaceCenter = { lat: 47.6205, lng: -122.3493 };

export interface ZonePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  center: PlaceCenter;
  radius: number;
  name?: string;
  color?: string;
  hint?: string;
  pinLabel?: string;
  onCenterChange?: (center: PlaceCenter) => void;
}

export function ZonePreview({
  center,
  radius,
  name = "Place",
  color = "#b97cff",
  hint = "Tap the map to move the center. Slider sets the radius — same circle the child device uses.",
  pinLabel = "AL",
  onCenterChange,
  className,
  ...props
}: ZonePreviewProps) {
  const canvasRef = React.useRef<HTMLDivElement>(null);

  const toXY = React.useCallback((point: PlaceCenter, width: number, height: number) => {
    return {
      x: (point.lng - DEFAULT_PLACE_CENTER.lng) * 9000 + width / 2,
      y: (DEFAULT_PLACE_CENTER.lat - point.lat) * 9000 + height / 2,
      r: Math.max(24, radius * 0.55),
    };
  }, [radius]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onCenterChange || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    onCenterChange({
      lat: DEFAULT_PLACE_CENTER.lat - (y - rect.height / 2) / 9000,
      lng: DEFAULT_PLACE_CENTER.lng + (x - rect.width / 2) / 9000,
    });
  };

  const [size, setSize] = React.useState({ w: 320, h: 220 });
  React.useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const update = () => setSize({ w: node.clientWidth, h: node.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const pos = toXY(center, size.w, size.h);

  return (
    <div data-slot="zone-preview" className={cn("space-y-2", className)} {...props}>
      {hint ? <FieldHint className="m-0">{hint}</FieldHint> : null}
      <div
        ref={canvasRef}
        role="application"
        aria-label="Place map"
        className="relative h-[280px] overflow-hidden rounded-lg border border-border-soft bg-canvas shadow-card min-[431px]:h-[360px]"
        onClick={handleClick}
      >
        <div
          className="absolute rounded-full border-[3px]"
          style={{
            width: pos.r * 2,
            height: pos.r * 2,
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            borderColor: color,
            background: `${color}33`,
          }}
        >
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[11px] font-semibold text-foreground">
            {name} · {radius} m
          </span>
        </div>
        <div
          className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-lilac text-[11px] font-bold text-white shadow-[0_2px_6px_rgba(45,44,50,0.2)]"
          style={{ left: pos.x, top: pos.y }}
        >
          {pinLabel}
        </div>
      </div>
    </div>
  );
}

export interface PlaceEditorProps {
  name: string;
  type: PlaceTypeId;
  radius: number;
  center: PlaceCenter;
  onNameChange?: (name: string) => void;
  onTypeChange?: (type: PlaceTypeId) => void;
  onRadiusChange?: (radius: number) => void;
  onCenterChange?: (center: PlaceCenter) => void;
  onSave?: () => void;
  onDelete?: () => void;
  isNew?: boolean;
  nameLabel?: string;
  radiusLabel?: string;
  typeLabel?: string;
  saveLabel?: string;
  deleteLabel?: string;
  namePlaceholder?: string;
  map?: React.ReactNode;
  className?: string;
}

export function PlaceEditor({
  name,
  type,
  radius,
  center,
  onNameChange,
  onTypeChange,
  onRadiusChange,
  onCenterChange,
  onSave,
  onDelete,
  isNew,
  nameLabel = "Name",
  radiusLabel = "Radius",
  typeLabel = "Type",
  saveLabel = "Save",
  deleteLabel = "Delete place",
  namePlaceholder = "Home, School…",
  map,
  className,
}: PlaceEditorProps) {
  return (
    <div data-slot="place-editor" className={cn("space-y-4", className)}>
      {map ?? (
        <ZonePreview
          center={center}
          radius={radius}
          name={name || "Place"}
          onCenterChange={onCenterChange}
        />
      )}
      <FormCard className="space-y-4">
        <LabeledField label={nameLabel} htmlFor="place-name">
          <Input
            id="place-name"
            inputSize="portal"
            value={name}
            placeholder={namePlaceholder}
            onChange={(event) => onNameChange?.(event.target.value)}
          />
        </LabeledField>
        <LabeledField label={`${radiusLabel} ${radius} m`} htmlFor="place-radius">
          <Slider
            id="place-radius"
            min={50}
            max={3000}
            step={10}
            value={[radius]}
            onValueChange={(next) => onRadiusChange?.(next[0] ?? radius)}
            aria-label={radiusLabel}
          />
        </LabeledField>
        <LabeledField label={typeLabel}>
          <ChoiceRow
            label={typeLabel}
            items={PLACE_TYPES}
            value={type}
            onValueChange={(id) => onTypeChange?.(id as PlaceTypeId)}
          />
        </LabeledField>
        <Button variant="primary" size="portal" onClick={onSave}>
          {saveLabel}
        </Button>
        {!isNew && onDelete ? <DangerAction onClick={onDelete}>{deleteLabel}</DangerAction> : null}
      </FormCard>
    </div>
  );
}
