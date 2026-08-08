"use client";

import { BurgerMenu } from "@safelagoon/ui";

export default function BurgerMenuDemo() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border-soft bg-footer p-4 text-white">
      <span className="font-bold">Safe Lagoon</span>
      <BurgerMenu
        items={[
          { label: "Dashboard", href: "#dashboard" },
          { label: "Profiles", href: "#profiles" },
          { label: "Settings", href: "#settings" },
        ]}
      />
    </div>
  );
}
