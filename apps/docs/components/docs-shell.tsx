"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ExternalLink, Github, Package } from "lucide-react";
import { AppShellLayout } from "@safelagoon/ui/blocks";
import type { AppSidebarGroup, AppSidebarLinkComponentProps } from "@safelagoon/ui/blocks";
import { LogoHeader } from "@safelagoon/ui/icons";
import { docsNavSections } from "@/lib/docs-nav";

function NextNavLink({ href, className, children, ...props }: AppSidebarLinkComponentProps) {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const groups: AppSidebarGroup[] = docsNavSections.map((section) => ({
    id: section.title.toLowerCase().replace(/\s+/g, "-"),
    label: section.title,
    defaultOpen: section.items.some((item) => item.href === pathname),
    items: section.items.map((item) => ({
      id: item.href,
      label: item.label,
      href: item.href,
      active: pathname === item.href,
    })),
  }));

  return (
    <AppShellLayout
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      LinkComponent={NextNavLink}
      logo={
        <Link href="/docs" className="flex min-w-0 items-center">
          <LogoHeader className="h-6 max-w-full" />
        </Link>
      }
      topItems={[
        {
          id: "home",
          label: "Home",
          href: "/",
          icon: <BookOpen className="size-5" aria-hidden />,
        },
      ]}
      groups={groups}
      profile={{
        name: "Component library",
        avatarFallback: "UI",
        actions: [
          {
            id: "github",
            label: "GitHub",
            description: "Source & issues",
            icon: <Github className="size-4" aria-hidden />,
            onClick: () => window.open("https://github.com/Safe-Lagoon/ui", "_blank", "noopener"),
          },
          {
            id: "npm",
            label: "npm",
            description: "@safelagoon/ui",
            icon: <Package className="size-4" aria-hidden />,
            onClick: () =>
              window.open("https://www.npmjs.com/package/@safelagoon/ui", "_blank", "noopener"),
          },
          {
            id: "site",
            label: "ui.safelagoon.com",
            icon: <ExternalLink className="size-4" aria-hidden />,
            onClick: () => window.open("https://ui.safelagoon.com", "_blank", "noopener"),
          },
        ],
      }}
    >
      <div className="docs-content mx-auto w-full max-w-5xl">{children}</div>
    </AppShellLayout>
  );
}
