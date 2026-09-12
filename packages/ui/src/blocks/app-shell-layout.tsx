"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { AiChatTrigger } from "../components/domain/ai-chat-trigger";
import { AppPhoneChrome } from "../components/domain/app-phone-chrome";
import {
  AppSidebar,
  type AppSidebarChildProfile,
  type AppSidebarGroup,
  type AppSidebarLink,
  type AppSidebarLinkComponentProps,
  type AppSidebarProfile,
} from "../components/domain/app-sidebar";
import { AppShellNavigationContext, shellModeFromWidth, type AppShellMode } from "./app-shell-navigation-context";

export interface AppShellLayoutProps {
  logo?: React.ReactNode;
  topItems?: AppSidebarLink[];
  groups?: AppSidebarGroup[];
  profile: AppSidebarProfile;
  childProfiles?: AppSidebarChildProfile[];
  activeChildProfileId?: string;
  defaultActiveChildProfileId?: string;
  onChildProfileChange?: (profileId: string) => void;
  childProfileSwitchLabel?: string;
  onActiveChildClick?: (profileId: string) => void;
  onAddChild?: () => void;
  addChildLabel?: string;
  children: React.ReactNode;
  /** @deprecated Use AppShellPageHeader inside children instead */
  header?: React.ReactNode;
  aiChat?: React.ReactNode;
  aiChatOpen?: boolean;
  defaultAiChatOpen?: boolean;
  onAiChatOpenChange?: (open: boolean) => void;
  openAiChatLabel?: string;
  notifications?: React.ReactNode;
  notificationsOpen?: boolean;
  defaultNotificationsOpen?: boolean;
  onNotificationsOpenChange?: (open: boolean) => void;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapseLabel?: string;
  expandLabel?: string;
  openMenuLabel?: string;
  closeMenuLabel?: string;
  notificationsLabel?: string;
  profileMenuLabel?: string;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  className?: string;
}

export function AppShellLayout({
  logo,
  topItems,
  groups,
  profile,
  childProfiles,
  activeChildProfileId,
  defaultActiveChildProfileId,
  onChildProfileChange,
  childProfileSwitchLabel,
  onActiveChildClick,
  onAddChild,
  addChildLabel,
  children,
  header,
  aiChat,
  aiChatOpen: aiChatOpenProp,
  defaultAiChatOpen = false,
  onAiChatOpenChange,
  openAiChatLabel = "Open AI assistant",
  openMenuLabel = "Open menu",
  closeMenuLabel = "Close menu",
  notifications,
  notificationsOpen: notificationsOpenProp,
  defaultNotificationsOpen = false,
  onNotificationsOpenChange,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapseLabel = "Collapse sidebar",
  expandLabel = "Expand sidebar",
  notificationsLabel = "Notifications",
  profileMenuLabel = "Open profile menu",
  LinkComponent,
  className,
}: AppShellLayoutProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  const [internalAiChatOpen, setInternalAiChatOpen] = React.useState(defaultAiChatOpen);
  const [internalNotificationsOpen, setInternalNotificationsOpen] = React.useState(defaultNotificationsOpen);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [inlineMenuActive, setInlineMenuActive] = React.useState(false);
  const [shellMode, setShellMode] = React.useState<AppShellMode>(() =>
    typeof window === "undefined" ? "desktop" : shellModeFromWidth(window.innerWidth),
  );
  const shellRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = shellRef.current;
    if (!node) return;
    const update = () => {
      const fromNode = node.getBoundingClientRect().width;
      const width = fromNode > 0 ? fromNode : window.innerWidth;
      setShellMode(shellModeFromWidth(width));
    };
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(node);
    window.addEventListener("resize", update);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const phone = shellMode === "phone";
  const tablet = shellMode === "tablet";
  const desktop = shellMode === "desktop";
  const collapsed = collapsedProp ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;
  const aiChatOpen = aiChatOpenProp ?? internalAiChatOpen;
  const setAiChatOpen = onAiChatOpenChange ?? setInternalAiChatOpen;
  const notificationsOpen = notificationsOpenProp ?? internalNotificationsOpen;
  const setNotificationsOpen = onNotificationsOpenChange ?? setInternalNotificationsOpen;

  const openAiChat = React.useCallback(() => {
    setNotificationsOpen(false);
    setAiChatOpen(true);
  }, [setAiChatOpen, setNotificationsOpen]);

  const handleNotificationsOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) setAiChatOpen(false);
      setNotificationsOpen(open);
    },
    [setAiChatOpen, setNotificationsOpen],
  );

  const renderedNotifications =
    notifications && React.isValidElement(notifications)
      ? React.cloneElement(notifications, {
          onClose: () => {
            setNotificationsOpen(false);
            (notifications.props as { onClose?: () => void }).onClose?.();
          },
          className: cn("max-h-[min(70vh,640px)]", (notifications.props as { className?: string }).className),
        } as Record<string, unknown>)
      : notifications;

  const renderSidebar = (mode: "desktop" | "tablet" | "mobile") => (
    <AppSidebar
      logo={logo}
      topItems={topItems}
      groups={groups}
      profile={profile}
      childProfiles={childProfiles}
      activeChildProfileId={activeChildProfileId}
      defaultActiveChildProfileId={defaultActiveChildProfileId}
      onChildProfileChange={onChildProfileChange}
      childProfileSwitchLabel={childProfileSwitchLabel}
      onActiveChildClick={onActiveChildClick}
      onAddChild={onAddChild}
      addChildLabel={addChildLabel}
      onCollapse={
        mode === "mobile" ? () => setMobileOpen(false) : mode === "desktop" ? () => setCollapsed(true) : undefined
      }
      collapseLabel={mode === "mobile" ? closeMenuLabel : collapseLabel}
      closeVariant={mode === "mobile" ? "close" : "collapse"}
      notificationsLabel={notificationsLabel}
      profileMenuLabel={profileMenuLabel}
      notifications={renderedNotifications}
      notificationsOpen={notificationsOpen}
      onNotificationsOpenChange={notifications ? handleNotificationsOpenChange : undefined}
      onNavigate={() => setMobileOpen(false)}
      LinkComponent={LinkComponent}
      surface="muted"
      density={mode === "tablet" ? "rail" : "full"}
      className="h-full border-0"
    />
  );

  const openNavigation = () => {
    if (phone) {
      setMobileOpen(true);
      return;
    }
    setCollapsed(false);
  };

  const showMenuButton = (phone && !mobileOpen) || (desktop && collapsed);

  const menuButton = (
    <Button
      variant="ghost"
      className="size-9 shrink-0 rounded-[10px] border border-border-soft bg-card p-0 hover:bg-muted [&_svg]:size-4"
      aria-label={openMenuLabel}
      aria-expanded={mobileOpen}
      onClick={openNavigation}
    >
      <Menu />
    </Button>
  );

  const navigationContextValue = React.useMemo(
    () => ({
      menuButton: showMenuButton ? menuButton : null,
      setInlineMenuActive,
      shellMode,
    }),
    [menuButton, showMenuButton, shellMode],
  );

  const renderedAiChat =
    aiChat && React.isValidElement(aiChat)
      ? React.cloneElement(aiChat, {
          onClose: () => {
            setAiChatOpen(false);
            (aiChat.props as { onClose?: () => void }).onClose?.();
          },
        } as Record<string, unknown>)
      : aiChat;

  const overlayOpen = aiChatOpen && aiChat;
  const showDesktopSidebar = desktop && !collapsed;
  const showTabletRail = tablet;

  return (
    <AppShellNavigationContext.Provider value={navigationContextValue}>
      <div ref={shellRef} className={cn("relative @container flex h-svh min-h-0 min-w-0 w-full overflow-hidden bg-canvas", className)}>
        {showDesktopSidebar ? (
          <div className="flex h-full min-h-0 shrink-0 overflow-hidden">{renderSidebar("desktop")}</div>
        ) : null}
        {showTabletRail ? (
          <div className="flex h-full min-h-0 shrink-0 overflow-hidden">{renderSidebar("tablet")}</div>
        ) : null}
        {phone && mobileOpen ? (
          <div className="absolute inset-0 z-40">
            <button
              type="button"
              aria-label={closeMenuLabel}
              className="absolute inset-0 bg-[rgba(45,44,50,0.18)]"
              onClick={() => setMobileOpen(false)}
            />
            <div
              role="dialog"
              aria-label={openMenuLabel}
              className="absolute inset-y-0 start-0 z-10 flex w-[var(--sidebar-w)] max-w-[min(240px,85%)] flex-col border-e border-border-soft bg-muted shadow-[4px_0_24px_rgba(45,44,50,0.08)]"
            >
              {renderSidebar("mobile")}
            </div>
          </div>
        ) : null}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {phone ? (
            <AppPhoneChrome
              menuButton={menuButton}
              childProfiles={childProfiles}
              activeChildProfileId={activeChildProfileId ?? defaultActiveChildProfileId}
            />
          ) : null}
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-canvas">
            {showMenuButton && !inlineMenuActive && !phone ? (
              <div className="pointer-events-none absolute start-3 top-3 z-30">
                <div className="pointer-events-auto">{menuButton}</div>
              </div>
            ) : null}
            {header ? <div className="pointer-events-none absolute start-3 top-3 z-20">{header}</div> : null}
            {aiChat && !aiChatOpen ? (
              <div className="absolute end-3 top-3 z-10">
                <AiChatTrigger label={openAiChatLabel} onClick={openAiChat} />
              </div>
            ) : null}
            <main
              data-shell-collapsed={collapsed ? "" : undefined}
              data-shell-mode={shellMode}
              className={cn("group/shell flex min-h-0 flex-1 flex-col", overlayOpen ? "overflow-hidden p-0" : "overflow-auto")}
            >
              {aiChatOpen && aiChat ? renderedAiChat : children}
            </main>
          </div>
        </div>
      </div>
    </AppShellNavigationContext.Provider>
  );
}

export { shellModeFromWidth };
export type { AppShellMode };
