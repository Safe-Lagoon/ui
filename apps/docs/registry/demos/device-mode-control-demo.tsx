"use client";

import * as React from "react";
import { DeviceModeControl, type DeviceMode } from "@safelagoon/ui";

const WIDTHS = [
  { width: 1280, label: "Desktop" },
  { width: 820, label: "Tablet" },
  { width: 390, label: "Phone" },
] as const;

const MODES: DeviceMode[] = ["allow", "rules", "block"];

export default function DeviceModeControlDemo() {
  const [value, setValue] = React.useState<DeviceMode>("rules");

  return (
    <div className="space-y-8">
      <DeviceModeControl value={value} onValueChange={setValue} />
      <div className="grid gap-6">
        {MODES.map((mode) => (
          <div key={mode} className="space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
              {mode}
            </p>
            <div className="flex flex-wrap gap-4">
              {WIDTHS.map((frame) => (
                <div key={`${mode}-${frame.width}`} className="space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">
                    {frame.label} · {frame.width}
                  </p>
                  <div
                    className="rounded-[14px] border border-border-soft bg-muted p-3"
                    style={{ width: frame.width === 390 ? 390 : 560 }}
                  >
                    <DeviceModeControl value={mode} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
