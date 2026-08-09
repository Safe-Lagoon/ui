"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { AiChatTrigger } from "../components/domain/ai-chat-trigger";
import {
  AppSidebar,
  type AppSidebarChildProfile,
  type AppSidebarGroup,
  type AppSidebarLink,
  type AppSidebarLinkComponentProps,
  type AppSidebarProfile,
} from "../components/domain/app-sidebar";
import { Sheet, SheetContent, SheetTitle } from "../components/ui/sheet";
import { AppShellNavigationContext } from "./app-shell-navigation-context";

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
  const [compactShell, setCompactShell] = React.useState(false);
  const shellRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    const updateCompactShell = () => {
      setCompactShell(node.getBoundingClientRect().width < 1024);
    };

    updateCompactShell();

    const resizeObserver = new ResizeObserver(updateCompactShell);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

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

  const renderSidebar = (mode: "desktop" | "mobile") => (
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
      onCollapse={() => {
        if (mode === "mobile") {
          setMobileOpen(false);
          return;
        }
        setCollapsed(true);
      }}
      collapseLabel={mode === "mobile" ? closeMenuLabel : collapseLabel}
      closeVariant={mode === "mobile" ? "close" : "collapse"}
      notificationsLabel={notificationsLabel}
      profileMenuLabel={profileMenuLabel}
      notifications={renderedNotifications}
      notificationsOpen={notificationsOpen}
      onNotificationsOpenChange={notifications ? handleNotificationsOpenChange : undefined}
      onNavigate={() => setMobileOpen(false)}
      LinkComponent={LinkComponent}
      surface={mode === "mobile" ? "background" : "muted"}
      className="h-full border-0"
    />
  );

  const openNavigation = () => {
    if (compactShell) {
      setMobileOpen(true);
      return;
    }
    setCollapsed(false);
  };

  const showMenuButton = (compactShell && !mobileOpen) || collapsed;

  const menuButton = (
    <Button
      variant="ghost"
      className={cn(
        "size-10 shrink-0 rounded-lg border border-border-soft bg-background p-0 shadow-sm hover:bg-muted [&_svg]:size-5",
        !collapsed && "@lg:hidden",
      )}
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
    }),
    [menuButton, showMenuButton],
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

  return (
    <AppShellNavigationContext.Provider value={navigationContextValue}>
      <div ref={shellRef} className={cn("@container flex h-svh min-h-0 overflow-hidden bg-muted", className)}>
        {!collapsed ? (
          <div className="hidden h-full min-h-0 shrink-0 overflow-hidden @lg:flex">
            {renderSidebar("desktop")}
          </div>
        ) : null}

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            showOverlay
            overlayClassName="bg-foreground/5"
            className="@lg:hidden w-[280px] max-w-[min(280px,85vw)] border-border-soft bg-background p-0 shadow-[4px_0_24px_rgba(45,44,50,0.08)]"
          >
            <SheetTitle className="sr-only">{openMenuLabel}</SheetTitle>
            {renderSidebar("mobile")}
          </SheetContent>
        </Sheet>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col p-0.5">
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-border-soft bg-background">
            {showMenuButton && !inlineMenuActive ? (
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
              className={cn(
                "group/shell flex min-h-0 flex-1 flex-col",
                overlayOpen
                  ? "overflow-hidden p-0"
                  : cn(
                      "overflow-auto px-6 pb-6",
                      "[&:not(:has([data-slot=app-shell-page-header]))]:@max-lg:pt-12",
                      collapsed &&
                        "[&:not(:has([data-slot=app-shell-page-header]))]:@lg:pt-12",
                    ),
              )}
            >
              {aiChatOpen && aiChat ? renderedAiChat : children}
            </main>
          </div>
        </div>
      </div>
    </AppShellNavigationContext.Provider>
  );
}
