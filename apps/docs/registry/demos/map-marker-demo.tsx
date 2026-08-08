"use client";

import { MiniMap, GeofenceMap } from "@safelagoon/ui/map";

const CENTER = { lat: 59.3293, lng: 18.0686 };
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

export default function MapMarkerDemo() {
  if (!API_KEY) {
    return (
      <div className="space-y-4">
        <div className="rounded-[10px] border border-dashed border-border-soft bg-muted/30 p-6 text-body-14 text-muted-foreground">
          Set <code className="text-foreground">NEXT_PUBLIC_GOOGLE_MAPS_KEY</code> in{" "}
          <code className="text-foreground">apps/docs/.env.local</code> to load live Google Maps.
        </div>
        <div className="relative h-64 w-full max-w-lg overflow-hidden rounded-xl border border-border-soft">
          <div
            className="absolute inset-0 bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50"
            aria-hidden
          />
          <div className="absolute start-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue shadow-md ring-4 ring-white/80">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
            <div className="mt-0.5 h-2 w-2 rotate-45 bg-brand-blue" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid max-w-2xl gap-6">
      <div>
        <p className="mb-2 text-body-14-semibold text-foreground">MiniMap</p>
        <MiniMap apiKey={API_KEY} center={CENTER} height={200} className="w-full border border-border-soft" />
      </div>
      <div>
        <p className="mb-2 text-body-14-semibold text-foreground">GeofenceMap</p>
        <GeofenceMap
          apiKey={API_KEY}
          center={CENTER}
          radius={500}
          height={320}
          editable
          className="w-full overflow-hidden rounded-xl border border-border-soft"
        />
      </div>
    </div>
  );
}
