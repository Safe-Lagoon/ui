"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type ScheduleCell = { day: number; hour: number };

export interface ScheduleGridProps {
  value: ScheduleCell[];
  onChange: (value: ScheduleCell[]) => void;
  dayLabels: string[];
  hourLabel?: string;
  className?: string;
}

function cellKey(day: number, hour: number) {
  return `${day}-${hour}`;
}

export function ScheduleGrid({
  value,
  onChange,
  dayLabels,
  hourLabel,
  className,
}: ScheduleGridProps) {
  const activeSet = React.useMemo(
    () => new Set(value.map((c) => cellKey(c.day, c.hour))),
    [value],
  );

  const toggle = (day: number, hour: number) => {
    const key = cellKey(day, hour);
    if (activeSet.has(key)) {
      onChange(value.filter((c) => !(c.day === day && c.hour === hour)));
    } else {
      onChange([...value, { day, hour }]);
    }
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="inline-block min-w-full">
        <div className="grid grid-cols-[auto_repeat(24,minmax(0,1fr))] gap-px rounded-[10px] border border-border-soft bg-border-soft">
          <div className="bg-background p-1" />
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={hour}
              className="bg-background px-0.5 py-1 text-center text-body-12 text-muted-foreground"
            >
              {hour}
            </div>
          ))}
          {dayLabels.map((label, day) => (
            <React.Fragment key={day}>
              <div className="sticky start-0 z-10 bg-background px-2 py-1 text-body-14 text-foreground">
                {label}
              </div>
              {Array.from({ length: 24 }, (_, hour) => {
                const active = activeSet.has(cellKey(day, hour));
                return (
                  <button
                    key={hour}
                    type="button"
                    aria-pressed={active}
                    aria-label={`${label} ${hour}:00`}
                    onClick={() => toggle(day, hour)}
                    className={cn(
                      "aspect-square min-h-6 w-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      active ? "bg-lilac hover:bg-lilac-hover" : "bg-background hover:bg-brand-blue-100",
                    )}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
        {hourLabel ? (
          <p className="mt-2 text-center text-body-14 text-muted-foreground">{hourLabel}</p>
        ) : null}
      </div>
    </div>
  );
}
