"use client";

import { BurgerMenu } from "@safelagoon/ui";

export default function BurgerMenuDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-border-soft bg-background p-4">
        <span className="font-bold text-foreground">Safe Lagoon</span>
        <BurgerMenu
          items={[
            { label: "Dashboard", href: "#dashboard" },
            { label: "Profiles", href: "#profiles" },
            { label: "Settings", href: "#settings" },
          ]}
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border-soft bg-footer p-4 text-white">
        <span className="font-bold">On dark surfaces</span>
        <BurgerMenu
          items={[
            { label: "Dashboard", href: "#dashboard" },
            { label: "Profiles", href: "#profiles" },
            { label: "Settings", href: "#settings" },
          ]}
        />
      </div>
    </div>
  );
}
