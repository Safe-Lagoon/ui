"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { DemoName } from "@/registry/demo-names";

function loadDemo(loader: () => Promise<{ default: ComponentType }>) {
  return dynamic(loader, {
    loading: () => <PreviewFallback />,
    ssr: false,
  });
}

const loaders: Record<DemoName, ComponentType> = {
  "button-variants": loadDemo(() => import("@/registry/demos/button-variants")),
  "button-sizes-demo": loadDemo(() => import("@/registry/demos/button-sizes-demo")),
  "input-demo": loadDemo(() => import("@/registry/demos/input-demo")),
  "input-states-demo": loadDemo(() => import("@/registry/demos/input-states-demo")),
  "input-sizes-demo": loadDemo(() => import("@/registry/demos/input-sizes-demo")),
  "input-types-demo": loadDemo(() => import("@/registry/demos/input-types-demo")),
  "checkbox-demo": loadDemo(() => import("@/registry/demos/checkbox-demo")),
  "checkbox-states-demo": loadDemo(() => import("@/registry/demos/checkbox-states-demo")),
  "dialog-demo": loadDemo(() => import("@/registry/demos/dialog-demo")),
  "tabs-demo": loadDemo(() => import("@/registry/demos/tabs-demo")),
  "table-demo": loadDemo(() => import("@/registry/demos/table-demo")),
  "data-table-demo": loadDemo(() => import("@/registry/demos/data-table-demo")),
  "header-demo": loadDemo(() => import("@/registry/demos/header-demo")),
  "burger-menu-demo": loadDemo(() => import("@/registry/demos/burger-menu-demo")),
  "sidebar-demo": loadDemo(() => import("@/registry/demos/sidebar-demo")),
  "drawer-demo": loadDemo(() => import("@/registry/demos/drawer-demo")),
  "layouts-demo": loadDemo(() => import("@/registry/demos/layouts-demo")),
  "date-picker-demo": loadDemo(() => import("@/registry/demos/date-picker-demo")),
  "map-marker-demo": loadDemo(() => import("@/registry/demos/map-marker-demo")),
  "log-card-demo": loadDemo(() => import("@/registry/demos/log-card-demo")),
  "log-card-blocked-demo": loadDemo(() => import("@/registry/demos/log-card-blocked-demo")),
  "profile-card-demo": loadDemo(() => import("@/registry/demos/profile-card-demo")),
  "rule-card-view-demo": loadDemo(() => import("@/registry/demos/rule-card-view-demo")),
  "rule-card-edit-demo": loadDemo(() => import("@/registry/demos/rule-card-edit-demo")),
  "schedule-grid-demo": loadDemo(() => import("@/registry/demos/schedule-grid-demo")),
  "sign-in-form-demo": loadDemo(() => import("@/registry/demos/sign-in-form-demo")),
  "sign-in-form-errors-demo": loadDemo(() => import("@/registry/demos/sign-in-form-errors-demo")),
  "gallery-demo": loadDemo(() => import("@/registry/demos/gallery-demo")),
  "screen-mirror-demo": loadDemo(() => import("@/registry/demos/screen-mirror-demo")),
  "event-timeline-demo": loadDemo(() => import("@/registry/demos/event-timeline-demo")),
  "app-shell-demo": loadDemo(() => import("@/registry/demos/app-shell-demo")),
  "ai-chat-demo": loadDemo(() => import("@/registry/demos/ai-chat-demo")),
  "toggle-demo": loadDemo(() => import("@/registry/demos/toggle-demo")),
  "notifications-panel-demo": loadDemo(() => import("@/registry/demos/notifications-panel-demo")),
  "toast-demo": loadDemo(() => import("@/registry/demos/toast-demo")),
  "kpi-card-demo": loadDemo(() => import("@/registry/demos/kpi-card-demo")),
};

function PreviewFallback() {
  return <span className="text-body-14 text-muted-foreground">Loading preview…</span>;
}

export function DemoRenderer({ name }: { name: DemoName }) {
  const Demo = loaders[name];
  if (!Demo) return <p className="text-body-14 text-destructive">Demo not found: {name}</p>;
  return <Demo />;
}
