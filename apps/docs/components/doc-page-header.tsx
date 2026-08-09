"use client";

import { createElement, type ReactNode } from "react";
import { AppShellPageHeader } from "@safelagoon/ui/blocks";
import { getDocPageIcon, getDocsSectionIcon } from "@/lib/doc-icons";

type DocPageHeaderProps = {
  title: string;
  description?: ReactNode;
  iconSlug?: string;
  actions?: ReactNode;
  showDivider?: boolean;
};

export function DocPageHeader({
  title,
  description,
  iconSlug,
  actions,
  showDivider = false,
}: DocPageHeaderProps) {
  const Icon = iconSlug ? (getDocsSectionIcon(iconSlug) ?? getDocPageIcon(iconSlug)) : null;

  return (
    <AppShellPageHeader
      title={title}
      icon={Icon ? createElement(Icon, { "aria-hidden": true }) : undefined}
      description={description}
      actions={actions}
      showDivider={showDivider}
    />
  );
}
