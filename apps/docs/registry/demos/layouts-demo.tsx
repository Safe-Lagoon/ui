"use client";

import { Home, Users } from "lucide-react";
import { CabinetLayout, MarketingLayout } from "@safelagoon/ui/blocks";

export default function LayoutsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-body-14 font-medium text-muted-foreground">Marketing layout</p>
        <div className="h-64 overflow-hidden rounded-xl border border-border-soft">
          <MarketingLayout>
            <div className="flex h-full items-center justify-center bg-muted/20 p-6 text-body-16 text-muted-foreground">
              Hero / page content
            </div>
          </MarketingLayout>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-14 font-medium text-muted-foreground">Cabinet layout (sidebar)</p>
        <div className="h-64 overflow-hidden rounded-xl border border-border-soft">
          <CabinetLayout
            sidebarHeader={<span className="font-bold text-brand-blue">Cabinet</span>}
            navItems={[
              { id: "home", label: "Home", icon: <Home className="size-4" />, active: true },
              { id: "profiles", label: "Profiles", icon: <Users className="size-4" /> },
            ]}
          >
            <div className="text-body-16 text-muted-foreground">Main content area</div>
          </CabinetLayout>
        </div>
      </div>
    </div>
  );
}
