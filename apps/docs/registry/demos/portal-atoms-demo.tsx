"use client";

import * as React from "react";
import {
  AppMark,
  AppNavIcon,
  AuthCard,
  AuthDesc,
  AuthPage,
  AuthTitle,
  BrandMark,
  Button,
  ChatDayLabel,
  FeedBubble,
  Input,
  LabeledField,
  MapStage,
  MapToolbar,
  PanelGrid,
  PayCard,
  PayCardGroup,
  PortalSelect,
  SectionCard,
  StrokeGroup,
  StrokeRow,
  TextAction,
  ToggleRow,
  VideoThumb,
} from "@safelagoon/ui";

export default function PortalAtomsDemo() {
  const [pay, setPay] = React.useState("card");
  const [tool, setTool] = React.useState("draw");
  const [push, setPush] = React.useState(true);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Chrome</p>
        <div className="flex flex-wrap items-center gap-6 rounded-[14px] border border-border-soft bg-muted p-4">
          <BrandMark />
          <BrandMark size="auth" />
          <div className="flex items-center gap-3 text-ink">
            <AppNavIcon kind="home" />
            <AppNavIcon kind="feed" />
            <AppNavIcon kind="rules" />
            <AppNavIcon kind="settings" />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Home KPI grid</p>
        <PanelGrid className="mb-0 max-w-[720px]">
          <SectionCard label="Internet" metric="Filter on" status={{ tone: "ok", label: "Active" }} />
          <SectionCard label="Alerts" metric="1" status={{ tone: "danger", label: "Needs review" }} />
          <SectionCard label="Location" metric="Home" status={{ tone: "ok", label: "Online" }} />
        </PanelGrid>
      </section>

      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Feed marks</p>
        <StrokeGroup className="max-w-[520px]">
          <StrokeRow title="TikTok" subtitle="26 min" leading={<AppMark kind="tiktok" mark="♪" />} chevron />
          <StrokeRow
            title="How volcanoes work"
            subtitle="12 min · allowed"
            leading={<VideoThumb src="https://picsum.photos/seed/yt-volcano/320/180" duration="12:04" />}
            chevron
          />
        </StrokeGroup>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Settings rows</p>
          <div className="rounded-[10px] border border-border-soft bg-card px-4 shadow-card">
            <ToggleRow title="AI Shield" subtitle="Needs-review content" defaultChecked />
            <ToggleRow title="Push" subtitle="This browser" checked={push} onCheckedChange={setPush} />
            <LabeledField label="Time zone" htmlFor="demo-tz" className="py-3">
              <PortalSelect id="demo-tz" defaultValue="America/New_York">
                <option>America/Los_Angeles</option>
                <option>America/New_York</option>
                <option>UTC</option>
              </PortalSelect>
            </LabeledField>
          </div>
          <PayCardGroup>
            <PayCard label="Visa •••• 4242 · exp 08/28" selected={pay === "card"} onClick={() => setPay("card")} />
            <PayCard label="Add another card" selected={pay === "other"} onClick={() => setPay("other")} />
          </PayCardGroup>
          <TextAction>+ Add child</TextAction>
        </div>
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Places + chat</p>
          <MapToolbar value={tool} onValueChange={setTool} hint="Click the map, drag to size the circle." />
          <MapStage className="h-[160px]">
            <div className="absolute left-1/3 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lilac bg-[rgba(185,124,255,0.22)]" />
          </MapStage>
          <div className="space-y-2 rounded-[10px] border border-border-soft bg-card p-4 shadow-card">
            <ChatDayLabel>Today</ChatDayLabel>
            <FeedBubble>Where are you?</FeedBubble>
            <FeedBubble variant="out">Home, doing homework</FeedBubble>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Auth</p>
        <AuthPage className="min-h-0 rounded-[14px] border border-border-soft py-8">
          <BrandMark size="auth" className="mb-6" />
          <AuthCard>
            <AuthTitle>Sign in</AuthTitle>
            <AuthDesc>demo@demo / demo</AuthDesc>
            <LabeledField label="Email" htmlFor="atom-email">
              <Input id="atom-email" inputSize="portal" defaultValue="demo@demo" />
            </LabeledField>
            <Button variant="primary" size="portal" className="w-full">
              Sign in
            </Button>
          </AuthCard>
        </AuthPage>
      </section>
    </div>
  );
}
