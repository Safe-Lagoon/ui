"use client";

import * as React from "react";
import {
  DeviceModeControl,
  EmptyState,
  MetricRing,
  PageBody,
  SectionCard,
  StatusBanner,
  type DeviceMode,
} from "@safelagoon/ui";
import { AppShellLayout } from "@safelagoon/ui/blocks";
import { ProtoBrand, ProtoNavIcon } from "./portal-chrome";

const WIDTHS = [
  { width: 1280, label: "Desktop · sidebar 240" },
  { width: 820, label: "Tablet · rail 72" },
  { width: 390, label: "Phone · hamburger sheet, no bottom nav" },
] as const;

function HomeBody({ mode, onModeChange }: { mode: DeviceMode; onModeChange: (value: DeviceMode) => void }) {
  return (
    <PageBody>
      <StatusBanner
        title="1 alert needs review"
        meta="AI Shield flagged new content"
        actionLabel="Review"
        onAction={() => undefined}
      />
      <DeviceModeControl value={mode} onValueChange={onModeChange} />
      <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        <SectionCard
          label="Screen time"
          metric="No data yet"
          caption="Limit 2 h"
          leading={<MetricRing empty />}
          links={[{ label: "Manage limits" }]}
          status={{ tone: "neutral", label: "Today" }}
        />
        <SectionCard
          label="Alerts"
          metric="1"
          caption="AI Shield · needs attention"
          links={[{ label: "Open alerts" }]}
          status={{ tone: "danger", label: "Needs review" }}
        />
        <SectionCard
          label="Internet"
          metric="Filter on"
          caption="3 sites today"
          links={[{ label: "Activity" }, { label: "Rules" }]}
          status={{ tone: "ok", label: "Active" }}
        />
      </div>
      <EmptyState
        title="No pending requests"
        description="When the child asks for extra time, the request shows as a separate card — not a fourth mode."
        actionLabel="How requests work"
        onAction={() => undefined}
        secondaryLabel="Open screen-time rules"
        onSecondary={() => undefined}
      />
    </PageBody>
  );
}

export default function HomeShellDemo() {
  const [mode, setMode] = React.useState<DeviceMode>("rules");
  const [childId, setChildId] = React.useState("alex");

  return (
    <div className="space-y-8">
      {WIDTHS.map((frame) => (
        <div key={frame.width} className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {frame.label}
          </p>
          <div
            className="overflow-hidden rounded-[14px] border border-border-soft"
            style={{ width: "100%", maxWidth: frame.width, height: 560 }}
          >
            <AppShellLayout
              className="h-full"
              collapsible={false}
              showProfile={false}
              logo={<ProtoBrand />}
              childProfiles={[
                { id: "alex", name: "Alex", avatarFallback: "AL", os: "android", device: "Android" },
                { id: "sam", name: "Sam", avatarFallback: "SA", os: "ios", device: "iOS" },
              ]}
              activeChildProfileId={childId}
              onChildProfileChange={setChildId}
              topItems={[
                { id: "home", label: "Home", icon: <ProtoNavIcon kind="home" />, active: true },
                { id: "feed", label: "Activity", icon: <ProtoNavIcon kind="feed" />, badgeCount: 1 },
                { id: "rules", label: "Rules", icon: <ProtoNavIcon kind="rules" /> },
                { id: "settings", label: "Settings", icon: <ProtoNavIcon kind="settings" /> },
              ]}
              profile={{ name: "Alexander Demo", avatarFallback: "AD" }}
            >
              <HomeBody mode={mode} onModeChange={setMode} />
            </AppShellLayout>
          </div>
        </div>
      ))}
    </div>
  );
}
