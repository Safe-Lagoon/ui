"use client";

import * as React from "react";
import { Calendar, Home, Inbox, Users } from "lucide-react";
import { AiChat, type AiChatMessage } from "@safelagoon/ui";
import { AppShellLayout } from "@safelagoon/ui/blocks";
import { LogoHeader } from "@safelagoon/ui/icons";

const suggestedPrompts = [
  { id: "screen-time-today", label: "How much screen time did Emma use today?" },
  { id: "top-apps", label: "Which apps did Noah use most this week?" },
  { id: "location", label: "Where is Mia's phone right now?" },
  { id: "bedtime-rule", label: "Create a bedtime rule for school nights" },
  { id: "blocked-sites", label: "Show websites blocked yesterday" },
  { id: "recent-alerts", label: "Summarize alerts from the last 24 hours" },
];

async function mockAiResponse(message: string): Promise<AiChatMessage> {
  await new Promise((resolve) => window.setTimeout(resolve, 1200));

  const normalized = message.toLowerCase();

  if (normalized.includes("screen time") && normalized.includes("today")) {
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      reasoning: "Pulling today's screen time totals for Emma across phone and tablet.",
      content:
        "Emma has used **1h 42m** today. YouTube (38m) and Roblox (29m) account for most of it.",
    };
  }

  if (normalized.includes("apps") && normalized.includes("noah")) {
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      reasoning: "Ranking app usage for Noah over the past 7 days.",
      content:
        "Noah's top apps this week: **Minecraft** (4h 12m), **Chrome** (2h 05m), and **Discord** (1h 48m).",
    };
  }

  if (normalized.includes("where") || normalized.includes("location") || normalized.includes("mia")) {
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      reasoning: "Reading the latest GPS fix from Mia's registered Android device.",
      content:
        "Mia's phone was last seen near **Home** at 4:18 PM. Location sharing is active.",
    };
  }

  if (normalized.includes("bedtime") || normalized.includes("rule")) {
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      reasoning: "Drafting a schedule rule template for weekday evenings.",
      content:
        "I can set a **9:00 PM bedtime rule** for Mon–Thu that blocks social apps and games. Want me to apply it to all child profiles?",
    };
  }

  if (normalized.includes("blocked") || normalized.includes("websites")) {
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      reasoning: "Scanning web filter logs from the previous calendar day.",
      content:
        "Yesterday Safe Lagoon blocked **14 sites** — mostly anonymous chat and unlicensed streaming domains.",
    };
  }

  if (normalized.includes("alert")) {
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      reasoning: "Grouping panic-button, geofence, and app-install alerts from the last day.",
      content:
        "In the last 24 hours: **2 geofence exits**, **1 new app install** (TikTok on Noah's phone), and **0 panic alerts**.",
    };
  }

  return {
    id: `assistant-${Date.now()}`,
    role: "assistant",
    reasoning: "Matching your question to Safe Lagoon parental control features.",
    content:
      "I can help with screen time, app rules, location, web filtering, and alerts. Try asking about a specific child or device.",
  };
}

export default function AiChatDemo() {
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <div className="h-[720px] overflow-hidden rounded-xl border border-border-soft">
      <AppShellLayout
        className="h-full min-h-0"
        aiChatOpen={chatOpen}
        onAiChatOpenChange={setChatOpen}
        aiChat={
          <AiChat
            suggestedPrompts={suggestedPrompts}
            onSend={async (message) => mockAiResponse(message)}
          />
        }
        logo={<LogoHeader className="h-6" />}
        topItems={[
          { id: "home", label: "Home", icon: <Home className="size-5" />, active: !chatOpen },
          { id: "inbox", label: "Inbox", icon: <Inbox className="size-5" /> },
          { id: "calendar", label: "Calendar", icon: <Calendar className="size-5" /> },
        ]}
        groups={[
          {
            id: "personal",
            label: "Personal",
            defaultOpen: true,
            items: [{ id: "profiles", label: "Profiles", icon: <Users className="size-5" /> }],
          },
        ]}
        profile={{
          name: "Alexander Lyakhov",
          avatarFallback: "AL",
          actions: [],
        }}
      >
        <div className="flex h-full min-h-[480px] items-center justify-center rounded-[10px] border border-dashed border-border-soft bg-muted/20 p-8 text-center">
          <div>
            <p className="text-body-16 font-medium text-foreground">Portal work area</p>
            <p className="mt-2 text-body-14 text-muted-foreground">
              Click the lagoon icon in the top-right corner to open AI chat. The icon hides while
              chat is open and returns when you close it.
            </p>
          </div>
        </div>
      </AppShellLayout>
    </div>
  );
}
