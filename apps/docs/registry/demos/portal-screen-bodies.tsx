"use client";

import * as React from "react";
import {
  ActivityDaySection,
  ActivityStack,
  AddonRow,
  AuthCard,
  AuthDesc,
  AuthPage,
  AuthTitle,
  BrandMark,
  Button,
  ChildProfileForm,
  ChoiceRow,
  DeviceModeControl,
  EmptyState,
  FieldHint,
  FilterChips,
  FormCard,
  LabeledField,
  Input,
  MapStage,
  MapToolbar,
  PageBody,
  PanelGrid,
  PayCard,
  PayCardGroup,
  PlaceEditor,
  PlanCard,
  SectionCard,
  SectionTitle,
  StatusBanner,
  StrokeGroup,
  StrokeRow,
  TextAction,
  TimeRequestCard,
  type ChildProfileValue,
  type DeviceMode,
  type PlaceCenter,
  type PlaceTypeId,
} from "@safelagoon/ui";
import type { PortalScreen } from "./portal-screen-model";
import { PageHead } from "./portal-screen-widgets";

export function HomeBody({
  mode,
  unlinked,
  timeRequest,
  ios,
  onGo,
}: {
  mode: DeviceMode;
  unlinked?: boolean;
  timeRequest?: boolean;
  ios?: boolean;
  onGo: (screen: PortalScreen) => void;
}) {
  const [deviceMode, setDeviceMode] = React.useState<DeviceMode>(mode);
  React.useEffect(() => setDeviceMode(mode), [mode]);

  const cards = ios
    ? [
        { label: "Screen time", metric: "1h 12m", caption: "No per-app minutes", status: { tone: "ok" as const, label: "iOS" } },
        { label: "Alerts / review", metric: "1", caption: "AI Shield", links: [{ label: "Open", onClick: () => onGo("/feed/aishield") }], status: { tone: "danger" as const, label: "Needs review" } },
        { label: "Location", metric: "Home · 14:02", caption: "Find Me", links: [{ label: "Map", onClick: () => onGo("/feed/places") }], status: { tone: "ok" as const, label: "Online" } },
        { label: "Devices / OS", metric: "iPhone", caption: "iOS · battery 64%", status: { tone: "ok" as const, label: "Linked" } },
      ]
    : [
        { label: "Screen time", metric: "No data yet", caption: "2h limit · Android usage", links: [{ label: "Manage limits", onClick: () => onGo("/rules/screentime") }], status: { tone: "neutral" as const, label: "Today" } },
        { label: "Alerts / review", metric: "1", caption: "AI Shield · needs attention", links: [{ label: "Open alerts", onClick: () => onGo("/feed/aishield") }], status: { tone: "danger" as const, label: "Needs review" } },
        { label: "Internet", metric: "Filter on", caption: "3 sites today", links: [{ label: "Activity", onClick: () => onGo("/feed") }, { label: "Rules", onClick: () => onGo("/rules/internet") }], status: { tone: "ok" as const, label: "Active" } },
        { label: "Location", metric: "Home · 14:02", caption: "Last update · Find Me", links: [{ label: "Map", onClick: () => onGo("/feed/places") }], status: { tone: "ok" as const, label: "Online" } },
        { label: "Time requests", metric: "0", caption: "None pending or active", links: [{ label: "Open requests", onClick: () => onGo("/home") }], status: { tone: "neutral" as const, label: "Empty" } },
        { label: "Devices / OS", metric: "Pixel 7", caption: "Android · battery 72%", status: { tone: "ok" as const, label: "Linked" } },
      ];

  return (
    <PageBody>
      {unlinked ? (
        <StatusBanner
          title="Device not linked"
          meta="Show the child the QR — mode stays locked until paired"
          actionLabel="Pair"
          onAction={() => onGo("/settings/family")}
        />
      ) : (
        <StatusBanner
          title="1 alert needs review"
          meta="AI Shield flagged new content"
          actionLabel="Review"
          onAction={() => onGo("/feed/aishield")}
        />
      )}
      <DeviceModeControl value={deviceMode} onValueChange={setDeviceMode} disabled={unlinked} />
      <PanelGrid>
        {cards.map((card) => (
          <SectionCard key={card.label} {...card} />
        ))}
      </PanelGrid>
      {timeRequest ? (
        <TimeRequestCard
          title="Alex is asking for 30 more minutes"
          subtitle="YouTube · not a fourth segment"
          onDecline={() => undefined}
          onAllow={() => {
            setDeviceMode("allow");
            onGo("/home/allow");
          }}
        />
      ) : (
        <>
          <SectionTitle className="mt-0">Time requests</SectionTitle>
          <EmptyState
            icon={<span>⏱</span>}
            title="No pending requests"
            description="When the child asks for minutes, the card appears here. Approve switches the control to Allow."
          />
        </>
      )}
    </PageBody>
  );
}

export function ActivityBody({ onGo }: { onGo: (screen: PortalScreen) => void }) {
  const [filter, setFilter] = React.useState("all");
  const today = [
    { kind: "aishield" as const, title: "example-risk.site", meta: "/path/page — blocked by filter", time: "2 min ago", count: 1, alert: true, href: "/feed/aishield" as const, previews: [{ label: "!" }] },
    { kind: "youtube" as const, title: "YouTube", meta: "3 videos · session 18 min", time: "14:08", count: 3, href: "/feed/youtube" as const, previews: [{ label: "YT" }] },
    { kind: "apps" as const, title: "Played on phone", meta: "14:02–15:40 · 6 apps", time: "14:02", count: 6, href: "/feed/apps" as const, previews: [{ label: "TK" }, { label: "RB" }, { label: "MC" }] },
    { kind: "places" as const, title: "Home", meta: "arrived · Home zone", time: "13:42", href: "/feed/places" as const },
    { kind: "chats" as const, title: "June and 2 more chats", meta: "WhatsApp · SMS · call to Mom", time: "12:55", count: 7, href: "/feed/chats" as const, previews: [{ label: "J" }, { label: "+" }, { label: "S" }] },
    { kind: "gallery" as const, title: "Gallery", meta: "12 new photos", time: "11:20", count: 12, href: "/feed/gallery" as const },
  ];
  const yesterday = [
    { kind: "screentime" as const, title: "Screen mirror", meta: "TikTok · 11 min · 8 frames", time: "yesterday 19:30", count: 8, href: "/feed/session" as const },
    { kind: "internet" as const, title: "wikipedia.org and 2 more sites", meta: "/wiki/… · allowed", time: "yesterday 16:02", count: 5, href: "/feed/sites" as const, previews: [{ label: "W" }] },
    { kind: "apps" as const, title: "Played on phone", meta: "evening · 3 apps", time: "yesterday 18:10", count: 3, href: "/feed/apps" as const, previews: [{ label: "TT" }, { label: "IG" }, { label: "YT" }] },
    { kind: "chats" as const, title: "+7 ··· 4412", meta: "incoming · 2 SMS", time: "yesterday 21:10", count: 2, href: "/feed/chats" as const, previews: [{ label: "+" }] },
    { kind: "places" as const, title: "School", meta: "arrived · School zone", time: "yesterday 08:05", href: "/feed/places" as const },
  ];
  const match = (row: { kind: string; alert?: boolean }) =>
    filter === "all" || (filter === "critical" ? row.alert : row.kind === filter);

  return (
    <PageBody>
      <PageHead title="Activity" onGo={onGo} />
      <FilterChips
        className="mb-[18px]"
        value={filter}
        onValueChange={setFilter}
        items={[
          { id: "all", label: "All" },
          { id: "critical", label: "Critical", count: 1 },
          { id: "internet", label: "Internet" },
          { id: "apps", label: "Apps" },
          { id: "youtube", label: "YouTube" },
          { id: "gallery", label: "Gallery" },
          { id: "places", label: "Places" },
          { id: "aishield", label: "AI Shield" },
          { id: "chats", label: "Chats" },
        ]}
      />
      <ActivityDaySection title="Today · 6 Sep 2026" defaultExpanded>
        {today.filter(match).map((row) => (
          <ActivityStack key={row.title} {...row} onClick={() => onGo(row.href)} />
        ))}
      </ActivityDaySection>
      <ActivityDaySection title="Yesterday · 5 Sep 2026" defaultExpanded>
        {yesterday.filter(match).map((row) => (
          <ActivityStack key={row.title} {...row} onClick={() => onGo(row.href)} />
        ))}
      </ActivityDaySection>
      <ActivityDaySection title="4 Sep 2026" count={12}>
        <ActivityStack
          kind="apps"
          title="Played on phone"
          meta="morning · 8 apps"
          time="Sep 4"
          count={8}
          previews={[{ label: "RB" }, { label: "MC" }, { label: "TK" }]}
          onClick={() => onGo("/feed/apps")}
        />
      </ActivityDaySection>
    </PageBody>
  );
}

export function ProfileEditor({
  initial,
  submit,
  onGo,
  crumbs,
  title,
}: {
  initial: ChildProfileValue;
  submit: string;
  onGo: (screen: PortalScreen) => void;
  crumbs: Array<string | { label: string; href?: PortalScreen }>;
  title: string;
}) {
  const [value, setValue] = React.useState(initial);
  return (
    <PageBody>
      <PageHead title={title} crumbs={crumbs} onGo={onGo} />
      <ChildProfileForm
        value={value}
        onChange={setValue}
        submitLabel={submit}
        onSubmit={() => onGo("/settings/family")}
        onDelete={submit === "Save" ? () => onGo("/settings/family/delete") : undefined}
      />
    </PageBody>
  );
}

export function TwoFactorBody({
  state,
  onGo,
}: {
  state: "off" | "setup" | "on" | "totp" | "sms" | "codes";
  onGo: (screen: PortalScreen) => void;
}) {
  const off = state === "off";
  const setup = state === "setup";
  const totp = state === "totp";
  const sms = state === "sms";
  const codes = state === "codes";
  const on = state === "on" || totp || sms || codes;
  const chip = off ? "off" : setup ? "setup" : "on";

  return (
    <PageBody>
      <PageHead
        title="Two-factor authentication"
        crumbs={["Settings", { label: "Security", href: "/settings/security" }, "2FA"]}
        onGo={onGo}
      />
      <FilterChips
        value={chip}
        onValueChange={(id) =>
          onGo(
            id === "off"
              ? "/settings/security/2fa/off"
              : id === "setup"
                ? "/settings/security/2fa/setup"
                : "/settings/security/2fa/on",
          )
        }
        items={[
          { id: "off", label: "Off" },
          { id: "setup", label: "Setup" },
          { id: "on", label: "On" },
        ]}
      />
      <FormCard className="mt-4 space-y-3">
        <FieldHint className="m-0">Two-factor authentication adds a second step after your password.</FieldHint>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-ink">
            {off ? "Two-factor authentication is off." : "Two-factor authentication is on."}
          </p>
          <Button
            variant="outline"
            size="portal-sm"
            onClick={() => onGo(off ? "/settings/security/2fa/setup" : "/settings/security/2fa/off")}
          >
            {off ? "Set up" : "Turn off"}
          </Button>
        </div>
      </FormCard>
      {off ? null : sms ? (
        <FormCard className="space-y-4">
          <p className="text-[15px] font-semibold text-ink">SMS</p>
          <LabeledField label="Phone" htmlFor="sms-phone">
            <Input id="sms-phone" inputSize="portal" type="tel" defaultValue="+12025551234" />
          </LabeledField>
          <LabeledField label="Authentication code" htmlFor="sms-code">
            <Input id="sms-code" inputSize="portal" inputMode="numeric" placeholder="123456" />
          </LabeledField>
          <Button variant="primary" size="portal" onClick={() => onGo("/settings/security/2fa/on")}>
            Verify
          </Button>
        </FormCard>
      ) : (
        <div className="space-y-4">
          <FieldHint>Add at least one method. After it is confirmed, sign-in will ask for a code.</FieldHint>
          <FormCard className="space-y-3">
            <p className="text-[15px] font-semibold text-ink">SMS</p>
            <FieldHint>Receive a one-time code by text message.</FieldHint>
            {on && !setup ? (
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-muted-foreground">SMS is on (+1 202 555 1234)</p>
                <Button variant="outline" size="portal-sm">Turn off</Button>
              </div>
            ) : (
              <Button variant="primary" size="portal" onClick={() => onGo("/settings/security/2fa/sms")}>
                Turn on
              </Button>
            )}
          </FormCard>
          <FormCard className="space-y-3">
            <p className="text-[15px] font-semibold text-ink">Authenticator app</p>
            <FieldHint>Google Authenticator or Authy.</FieldHint>
            {totp ? (
              <>
                <div className="size-36 rounded-[10px] bg-[repeating-conic-gradient(#2d2c32_0_25%,#fff_0_50%)] bg-[length:16px_16px]" aria-hidden />
                <FieldHint>Scan the QR, then enter the 6-digit code.</FieldHint>
                <LabeledField label="Authentication code" htmlFor="totp-code">
                  <Input id="totp-code" inputSize="portal" inputMode="numeric" placeholder="123456" />
                </LabeledField>
                <Button variant="primary" size="portal" onClick={() => onGo("/settings/security/2fa/on")}>
                  Verify
                </Button>
              </>
            ) : on && !setup ? (
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-muted-foreground">Authenticator app is on.</p>
                <Button variant="outline" size="portal-sm">Turn off</Button>
              </div>
            ) : (
              <Button variant="primary" size="portal" onClick={() => onGo("/settings/security/2fa/totp")}>
                Turn on
              </Button>
            )}
          </FormCard>
          <FormCard className="space-y-3">
            <p className="text-[15px] font-semibold text-ink">Recovery codes</p>
            <FieldHint>One-time backup codes if you lose your phone.</FieldHint>
            {codes ? (
              <>
                <div className="grid grid-cols-2 gap-2 font-mono text-[13px]">
                  {["9K3M-2QPL", "H7VX-4NWC", "B1RA-8TDS", "L6YJ-0FQM", "C2WE-5UKA", "P9ZS-3HMB"].map((code) => (
                    <code key={code} className="rounded-md bg-muted px-2 py-1">
                      {code}
                    </code>
                  ))}
                </div>
                <Button variant="outline" size="portal-sm" onClick={() => onGo("/settings/security/2fa/on")}>
                  Done
                </Button>
              </>
            ) : on && !setup ? (
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-muted-foreground">Recovery codes are enabled.</p>
                <Button variant="outline" size="portal-sm" onClick={() => onGo("/settings/security/2fa/codes")}>
                  View codes
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="portal" onClick={() => onGo("/settings/security/2fa/codes")}>
                Generate
              </Button>
            )}
          </FormCard>
        </div>
      )}
    </PageBody>
  );
}

export function BillingBody({
  state,
  onGo,
}: {
  state: "free" | "trial" | "paid";
  onGo: (screen: PortalScreen) => void;
}) {
  const [period, setPeriod] = React.useState("mo");
  const [pay, setPay] = React.useState("card");
  const free = state === "free";
  const trial = state === "trial";
  const paid = state === "paid";

  return (
    <PageBody>
      <PageHead title="Billing" crumbs={["Settings", "Billing"]} onGo={onGo} />
      <FilterChips
        value={state}
        onValueChange={(id) =>
          onGo(id === "paid" ? "/settings/billing" : (`/settings/billing/${id}` as PortalScreen))
        }
        items={[
          { id: "free", label: "Free" },
          { id: "trial", label: "Trial" },
          { id: "paid", label: "Paid" },
        ]}
      />
      {free ? (
        <StatusBanner title="Free" meta="Core alerts only · upgrade for rules, gallery, and mirror" icon="i" />
      ) : trial ? (
        <StatusBanner
          title="Trial · 5 days left"
          meta="Full access until Oct 19 · then Basic $3.99/mo"
          actionLabel="Upgrade"
          onAction={() => onGo("/settings/billing")}
          icon="⏱"
        />
      ) : (
        <StatusBanner tone="success" title="Paid · Family" meta="Renews Oct 12 · Visa •••• 4242" icon="✓" />
      )}
      <SectionTitle>Plans</SectionTitle>
      <ChoiceRow
        label="Billing period"
        items={[
          { id: "mo", label: "Monthly" },
          { id: "yr", label: "Yearly" },
        ]}
        value={period}
        onValueChange={setPeriod}
      />
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <PlanCard
          name="Basic"
          price="$3.99"
          features={["1 child", "Rules + Activity", "AI Shield"]}
          selected={trial}
          actionLabel={free ? "Start trial" : trial ? "Selected" : "Downgrade"}
          actionVariant={paid ? "ghost" : "primary"}
          onAction={() => (free ? onGo("/settings/billing/trial") : undefined)}
        />
        <PlanCard
          name="Family"
          price="$7.99"
          features={["Up to 5 children", "Everything in Basic", "Second parent"]}
          selected={paid}
          actionLabel={paid ? "Current plan" : "Upgrade"}
          onAction={() => (!paid ? onGo("/settings/billing") : undefined)}
        />
      </div>
      <SectionTitle>Add-ons</SectionTitle>
      <FormCard className="max-w-none space-y-0 divide-y divide-border-soft p-4">
        <AddonRow title="Gallery" subtitle="Child photo / video library" price="$1.99/mo" included={paid} actionLabel={free ? "Add after subscribe" : "Add"} />
        <AddonRow title="Screen Mirror" subtitle="Session filmstrip" price="$3.99/mo" included={trial || paid} actionLabel={free ? "Add after subscribe" : "Add"} />
        <AddonRow title="Geo Track" subtitle="Continuous GPS route" price="$1.99/mo" actionLabel={free ? "Add after subscribe" : "Add"} />
      </FormCard>
      <SectionTitle>Payment method</SectionTitle>
      <FormCard className="space-y-3">
        <PayCardGroup>
          {free ? (
            <>
              <PayCard label="Add card · Stripe" selected={pay === "card"} onClick={() => setPay("card")} />
              <PayCard label="Apple Pay" selected={pay === "apple"} onClick={() => setPay("apple")} />
            </>
          ) : (
            <>
              <PayCard label="Visa •••• 4242 · exp 08/28" selected={pay === "card"} onClick={() => setPay("card")} />
              <PayCard label="Add another card" selected={pay === "other"} onClick={() => setPay("other")} />
            </>
          )}
        </PayCardGroup>
        {free ? (
          <LabeledField label="Card" htmlFor="card-num">
            <Input id="card-num" inputSize="portal" placeholder="ACCT-000015" />
          </LabeledField>
        ) : null}
      </FormCard>
      {paid ? (
        <button type="button" className="text-[13px] font-semibold text-destructive hover:underline">
          Cancel at period end
        </button>
      ) : null}
    </PageBody>
  );
}

export function SupervisorsBody({
  preset,
  onGo,
}: {
  preset: "empty" | "pending" | "connected";
  onGo: (screen: PortalScreen) => void;
}) {
  const connected =
    preset === "connected"
      ? [{ id: "jordan", name: "Jordan Lee", email: "jordan@example.com", joined: "Mar 2, 2026" }]
      : [];
  const pending =
    preset === "empty"
      ? []
      : [{ id: "casey", name: "Casey Nguyen", email: "casey@example.com", sent: "Sep 10" }];

  return (
    <PageBody>
      <PageHead title="Supervisors" crumbs={["Settings", "Supervisors"]} onGo={onGo} />
      <FilterChips
        value={preset}
        onValueChange={(id) => onGo(`/settings/supervisors/${id}` as PortalScreen)}
        items={[
          { id: "empty", label: "Empty" },
          { id: "pending", label: "Invited" },
          { id: "connected", label: "Connected" },
        ]}
      />
      {preset === "empty" ? (
        <EmptyState
          icon={<span>👤</span>}
          title="No co-parents yet"
          description="Invite another parent to manage this family account."
          actionLabel="Invite a second parent"
          onAction={() => onGo("/settings/supervisors/invite")}
        />
      ) : (
        <div className="space-y-4">
          <SectionTitle>Connected</SectionTitle>
          {connected.length ? (
            <StrokeGroup>
              {connected.map((row) => (
                <StrokeRow
                  key={row.id}
                  title={row.name}
                  subtitle={`${row.email} · joined ${row.joined}`}
                  trailing={<span className="rounded-full bg-[#d6f3e2] px-2 py-0.5 text-[11px] font-bold text-success-strong">Connected</span>}
                  onClick={() => onGo("/settings/supervisors/remove/jordan")}
                />
              ))}
            </StrokeGroup>
          ) : (
            <p className="text-[13px] text-muted-foreground">No one connected yet</p>
          )}
          <SectionTitle>Invited</SectionTitle>
          {pending.length ? (
            <StrokeGroup>
              {pending.map((row) => (
                <StrokeRow
                  key={row.id}
                  title={row.name}
                  subtitle={`${row.email} · sent ${row.sent}`}
                  trailing={<span className="rounded-full bg-[#fff3c4] px-2 py-0.5 text-[11px] font-bold text-[#946800]">Invited</span>}
                  onClick={() => onGo("/settings/supervisors/revoke/casey")}
                />
              ))}
            </StrokeGroup>
          ) : (
            <p className="text-[13px] text-muted-foreground">No pending invitations</p>
          )}
          <Button variant="primary" size="portal" onClick={() => onGo("/settings/supervisors/invite")}>
            Invite a second parent
          </Button>
        </div>
      )}
    </PageBody>
  );
}

export function PlacesMap({ onGo }: { onGo: (screen: PortalScreen) => void }) {
  const [tool, setTool] = React.useState("draw");
  return (
    <PageBody>
      <PageHead title="Places" crumbs={["Rules", "Places"]} onGo={onGo} />
      <MapToolbar
        value={tool}
        onValueChange={setTool}
        hint="Click the map, drag to size the circle. Tap a circle or a row to rename or delete."
      />
      <MapStage>
        <div className="absolute left-[28%] top-[38%] size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lilac bg-[rgba(185,124,255,0.22)]" />
        <div className="absolute left-[62%] top-[42%] size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-blue bg-[rgba(47,119,238,0.18)]" />
      </MapStage>
      <StrokeGroup className="mt-4">
        <StrokeRow title="Home" subtitle="Home · 120 m" chevron onClick={() => onGo("/rules/places/home")} />
        <StrokeRow title="School" subtitle="School · 200 m" chevron onClick={() => onGo("/rules/places/home")} />
      </StrokeGroup>
      <TextAction onClick={() => onGo("/rules/places/new")}>+ Add place</TextAction>
    </PageBody>
  );
}

export function PlaceEditBody({
  isNew,
  onGo,
}: {
  isNew?: boolean;
  onGo: (screen: PortalScreen) => void;
}) {
  const [name, setName] = React.useState(isNew ? "" : "Home");
  const [type, setType] = React.useState<PlaceTypeId>("HOME");
  const [radius, setRadius] = React.useState(isNew ? 150 : 120);
  const [center, setCenter] = React.useState<PlaceCenter>({ lat: 47.6205, lng: -122.3493 });
  const title = isNew ? "New place" : name || "Place";
  return (
    <PageBody>
      <PageHead
        title={title}
        crumbs={["Rules", { label: "Places", href: "/rules/places" }, title]}
        onGo={onGo}
      />
      <PlaceEditor
        name={name}
        type={type}
        radius={radius}
        center={center}
        isNew={isNew}
        onNameChange={setName}
        onTypeChange={setType}
        onRadiusChange={setRadius}
        onCenterChange={setCenter}
        onSave={() => onGo("/rules/places")}
        onDelete={() => onGo("/rules/places/home/delete")}
      />
    </PageBody>
  );
}

export function AuthBody({ onGo }: { onGo: (screen: PortalScreen) => void }) {
  return (
    <AuthPage className="min-h-full py-6">
      <BrandMark size="auth" className="mb-6" />
      <AuthCard>
        <AuthTitle>Sign in</AuthTitle>
        <AuthDesc>demo@demo / demo</AuthDesc>
        <LabeledField label="Email" htmlFor="auth-email">
          <Input id="auth-email" inputSize="portal" defaultValue="demo@demo" />
        </LabeledField>
        <LabeledField label="Password" htmlFor="auth-pass">
          <Input id="auth-pass" inputSize="portal" type="password" defaultValue="demo" />
        </LabeledField>
        <Button variant="primary" size="portal" className="w-full" onClick={() => onGo("/home")}>
          Sign in
        </Button>
      </AuthCard>
    </AuthPage>
  );
}

export const FAQ = [
  [
    "How device mode works",
    "Allow pauses rules. By rules is the default — limits and filters apply. Block stops the device. Approving a time request switches the control to Allow; the parent can also set Allow themselves.",
  ],
  [
    "Who can invite a second parent?",
    "The account owner. Send their name and email. They stay Invited until they accept. A supervisor cannot invite others or open billing.",
  ],
  [
    "Why doesn’t iOS show Apps or Calls?",
    "Sam’s iPhone has no apps, calls, gallery, or screen-mirror stacks. Screen time is device-level, not per-app minutes.",
  ],
  [
    "What does AI Shield flag?",
    "Needs-review photos, screens, and chats. They land in Activity as Critical — review in the overlay, don’t bury them in the day list.",
  ],
] as const;
