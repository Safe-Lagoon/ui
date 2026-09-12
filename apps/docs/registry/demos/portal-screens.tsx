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
