"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type DeviceMode = "allow" | "rules" | "block";

export type DeviceModeOption = {
  value: DeviceMode;
  label: string;
};

const DEFAULT_OPTIONS: DeviceModeOption[] = [
  { value: "allow", label: "Allow" },
  { value: "rules", label: "Apply Rules" },
  { value: "block", label: "Block" },
];

const DEFAULT_CAPTIONS: Record<DeviceMode, string> = {
  allow: "Rules are paused",
  rules: "Your rules are on",
  block: "Device is blocked",
};

export interface DeviceModeControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: DeviceMode;
  onValueChange?: (value: DeviceMode) => void;
  options?: DeviceModeOption[];
  captions?: Partial<Record<DeviceMode, string>>;
  caption?: React.ReactNode;
  disabled?: boolean;
  busy?: boolean;
  pendingValue?: DeviceMode;
}

const segmentClass: Record<DeviceMode, { idle: string; on: string }> = {
  allow: {
    idle: "text-success-strong",
    on: "bg-success-strong text-white",
  },
  rules: {
    idle: "text-violet",
    on: "bg-lilac text-white",
  },
  block: {
    idle: "text-destructive",
    on: "bg-destructive text-white",
  },
};

function ModeShimmer() {
  return <span className="sl-mode-shimmer" aria-hidden />;
}

export function DeviceModeControl({
  value,
  onValueChange,
  options = DEFAULT_OPTIONS,
  captions,
  caption,
  disabled = false,
  busy = false,
  pendingValue,
  className,
  ...props
}: DeviceModeControlProps) {
  const locked = disabled || busy;
  const shown = pendingValue ?? value;
  const resolvedCaption = caption ?? captions?.[shown] ?? DEFAULT_CAPTIONS[shown];

  return (
    <div data-slot="device-mode-control" className={cn("mb-5 flex flex-col", className)} {...props}>
      <div
        role="radiogroup"
        aria-label="Device mode"
        aria-disabled={locked || undefined}
        aria-busy={busy || undefined}
        className={cn(
          "grid grid-cols-3 gap-1 rounded-lg border border-border-soft bg-card p-1 shadow-card",
          locked && "pointer-events-none",
        )}
      >
        {options.map((option) => {
          const selected = option.value === shown;
          const pending = busy && option.value === pendingValue;
          const look = segmentClass[option.value];
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={locked}
              data-state={selected ? "on" : "off"}
              data-mode={option.value}
              data-pending={pending || undefined}
              className={cn(
                "relative isolate inline-flex h-12 min-h-[48px] items-center justify-center overflow-hidden rounded-[10px] px-2 text-[14px] font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none",
                selected ? look.on : look.idle,
              )}
              onClick={() => {
                if (!locked && option.value !== value) onValueChange?.(option.value);
              }}
            >
              {pending ? <ModeShimmer /> : null}
              <span className="relative z-[1] truncate">{option.label}</span>
            </button>
          );
        })}
      </div>
      {resolvedCaption ? (
        <p data-slot="device-mode-caption" className="mt-2 px-1 text-[13px] text-muted-foreground">
          {resolvedCaption}
        </p>
      ) : null}
    </div>
  );
}
