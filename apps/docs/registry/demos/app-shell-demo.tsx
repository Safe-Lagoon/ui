"use client";

import * as React from "react";
import {
  Calendar,
  Gift,
  Home,
  Inbox,
  LogOut,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { AppShellLayout, AppShellPageHeader } from "@safelagoon/ui/blocks";

export default function AppShellDemo() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="h-[720px] overflow-hidden rounded-xl border border-border-soft">
      <AppShellLayout
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        logo={<span className="text-xl font-bold text-brand-blue">Safe Lagoon</span>}
        topItems={[
          { id: "home", label: "Home", icon: <Home className="size-5" />, active: true },
          { id: "inbox", label: "Inbox", icon: <Inbox className="size-5" /> },
          { id: "calendar", label: "Calendar", icon: <Calendar className="size-5" /> },
        ]}
        groups={[
          {
            id: "personal",
            label: "Personal",
            defaultOpen: true,
            items: [
              { id: "profiles", label: "Profiles", icon: <Users className="size-5" /> },
              { id: "rules", label: "Rules", icon: <SlidersHorizontal className="size-5" /> },
            ],
          },
          {
            id: "company",
            label: "Company",
            defaultOpen: false,
            items: [
              { id: "billing", label: "Billing", icon: <Sparkles className="size-5" /> },
            ],
          },
        ]}
        profile={{
          name: "Alexander Lyakhov",
          avatarFallback: "AL",
          notificationCount: 1,
          actions: [
            {
              id: "refer",
              label: "Refer Safe Lagoon",
              description: "Share with friends",
              icon: <Gift className="size-4" />,
            },
            {
              id: "prefs",
              label: "Preferences",
              icon: <Settings className="size-4" />,
            },
            {
              id: "logout",
              label: "Logout",
              icon: <LogOut className="size-4" />,
              destructive: true,
            },
          ],
        }}
      >
        <AppShellPageHeader
          title="Dashboard"
          icon={<Home aria-hidden />}
          showDivider
        />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[10px] border border-border-soft bg-muted/20 p-6">
            <p className="text-body-14 text-muted-foreground">Work area content</p>
            <p className="mt-2 text-body-16 text-foreground">
              Collapse the sidebar with the panel icon, or expand it with the menu button.
            </p>
          </div>
          <div className="rounded-[10px] border border-border-soft bg-muted/20 p-6">
            <p className="text-body-14 text-muted-foreground">Collapsible groups</p>
            <p className="mt-2 text-body-16 text-foreground">
              Personal / Company sections expand and collapse independently.
            </p>
          </div>
        </div>
      </AppShellLayout>
    </div>
  );
}
