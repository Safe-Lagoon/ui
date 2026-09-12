"use client";

import * as React from "react";
import { Home, List, Settings, SlidersHorizontal } from "lucide-react";
import { FilterChips } from "@safelagoon/ui";
import { AppShellLayout } from "@safelagoon/ui/blocks";
import { LogoHeader } from "@safelagoon/ui/icons";
import { navSection, PortalScreenBody, PORTAL_SCREENS, type PortalScreen } from "./portal-screens";

const WIDTHS = [
  { width: 1280, label: "Desktop · sidebar 240" },
  { width: 820, label: "Tablet · rail 72" },
  { width: 390, label: "Phone · hamburger sheet, no bottom nav" },
] as const;

export default function PortalConstructorDemo() {
  const [screen, setScreen] = React.useState<PortalScreen>("/home");
  const [childId, setChildId] = React.useState("alex");
  const section = navSection(screen);

  React.useEffect(() => {
    if (screen === "/home/ios") setChildId("sam");
  }, [screen]);

  const body = <PortalScreenBody screen={screen} onGo={setScreen} ios={childId === "sam"} />;

  return (
    <div className="space-y-6">
      <FilterChips
        value={screen}
        onValueChange={(id) => setScreen(id as PortalScreen)}
        items={PORTAL_SCREENS}
        aria-label="Constructor screens"
      />
      <div className="space-y-8">
        {WIDTHS.map((frame) => (
          <div key={frame.width} className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {frame.label}
            </p>
            <div
              className="overflow-hidden rounded-[14px] border border-border-soft"
              style={{ width: "100%", maxWidth: frame.width, height: 640 }}
            >
              {screen === "/auth" ? (
                <div className="h-full overflow-auto bg-canvas">{body}</div>
              ) : (
                <AppShellLayout
                  className="h-full"
                  logo={<LogoHeader className="h-6" />}
                  childProfiles={[
                    { id: "alex", name: "Alex", avatarFallback: "AL", os: "android", device: "Android", badgeCount: 1 },
                    { id: "sam", name: "Sam", avatarFallback: "SA", os: "ios", device: "iOS", badgeCount: 1 },
                  ]}
                  activeChildProfileId={childId}
                  onChildProfileChange={setChildId}
                  topItems={[
                    {
                      id: "home",
                      label: "Home",
                      icon: <Home className="size-[18px]" />,
                      active: section === "home",
                      onClick: () => setScreen("/home"),
                    },
                    {
                      id: "feed",
                      label: "Activity",
                      icon: <List className="size-[18px]" />,
                      badgeCount: 1,
                      active: section === "feed",
                      onClick: () => setScreen("/feed"),
                    },
                    {
                      id: "rules",
                      label: "Rules",
                      icon: <SlidersHorizontal className="size-[18px]" />,
                      active: section === "rules",
                      onClick: () => setScreen("/rules"),
                    },
                    {
                      id: "settings",
                      label: "Settings",
                      icon: <Settings className="size-[18px]" />,
                      active: section === "settings",
                      onClick: () => setScreen("/settings"),
                    },
                  ]}
                  profile={{ name: "Alexander Demo", avatarFallback: "AD" }}
                >
                  {body}
                </AppShellLayout>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
