"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type MapToolId = "draw" | "pan";

export type MapTool = {
  id: MapToolId | (string & {});
  label: string;
};

const DEFAULT_TOOLS: MapTool[] = [
  { id: "draw", label: "Draw zone" },
  { id: "pan", label: "Move map" },
];

export interface MapToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  tools?: MapTool[];
  hint?: React.ReactNode;
}

/** Places map chips — proto `.map-tool`. */
export function MapToolbar({
  value,
  defaultValue = "draw",
  onValueChange,
  tools = DEFAULT_TOOLS,
  hint,
  className,
  ...props
}: MapToolbarProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = value ?? internal;

  return (
    <div
      data-slot="map-toolbar"
      className={cn("mb-2.5 flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      <div role="radiogroup" aria-label="Map tools" className="flex flex-wrap items-center gap-2">
        {tools.map((tool) => {
          const on = tool.id === selected;
          return (
            <button
              key={tool.id}
              type="button"
              role="radio"
              aria-checked={on}
              data-map-tool={tool.id}
              className={cn(
                "h-8 rounded-full border px-3 text-[12.5px] font-semibold leading-none",
                on ? "border-lilac bg-lilac text-white" : "border-border-soft bg-card text-ink",
              )}
              onClick={() => {
                if (value === undefined) setInternal(tool.id);
                onValueChange?.(tool.id);
              }}
            >
              {tool.label}
            </button>
          );
        })}
      </div>
      {hint ? <span className="text-[12.5px] text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

export interface MapStageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** Proto `.map-stage` — 360 desktop / 280 phone via shell mode. */
export function MapStage({ className, children, ...props }: MapStageProps) {
  return (
    <div
      data-slot="map-stage"
      className={cn(
        "relative mb-4 overflow-hidden rounded-lg border border-border-soft bg-canvas shadow-card",
        "h-[360px] group-data-[shell-mode=phone]/shell:h-[280px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
