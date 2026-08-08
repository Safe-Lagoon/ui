"use client";

import * as React from "react";
import { Bold, Italic, List, MapPin, ShieldBan, Underline } from "lucide-react";
import { Toggle, ToggleGroup, ToggleGroupItem } from "@safelagoon/ui";

export default function ToggleDemo() {
  const [view, setView] = React.useState("overview");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-14 font-medium text-muted-foreground">Single toggles</p>
        <div className="flex flex-wrap items-center gap-2">
          <Toggle aria-label="Bold" variant="outline" size="sm">
            <Bold aria-hidden />
          </Toggle>
          <Toggle aria-label="Italic" variant="outline" size="sm" defaultPressed>
            <Italic aria-hidden />
          </Toggle>
          <Toggle aria-label="Underline" variant="outline" size="sm">
            <Underline aria-hidden />
          </Toggle>
        </div>
      </div>

      <div>
        <p className="mb-3 text-body-14 font-medium text-muted-foreground">Toggle group</p>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(next) => next && setView(next)}
          variant="outline"
          size="sm"
        >
          <ToggleGroupItem value="overview" aria-label="Overview">
            <List aria-hidden />
            Overview
          </ToggleGroupItem>
          <ToggleGroupItem value="location" aria-label="Location">
            <MapPin aria-hidden />
            Location
          </ToggleGroupItem>
          <ToggleGroupItem value="blocked" aria-label="Blocked">
            <ShieldBan aria-hidden />
            Blocked
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
