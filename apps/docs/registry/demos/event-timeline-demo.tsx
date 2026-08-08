"use client";

import { EventTimelineLayout } from "@safelagoon/ui/blocks";
import { FeatureApps, FeatureGps, FeatureWeb } from "@safelagoon/ui/icons";

const types = [
  { id: "web", label: "Web", icon: <FeatureWeb className="size-4" /> },
  { id: "app", label: "Apps", icon: <FeatureApps className="size-4" /> },
  { id: "location", label: "Location", icon: <FeatureGps className="size-4" /> },
];

const events = [
  {
    id: "1",
    type: "web",
    timestamp: "Today, 08:12",
    title: "Blocked website",
    description: "example.com/category/games",
    icon: <FeatureWeb className="size-5" />,
    blocked: true,
    blockedLabel: "Blocked",
  },
  {
    id: "2",
    type: "app",
    timestamp: "Today, 09:45",
    title: "App time limit reached",
    description: "YouTube — 2h daily limit",
    icon: <FeatureApps className="size-5" />,
  },
  {
    id: "3",
    type: "location",
    timestamp: "Today, 15:20",
    title: "Left safe zone",
    description: "Home geofence",
    icon: <FeatureGps className="size-5" />,
  },
  {
    id: "4",
    type: "web",
    timestamp: "Yesterday, 19:03",
    title: "Allowed website",
    description: "wikipedia.org",
    icon: <FeatureWeb className="size-5" />,
  },
];

export default function EventTimelineDemo() {
  return (
    <EventTimelineLayout
      events={events}
      types={types}
      filterLabel="Event types"
      clearFiltersLabel="Clear filters"
      emptyTitle="No events"
      emptyDescription="Try another filter."
    />
  );
}
