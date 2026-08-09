import { docPages } from "./doc-pages";

export type DocsNavItem = {
  href: string;
  label: string;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNavSections: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/foundations", label: "Foundations" },
      { href: "/docs/icons", label: "Icons" },
    ],
  },
  {
    title: "AI",
    items: [{ href: "/docs/components/ai-chat", label: "AI Chat" }],
  },
  {
    title: "Notifications",
    items: [
      { href: "/docs/components/notifications", label: "Notifications Panel" },
      { href: "/docs/components/toast", label: "Toast" },
    ],
  },
  {
    title: "Layout & navigation",
    items: [
      { href: "/docs/components/layouts", label: "Layouts" },
      { href: "/docs/components/app-shell", label: "App Shell" },
      { href: "/docs/components/title", label: "Title" },
      { href: "/docs/components/header", label: "Header" },
      { href: "/docs/components/burger-menu", label: "Burger Menu" },
      { href: "/docs/components/sidebar", label: "Sidebar" },
      { href: "/docs/components/drawer", label: "Drawer" },
    ],
  },
  {
    title: "Forms",
    items: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/checkbox", label: "Checkbox" },
      { href: "/docs/components/toggle", label: "Toggle" },
      { href: "/docs/components/date-picker", label: "Date Picker" },
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/tabs", label: "Tabs" },
    ],
  },
  {
    title: "Data",
    items: [
      { href: "/docs/components/table", label: "Table" },
      { href: "/docs/components/map", label: "Map" },
    ],
  },
  {
    title: "Domain",
    items: [
      { href: "/docs/components/gallery", label: "Media Gallery" },
      { href: "/docs/components/screen-mirror", label: "Screen Mirror" },
      { href: "/docs/components/event-timeline", label: "Event Timeline" },
      { href: "/docs/components/log-card", label: "Log Card" },
      { href: "/docs/components/kpi-card", label: "KPI Card" },
      { href: "/docs/components/profile-card", label: "Profile Card" },
      { href: "/docs/components/rule-card", label: "Rule Card" },
      { href: "/docs/components/schedule-grid", label: "Schedule Grid" },
      { href: "/docs/components/sign-in-form", label: "Sign In Form" },
    ],
  },
];

export function getDocsPageTitle(pathname: string): string {
  for (const section of docsNavSections) {
    for (const item of section.items) {
      if (pathname === item.href) return item.label;
    }
  }

  const slugMatch = pathname.match(/^\/docs\/components\/([^/]+)$/);
  const slug = slugMatch?.[1];
  if (slug) {
    const page = docPages[slug];
    if (page) return page.title;
  }

  return "Documentation";
}
