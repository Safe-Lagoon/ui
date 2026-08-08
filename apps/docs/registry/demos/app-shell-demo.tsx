"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  Gift,
  Home,
  Inbox,
  LogOut,
  MapPin,
  Moon,
  Settings,
  ShieldBan,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { NotificationsPanel } from "@safelagoon/ui";
import { AppShellLayout, AppShellPageHeader } from "@safelagoon/ui/blocks";
import { LogoHeader } from "@safelagoon/ui/icons";

const childProfiles = [
  {
    id: "emma",
    name: "Emma",
    avatarFallback: "E",
  },
  {
    id: "noah",
    name: "Noah",
    avatarFallback: "N",
  },
  {
    id: "mia",
    name: "Mia",
    icon: <span className="text-lg leading-none">🍋</span>,
  },
];

export default function AppShellDemo() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeChildId, setActiveChildId] = React.useState(childProfiles[0]?.id ?? "emma");
  const activeChild = childProfiles.find((profile) => profile.id === activeChildId);

  return (
    <div className="h-[720px] overflow-hidden rounded-xl border border-border-soft">
      <AppShellLayout
        className="h-full min-h-0"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        notifications={
          <NotificationsPanel
            groups={[
              {
                label: "Today",
                items: [
                  {
                    id: "screen-time",
                    title: "Emma reached her daily screen time limit",
                    preview: "YouTube and TikTok are paused until tomorrow at 8:00 AM.",
                    category: "Screen time",
                    timestamp: "6:42 PM",
                    icon: <Clock aria-hidden />,
                  },
                  {
                    id: "blocked-site",
                    title: "Blocked access attempt on Noah's device",
                    preview: "A gambling site was blocked by the Web filtering rule.",
                    category: "Web filtering",
                    timestamp: "4:15 PM",
                    icon: <ShieldBan aria-hidden />,
                  },
                  {
                    id: "geofence",
                    title: "Mia left the Home safe zone",
                    preview: "Location updated near Oak Street — 320 m from the zone boundary.",
                    category: "Location",
                    timestamp: "2:08 PM",
                    icon: <MapPin aria-hidden />,
                  },
                ],
              },
              {
                label: "Yesterday",
                items: [
                  {
                    id: "new-app",
                    title: "New app installed on Emma's phone",
                    preview: "Roblox was installed. Review and approve or block it in App rules.",
                    category: "Apps",
                    timestamp: "Aug 8, 2026 · 7:31 PM",
                    read: true,
                    icon: <Smartphone aria-hidden />,
                  },
                  {
                    id: "bedtime",
                    title: "Bedtime schedule started for all profiles",
                    preview: "Devices will lock at 9:00 PM on school nights.",
                    category: "Schedules",
                    timestamp: "Aug 8, 2026 · 9:00 PM",
                    read: true,
                    icon: <Moon aria-hidden />,
                  },
                ],
              },
            ]}
          />
        }
        logo={<LogoHeader className="h-6" />}
        childProfiles={childProfiles}
        activeChildProfileId={activeChildId}
        onChildProfileChange={setActiveChildId}
        childProfileSwitchLabel="Switch child profile"
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
          notificationCount: 3,
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
          title={activeChild ? `${activeChild.name}'s dashboard` : "Dashboard"}
          icon={<Home aria-hidden />}
          showDivider
        />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[10px] border border-border-soft bg-muted/20 p-6">
            <p className="text-body-14 text-muted-foreground">Child profile switcher</p>
            <p className="mt-2 text-body-16 text-foreground">
              Use the dropdown below the logo to switch between child profiles. Parent account
              settings stay in the footer profile menu.
            </p>
          </div>
          <div className="rounded-[10px] border border-border-soft bg-muted/20 p-6">
            <p className="text-body-14 text-muted-foreground">Notifications</p>
            <p className="mt-2 text-body-16 text-foreground">
              Click the bell next to your profile to open the notifications popup. Unread items
              show a red dot on the bell.
            </p>
          </div>
        </div>
      </AppShellLayout>
    </div>
  );
}
