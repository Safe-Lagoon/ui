"use client";

import { Title } from "@safelagoon/ui";
import { LayoutPanelLeft } from "lucide-react";

export default function TitleDemo() {
  return (
    <div className="rounded-[10px] border border-border-soft bg-background p-6">
      <Title
        title="Dashboard"
        icon={<LayoutPanelLeft aria-hidden />}
        subtitle="Overview of screen time, alerts, and profile activity."
        showDivider
      />
      <p className="mt-6 text-body-16 text-muted-foreground">Page content below the title block.</p>
    </div>
  );
}
