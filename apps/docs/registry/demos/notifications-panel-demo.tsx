"use client";

import { Clock, MapPin, Moon, ShieldBan, Smartphone } from "lucide-react";
import { NotificationsPanel } from "@safelagoon/ui";

export default function NotificationsPanelDemo() {
  return (
    <div className="mx-auto h-[520px] max-w-xl overflow-hidden rounded-[10px] border border-border-soft">
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
    </div>
  );
}
