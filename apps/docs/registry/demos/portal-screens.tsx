"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ActivityDaySection,
  ActivityStack,
  AddonRow,
  AlertShot,
  Button,
  ChatSplitLayout,
  ChildProfileForm,
  ChoiceRow,
  DeviceModeControl,
  DotCrumbs,
  EmptyState,
  FieldHint,
  FilterChips,
  FormCard,
  LabeledField,
  HubCard,
  HubGrid,
  Input,
  PageBody,
  PlaceEditor,
  PlanCard,
  SectionCard,
  SectionTitle,
  SessionFilmstrip,
  StatusBanner,
  StrokeGroup,
  StrokeRow,
  TimeRequestCard,
  type ChildProfileValue,
  type DeviceMode,
  type PlaceCenter,
  type PlaceTypeId,
} from "@safelagoon/ui";
import { cn } from "@safelagoon/ui";
import { AppShellPageHeader, useAppShellNavigation } from "@safelagoon/ui/blocks";

export type PortalScreen =
  | "/home"
  | "/home/allow"
  | "/home/block"
  | "/home/unlinked"
  | "/home/time-request"
  | "/home/ios"
  | "/menu"
  | "/feed"
  | "/feed/apps"
  | "/feed/session"
  | "/feed/gallery"
  | "/feed/sites"
  | "/feed/youtube"
  | "/feed/places"
  | "/feed/aishield"
  | "/feed/chats"
  | "/feed/chats/june"
  | "/rules"
  | "/rules/screentime"
  | "/rules/internet"
  | "/rules/apps"
  | "/rules/places"
  | "/rules/places/new"
  | "/rules/places/home"
  | "/rules/places/home/delete"
  | "/rules/calls"
  | "/rules/youtube"
  | "/settings"
  | "/settings/family"
  | "/settings/family/add"
  | "/settings/family/alex"
  | "/settings/family/sam"
  | "/settings/family/delete"
  | "/settings/account"
  | "/settings/security"
  | "/settings/security/password"
  | "/settings/security/sessions"
  | "/settings/security/2fa"
  | "/settings/security/2fa/off"
  | "/settings/security/2fa/setup"
  | "/settings/security/2fa/on"
  | "/settings/security/2fa/totp"
  | "/settings/security/2fa/sms"
  | "/settings/security/2fa/codes"
  | "/settings/notifications"
  | "/settings/billing"
  | "/settings/billing/free"
  | "/settings/billing/trial"
  | "/settings/supervisors"
  | "/settings/supervisors/empty"
  | "/settings/supervisors/pending"
  | "/settings/supervisors/connected"
  | "/settings/supervisors/invite"
  | "/settings/supervisors/sent"
  | "/settings/supervisors/revoke/casey"
  | "/settings/supervisors/remove/jordan"
  | "/settings/help"
  | "/auth";

export const PORTAL_SCREENS: { id: PortalScreen; label: string }[] = [
  { id: "/home", label: "Home" },
  { id: "/home/allow", label: "Home · allow" },
  { id: "/home/block", label: "Home · block" },
  { id: "/home/unlinked", label: "Home · unlinked" },
  { id: "/home/time-request", label: "Home · time request" },
  { id: "/home/ios", label: "Home · iOS" },
  { id: "/menu", label: "Menu" },
  { id: "/feed", label: "Activity" },
  { id: "/feed/apps", label: "Feed · apps" },
  { id: "/feed/session", label: "Feed · session" },
  { id: "/feed/gallery", label: "Feed · gallery" },
  { id: "/feed/sites", label: "Feed · sites" },
  { id: "/feed/youtube", label: "Feed · YouTube" },
  { id: "/feed/places", label: "Feed · places" },
  { id: "/feed/aishield", label: "Feed · AI Shield" },
  { id: "/feed/chats", label: "Feed · chats" },
  { id: "/feed/chats/june", label: "Feed · June" },
  { id: "/rules", label: "Rules" },
  { id: "/rules/screentime", label: "Rules · screen time" },
  { id: "/rules/internet", label: "Rules · internet" },
  { id: "/rules/apps", label: "Rules · apps" },
  { id: "/rules/places", label: "Rules · places" },
  { id: "/rules/places/new", label: "Rules · new place" },
  { id: "/rules/places/home", label: "Rules · Home zone" },
  { id: "/rules/places/home/delete", label: "Rules · delete place" },
  { id: "/rules/calls", label: "Rules · calls" },
  { id: "/rules/youtube", label: "Rules · YouTube" },
  { id: "/settings", label: "Settings" },
  { id: "/settings/family", label: "Family" },
  { id: "/settings/family/add", label: "Family · add" },
  { id: "/settings/family/alex", label: "Family · Alex" },
  { id: "/settings/family/sam", label: "Family · Sam" },
  { id: "/settings/family/delete", label: "Family · delete" },
  { id: "/settings/account", label: "Account" },
  { id: "/settings/security", label: "Security" },
  { id: "/settings/security/password", label: "Password" },
  { id: "/settings/security/sessions", label: "Sessions" },
  { id: "/settings/security/2fa", label: "2FA" },
  { id: "/settings/security/2fa/off", label: "2FA · off" },
  { id: "/settings/security/2fa/setup", label: "2FA · setup" },
  { id: "/settings/security/2fa/on", label: "2FA · on" },
  { id: "/settings/security/2fa/totp", label: "2FA · TOTP" },
  { id: "/settings/security/2fa/sms", label: "2FA · SMS" },
  { id: "/settings/security/2fa/codes", label: "2FA · codes" },
  { id: "/settings/notifications", label: "Notifications" },
  { id: "/settings/billing", label: "Billing · paid" },
  { id: "/settings/billing/free", label: "Billing · free" },
  { id: "/settings/billing/trial", label: "Billing · trial" },
  { id: "/settings/supervisors", label: "Supervisors" },
  { id: "/settings/supervisors/empty", label: "Supervisors · empty" },
  { id: "/settings/supervisors/pending", label: "Supervisors · invited" },
  { id: "/settings/supervisors/connected", label: "Supervisors · connected" },
  { id: "/settings/supervisors/invite", label: "Supervisors · invite" },
  { id: "/settings/supervisors/sent", label: "Supervisors · sent" },
  { id: "/settings/supervisors/revoke/casey", label: "Supervisors · revoke" },
  { id: "/settings/supervisors/remove/jordan", label: "Supervisors · remove" },
  { id: "/settings/help", label: "Help" },
  { id: "/auth", label: "Auth" },
];
