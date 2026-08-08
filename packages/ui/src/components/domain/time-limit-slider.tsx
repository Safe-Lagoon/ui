"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Slider } from "../brand/slider";
import { Label } from "../ui/label";

export interface TimeLimitSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  formatDuration: (minutes: number) => string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function TimeLimitSlider({
  value,
  onChange,
  label,
  formatDuration,
  min = 15,
  max = 360,
  step = 15,
  className,
}: TimeLimitSliderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-4">
        <Label>{label}</Label>
        <span className="text-body-16-semibold text-lilac">{formatDuration(value)}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0] ?? min)}
        min={min}
        max={max}
        step={step}
      />
      <div className="flex justify-between text-body-12 text-muted-foreground">
        <span>{formatDuration(min)}</span>
        <span>{formatDuration(max)}</span>
      </div>
    </div>
  );
}
