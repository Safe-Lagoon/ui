"use client";

import * as React from "react";
import { DotCrumbs } from "@safelagoon/ui";
import { AppShellPageHeader } from "@safelagoon/ui/blocks";
import type { PortalScreen } from "./portal-screen-model";

const CRUMB_HREF: Record<string, PortalScreen> = {
  Activity: "/feed",
  Rules: "/rules",
  Settings: "/settings",
  Chats: "/feed/chats",
  Family: "/settings/family",
  Security: "/settings/security",
  Supervisors: "/settings/supervisors",
  Help: "/settings/help",
  Places: "/rules/places",
};

/** Constructor-only crumbs table. SPA uses AppShellPageHeader + DotCrumbs. */
export function PageHead({
  title,
  crumbs,
  onGo,
}: {
  title?: string;
  crumbs?: Array<string | { label: string; href?: PortalScreen }>;
  onGo: (screen: PortalScreen) => void;
}) {
  const items = crumbs?.map((item, index, all) => {
    if (typeof item === "string") {
      const href = index < all.length - 1 ? CRUMB_HREF[item] : undefined;
      return href ? { label: item, href } : { label: item };
    }
    return item;
  });
  return (
    <AppShellPageHeader
      title={title}
      breadcrumbs={
        items ? (
          <DotCrumbs items={items} onNavigate={(href) => onGo(href as PortalScreen)} />
        ) : undefined
      }
    />
  );
}
