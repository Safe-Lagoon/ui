"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertShot,
  Button,
  ChatSplitLayout,
  ChoiceRow,
  EmptyState,
  FieldHint,
  FormCard,
  LabeledField,
  HubCard,
  HubGrid,
  Input,
  PageBody,
  SectionTitle,
  SessionFilmstrip,
  StrokeGroup,
  StrokeRow,
} from "@safelagoon/ui";
import {
  AuthBody,
  ActivityBody,
  BillingBody,
  FAQ,
  HomeBody,
  PlaceEditBody,
  PlacesMap,
  ProfileEditor,
  SupervisorsBody,
  TwoFactorBody,
} from "./portal-screen-bodies";
import { AppMark, PageHead, PortalSelect, ToggleRow, YtThumb } from "./portal-screen-widgets";
import type { PortalScreen } from "./portal-screen-model";

export type { PortalScreen } from "./portal-screen-model";
export { PORTAL_SCREENS, navSection } from "./portal-screen-model";

export function PortalScreenBody({
  screen,
  onGo,
  ios,
}: {
  screen: PortalScreen;
  onGo: (screen: PortalScreen) => void;
  ios?: boolean;
}) {
  switch (screen) {
    case "/home":
    case "/menu":
      return <HomeBody mode="rules" ios={ios} onGo={onGo} />;
    case "/home/allow":
      return <HomeBody mode="allow" ios={ios} onGo={onGo} />;
    case "/home/block":
      return <HomeBody mode="block" ios={ios} onGo={onGo} />;
    case "/home/unlinked":
      return <HomeBody mode="rules" unlinked onGo={onGo} />;
    case "/home/time-request":
      return <HomeBody mode="rules" timeRequest onGo={onGo} />;
    case "/home/ios":
      return <HomeBody mode="rules" ios onGo={onGo} />;
    case "/feed":
      return <ActivityBody onGo={onGo} />;
    case "/feed/apps":
      return (
        <PageBody>
          <PageHead title="Played on phone" crumbs={["Activity", "Apps"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="TikTok" subtitle="14:02–14:28 · 26 min" trailing="allowed" leading={<AppMark kind="tiktok" mark="♪" />} chevron onClick={() => onGo("/feed/session")} />
            <StrokeRow title="Roblox" subtitle="14:28–15:10 · 42 min" trailing="allowed" leading={<AppMark kind="roblox" mark="R" />} chevron />
            <StrokeRow title="Minecraft" subtitle="15:10–15:40 · 30 min" trailing="allowed" leading={<AppMark kind="minecraft" mark="▣" />} chevron />
            <StrokeRow title="YouTube" subtitle="lives in its own stack" leading={<AppMark kind="youtube" mark="▶" />} chevron onClick={() => onGo("/feed/youtube")} />
          </StrokeGroup>
        </PageBody>
      );
    case "/feed/session":
      return (
        <PageBody>
          <PageHead title="TikTok session" crumbs={["Activity", "Mirror"]} onGo={onGo} />
          <SessionFilmstrip
            sessionLabel="TikTok session"
            frames={[
              { id: "1", src: "https://picsum.photos/seed/tt1/360/640", alt: "14:02", timestamp: "14:02", appName: "TikTok" },
              { id: "2", src: "https://picsum.photos/seed/tt2/360/640", alt: "14:04", timestamp: "14:04", appName: "TikTok" },
              { id: "3", src: "https://picsum.photos/seed/tt3/360/640", alt: "14:07", timestamp: "14:07", appName: "TikTok" },
              { id: "4", src: "https://picsum.photos/seed/tt4/360/640", alt: "14:09", timestamp: "14:09", appName: "TikTok" },
            ]}
            activeFrameId="2"
          />
        </PageBody>
      );
    case "/feed/gallery":
      return (
        <PageBody>
          <PageHead title="Gallery" crumbs={["Activity", "Gallery"]} onGo={onGo} />
          <div className="grid grid-cols-3 gap-1.5 max-[430px]:grid-cols-2">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="aspect-square rounded-md bg-[#c5b0e0]"
                style={{ opacity: 0.45 + (index % 5) * 0.1 }}
              />
            ))}
          </div>
        </PageBody>
      );
    case "/feed/sites":
      return (
        <PageBody>
          <PageHead title="Sites" crumbs={["Activity", "Sites"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="wikipedia.org" subtitle="/wiki/… · allowed" trailing="16:02" chevron />
            <StrokeRow title="khanacademy.org" subtitle="allowed" trailing="15:40" chevron />
            <StrokeRow title="example-risk.site" subtitle="blocked" trailing="today" chevron onClick={() => onGo("/feed/aishield")} />
          </StrokeGroup>
        </PageBody>
      );
    case "/feed/youtube":
      return (
        <PageBody>
          <PageHead title="YouTube" crumbs={["Activity", "YouTube"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="How volcanoes work" subtitle="12 min · allowed" trailing="14:08" leading={<YtThumb src="https://picsum.photos/seed/yt-volcano/320/180" duration="12:04" />} chevron />
            <StrokeRow title="Minecraft build" subtitle="4 min" trailing="14:20" leading={<YtThumb src="https://picsum.photos/seed/yt-mine/320/180" duration="4:12" />} chevron />
            <StrokeRow title="Shorts mix" subtitle="2 min" trailing="14:24" leading={<YtThumb src="https://picsum.photos/seed/yt-shorts/320/180" duration="0:48" />} chevron />
          </StrokeGroup>
        </PageBody>
      );
    case "/feed/places":
      return (
        <PageBody>
          <PageHead title="Home" crumbs={["Activity", "Places"]} onGo={onGo} />
          <div className="relative mb-4 h-[280px] overflow-hidden rounded-lg border border-border-soft bg-canvas shadow-card min-[431px]:h-[360px]">
            <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lilac bg-[rgba(185,124,255,0.22)]" />
          </div>
          <StrokeGroup className="mt-4">
            <StrokeRow title="Arrived home" subtitle="Home zone" trailing="13:42" />
            <StrokeRow title="Left school" subtitle="School zone" trailing="13:10" />
          </StrokeGroup>
        </PageBody>
      );
    case "/feed/aishield":
      return (
        <PageBody>
          <PageHead title="AI Shield" crumbs={["Activity", "AI Shield"]} onGo={onGo} />
          <AlertShot
            title="example-risk.site"
            meta="Today · 14:08 · blocked by filter"
            categories={["Adult", "Violence"]}
            terms={["keyword"]}
          />
        </PageBody>
      );
    case "/feed/chats":
      return (
        <PageBody>
          <PageHead title="Chats" crumbs={["Activity", "Chats"]} onGo={onGo} />
          <ChatSplitLayout
            threads={
              <StrokeGroup className="border-0 shadow-none">
                <StrokeRow title="June" subtitle="WhatsApp · ok, I'm home" trailing="12:55" chevron onClick={() => onGo("/feed/chats/june")} />
                <StrokeRow title="+7 ··· 4412" subtitle="SMS · 2 inbound" trailing="yesterday" />
                <StrokeRow title="Mom" subtitle="Call · 3 min" trailing="yesterday" />
              </StrokeGroup>
            }
            conversation={<p className="p-4 text-[13px] text-muted-foreground">Select a thread — SMS and calls live in Chats, not their own chips.</p>}
          />
        </PageBody>
      );
    case "/feed/chats/june":
      return (
        <PageBody>
          <PageHead title="June" crumbs={["Activity", "Chats", "June"]} onGo={onGo} />
          <ChatSplitLayout
            threads={
              <StrokeGroup className="border-0 shadow-none">
                <StrokeRow title="June" subtitle="WhatsApp · ok, I'm home" trailing="12:55" selected chevron />
                <StrokeRow title="+7 ··· 4412" subtitle="SMS · 2 inbound" trailing="yesterday" />
                <StrokeRow title="Mom" subtitle="Call · 3 min" trailing="yesterday" />
              </StrokeGroup>
            }
            conversation={
              <div className="space-y-3 p-4">
                <p className="text-[12px] font-semibold text-muted-foreground">Yesterday</p>
                <div className="max-w-[85%] rounded-xl rounded-ss-sm bg-muted px-3 py-2 text-[14px]">You still at school?</div>
                <div className="ms-auto max-w-[85%] rounded-xl rounded-se-sm bg-lilac-soft px-3 py-2 text-[14px]">On the bus</div>
                <p className="text-[12px] font-semibold text-muted-foreground">Today</p>
                <div className="max-w-[85%] rounded-xl rounded-ss-sm bg-muted px-3 py-2 text-[14px]">Where are you?</div>
                <div className="ms-auto max-w-[85%] rounded-xl rounded-se-sm bg-lilac-soft px-3 py-2 text-[14px]">Home, doing homework</div>
                <div className="max-w-[85%] rounded-xl rounded-ss-sm bg-muted px-3 py-2 text-[14px]">Ok, I'm home</div>
              </div>
            }
          />
        </PageBody>
      );
    case "/rules":
      return (
        <PageBody>
          <PageHead title="Rules" onGo={onGo} />
          <HubGrid>
            <HubCard title="Screen time" subtitle="Limits and schedule" onClick={() => onGo("/rules/screentime")} />
            <HubCard title="Internet" subtitle="Filter and schedule grid" onClick={() => onGo("/rules/internet")} />
            <HubCard title="Apps" subtitle="Allow / block" onClick={() => onGo("/rules/apps")} />
            <HubCard title="Places" subtitle="Home / School zones" onClick={() => onGo("/rules/places")} />
            <HubCard title="Calls" subtitle="Contacts and blocks" onClick={() => onGo("/rules/calls")} />
            <HubCard title="YouTube" subtitle="Videos and search" onClick={() => onGo("/rules/youtube")} />
          </HubGrid>
        </PageBody>
      );
    case "/rules/screentime":
      return (
        <PageBody>
          <PageHead title="Screen time" crumbs={["Rules", "Screen time"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="Daily limit" subtitle="2 hours" trailing="on" />
            <StrokeRow title="Weekdays / weekends" subtitle="Mon–Fri 9:00 PM" />
          </StrokeGroup>
        </PageBody>
      );
    case "/rules/internet":
      return (
        <PageBody>
          <PageHead title="Internet" crumbs={["Rules", "Internet"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="Category filter" subtitle="Adult, Gambling — block" />
            <StrokeRow title="Schedule grid" subtitle="7×24" />
          </StrokeGroup>
        </PageBody>
      );
    case "/rules/apps":
      return (
        <PageBody>
          <PageHead title="Apps" crumbs={["Rules", "Apps"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="TikTok" subtitle="45 min limit" trailing="allowed" leading={<AppMark kind="tiktok" mark="♪" />} />
            <StrokeRow title="Roblox" trailing="allowed" leading={<AppMark kind="roblox" mark="R" />} />
          </StrokeGroup>
        </PageBody>
      );
    case "/rules/places":
      return <PlacesMap onGo={onGo} />;
    case "/rules/places/new":
      return <PlaceEditBody isNew onGo={onGo} />;
    case "/rules/places/home":
      return <PlaceEditBody onGo={onGo} />;
    case "/rules/places/home/delete":
      return (
        <PageBody>
          <PageHead
            title="Delete Home"
            crumbs={["Rules", { label: "Places", href: "/rules/places" }, { label: "Home", href: "/rules/places/home" }, "Delete"]}
            onGo={onGo}
          />
          <EmptyState
            icon={<span>⚠</span>}
            title="Delete this place?"
            description="Enter and leave alerts for Home stop. This cannot be undone."
            actionLabel="Delete"
            onAction={() => onGo("/rules/places")}
            secondaryLabel="Cancel"
            onSecondary={() => onGo("/rules/places/home")}
          />
        </PageBody>
      );
    case "/rules/calls":
      return (
        <PageBody>
          <PageHead title="Calls" crumbs={["Rules", "Calls"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="Allow list" subtitle="Mom, Dad" />
            <StrokeRow title="Unknown numbers" subtitle="block" />
          </StrokeGroup>
        </PageBody>
      );
    case "/rules/youtube":
      return (
        <PageBody>
          <PageHead title="YouTube" crumbs={["Rules", "YouTube"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="Restricted Mode" trailing="on" />
            <StrokeRow title="Search" trailing="limited" />
          </StrokeGroup>
        </PageBody>
      );
    case "/settings":
      return (
        <PageBody>
          <PageHead title="Settings" onGo={onGo} />
          <HubGrid>
            <HubCard title="Family" subtitle="Alex, Sam · add / edit / delete" onClick={() => onGo("/settings/family")} />
            <HubCard title="Account" subtitle="name, timezone, email, language" onClick={() => onGo("/settings/account")} />
            <HubCard title="Security" subtitle="password, 2FA, sessions" onClick={() => onGo("/settings/security")} />
            <HubCard title="Notifications" subtitle="alerts + email reports" onClick={() => onGo("/settings/notifications")} />
            <HubCard title="Billing" subtitle="Free / trial / paid" onClick={() => onGo("/settings/billing")} />
            <HubCard title="Supervisors" subtitle="invite, pending, connected" onClick={() => onGo("/settings/supervisors")} />
            <HubCard title="Help" subtitle="FAQ, help center, legal" onClick={() => onGo("/settings/help")} />
          </HubGrid>
        </PageBody>
      );
    case "/settings/family":
      return (
        <PageBody>
          <PageHead title="Family" crumbs={["Settings", "Family"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="Alex" subtitle="Android · 9–12" chevron onClick={() => onGo("/settings/family/alex")} />
            <StrokeRow title="Sam" subtitle="iOS · not linked" chevron onClick={() => onGo("/settings/family/sam")} />
          </StrokeGroup>
          <button type="button" className="mt-3.5 text-[13px] font-semibold text-brand-blue" onClick={() => onGo("/settings/family/add")}>
            + Add child
          </button>
        </PageBody>
      );
    case "/settings/family/add":
      return (
        <ProfileEditor
          title="Add child"
          crumbs={["Settings", "Family", "Add"]}
          submit="Show pairing QR"
          initial={{ name: "", avatarId: "1", gender: "M", age: "2", os: "ios" }}
          onGo={onGo}
        />
      );
    case "/settings/family/alex":
      return (
        <ProfileEditor
          title="Alex"
          crumbs={["Settings", "Family", "Alex"]}
          submit="Save"
          initial={{ name: "Alex", avatarId: "1", gender: "M", age: "2", os: "android" }}
          onGo={onGo}
        />
      );
    case "/settings/family/sam":
      return (
        <ProfileEditor
          title="Sam"
          crumbs={["Settings", "Family", "Sam"]}
          submit="Save"
          initial={{ name: "Sam", avatarId: "2", gender: "F", age: "1", os: "ios" }}
          onGo={onGo}
        />
      );
    case "/settings/family/delete":
      return (
        <PageBody>
          <PageHead title="Delete Alex" crumbs={["Settings", "Family", "Delete"]} onGo={onGo} />
          <EmptyState
            icon={<span>⚠</span>}
            title="Profile and logs will be gone"
            description="This cannot be undone. The device leaves protection."
            actionLabel="Delete"
            onAction={() => onGo("/settings/family")}
            secondaryLabel="Cancel"
            onSecondary={() => onGo("/settings/family")}
          />
        </PageBody>
      );
    case "/settings/account":
      return (
        <PageBody>
          <PageHead title="Account" crumbs={["Settings", "Account"]} onGo={onGo} />
          <FormCard>
            <LabeledField label="Name" htmlFor="acct-name">
              <Input id="acct-name" inputSize="portal" defaultValue="Alexander Demo" />
            </LabeledField>
            <LabeledField label="Time zone" htmlFor="acct-tz">
              <PortalSelect id="acct-tz" defaultValue="America/New_York">
                <option>America/Los_Angeles</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Europe/Moscow</option>
                <option>UTC</option>
              </PortalSelect>
            </LabeledField>
            <LabeledField label="Email" htmlFor="acct-email">
              <Input id="acct-email" inputSize="portal" defaultValue="demo@demo" readOnly />
            </LabeledField>
            <LabeledField label="Language" htmlFor="acct-lang">
              <PortalSelect id="acct-lang" defaultValue="en">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="ru">Русский</option>
              </PortalSelect>
            </LabeledField>
            <Button variant="primary" size="portal">Save</Button>
          </FormCard>
        </PageBody>
      );
    case "/settings/security":
      return (
        <PageBody>
          <PageHead title="Security" crumbs={["Settings", "Security"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="Change password" subtitle="Current + new password" chevron onClick={() => onGo("/settings/security/password")} />
            <StrokeRow title="Two-factor authentication" subtitle="Off · authenticator, SMS, recovery codes" chevron onClick={() => onGo("/settings/security/2fa")} />
            <StrokeRow title="Sessions" subtitle="This browser and other devices" chevron onClick={() => onGo("/settings/security/sessions")} />
          </StrokeGroup>
        </PageBody>
      );
    case "/settings/security/password":
      return (
        <PageBody>
          <PageHead title="Change password" crumbs={["Settings", "Security", "Change password"]} onGo={onGo} />
          <FormCard>
            <LabeledField label="Current password" htmlFor="pw-cur">
              <Input id="pw-cur" inputSize="portal" type="password" />
            </LabeledField>
            <LabeledField label="New password" htmlFor="pw-new">
              <Input id="pw-new" inputSize="portal" type="password" />
            </LabeledField>
            <LabeledField label="Confirm new password" htmlFor="pw-conf" hint="At least 8 characters.">
              <Input id="pw-conf" inputSize="portal" type="password" />
            </LabeledField>
            <Button variant="primary" size="portal">Update password</Button>
          </FormCard>
        </PageBody>
      );
    case "/settings/security/sessions":
      return (
        <PageBody>
          <PageHead title="Sessions" crumbs={["Settings", "Security", "Sessions"]} onGo={onGo} />
          <StrokeGroup>
            <StrokeRow title="This browser" subtitle="Chrome · macOS · New York" trailing="Current" selected />
            <StrokeRow title="iPhone" subtitle="Safari · iOS" trailing="2 days ago" />
            <StrokeRow title="iPad" subtitle="Safari · iOS" trailing="last week" />
          </StrokeGroup>
          <Button variant="outline" size="portal-sm" className="mt-4">
            Sign out other sessions
          </Button>
        </PageBody>
      );
    case "/settings/security/2fa":
    case "/settings/security/2fa/off":
      return <TwoFactorBody state="off" onGo={onGo} />;
    case "/settings/security/2fa/setup":
      return <TwoFactorBody state="setup" onGo={onGo} />;
    case "/settings/security/2fa/on":
      return <TwoFactorBody state="on" onGo={onGo} />;
    case "/settings/security/2fa/totp":
      return <TwoFactorBody state="totp" onGo={onGo} />;
    case "/settings/security/2fa/sms":
      return <TwoFactorBody state="sms" onGo={onGo} />;
    case "/settings/security/2fa/codes":
      return <TwoFactorBody state="codes" onGo={onGo} />;
    case "/settings/notifications":
      return (
        <PageBody>
          <PageHead title="Notifications" crumbs={["Settings", "Notifications"]} onGo={onGo} />
          <FormCard>
            <SectionTitle className="mt-0">Alerts</SectionTitle>
            <ToggleRow title="AI Shield" sub="Needs-review content" defaultOn />
            <ToggleRow title="Geofences" sub="Enter / leave zones" defaultOn />
            <ToggleRow title="Time requests" sub="Extra minutes" defaultOn />
            <ToggleRow title="Sites" sub="Blocked and allowed visits" defaultOn={false} />
            <ToggleRow title="Apps" sub="New installs" defaultOn={false} />
            <ToggleRow title="Push" sub="This browser" defaultOn />
          </FormCard>
          <FormCard>
            <SectionTitle className="mt-0">Email reports</SectionTitle>
            <FieldHint>Digest to demo@demo (account email).</FieldHint>
            <ChoiceRow
              label="Email reports"
              items={[
                { id: "off", label: "Off" },
                { id: "daily", label: "Daily" },
                { id: "weekly", label: "Weekly" },
              ]}
              defaultValue="weekly"
            />
          </FormCard>
          <Button variant="primary" size="portal">Save</Button>
        </PageBody>
      );
    case "/settings/billing":
      return <BillingBody state="paid" onGo={onGo} />;
    case "/settings/billing/free":
      return <BillingBody state="free" onGo={onGo} />;
    case "/settings/billing/trial":
      return <BillingBody state="trial" onGo={onGo} />;
    case "/settings/supervisors":
    case "/settings/supervisors/connected":
      return <SupervisorsBody preset="connected" onGo={onGo} />;
    case "/settings/supervisors/empty":
      return <SupervisorsBody preset="empty" onGo={onGo} />;
    case "/settings/supervisors/pending":
      return <SupervisorsBody preset="pending" onGo={onGo} />;
    case "/settings/supervisors/invite":
      return (
        <PageBody>
          <PageHead title="Invite a second parent" crumbs={["Settings", { label: "Supervisors", href: "/settings/supervisors" }, "Invite"]} onGo={onGo} />
          <FormCard className="space-y-4">
            <LabeledField label="Name" htmlFor="invite-name">
              <Input id="invite-name" inputSize="portal" placeholder="Jane Doe" />
            </LabeledField>
            <LabeledField label="Email" htmlFor="invite-email" hint="They get an email to join this family. Pending until they accept.">
              <Input id="invite-email" inputSize="portal" type="email" placeholder="parent@example.com" />
            </LabeledField>
            <Button variant="primary" size="portal" onClick={() => onGo("/settings/supervisors/sent")}>
              Send invitation
            </Button>
          </FormCard>
        </PageBody>
      );
    case "/settings/supervisors/sent":
      return (
        <PageBody>
          <PageHead title="Invitation sent" crumbs={["Settings", { label: "Supervisors", href: "/settings/supervisors" }, "Invited"]} onGo={onGo} />
          <EmptyState
            icon={<span>✉</span>}
            title="Invite sent to them"
            description="Their inbox · they stay Invited until they accept. Resend or revoke from the list."
            actionLabel="Back to supervisors"
            onAction={() => onGo("/settings/supervisors")}
          />
        </PageBody>
      );
    case "/settings/supervisors/revoke/casey":
      return (
        <PageBody>
          <PageHead title="Revoke invitation" crumbs={["Settings", { label: "Supervisors", href: "/settings/supervisors" }, "Revoke"]} onGo={onGo} />
          <EmptyState
            icon={<span>✉</span>}
            title="Cancel invite to Casey Nguyen?"
            description="The invitation email stops working. You can invite them again later."
            actionLabel="Revoke invite"
            onAction={() => onGo("/settings/supervisors")}
            secondaryLabel="Cancel"
            onSecondary={() => onGo("/settings/supervisors")}
          />
        </PageBody>
      );
    case "/settings/supervisors/remove/jordan":
      return (
        <PageBody>
          <PageHead title="Remove supervisor" crumbs={["Settings", { label: "Supervisors", href: "/settings/supervisors" }, "Remove"]} onGo={onGo} />
          <EmptyState
            icon={<span>⚠</span>}
            title="Remove Jordan Lee?"
            description="They lose access to this family. Rules and billing stay with the owner."
            actionLabel="Remove"
            onAction={() => onGo("/settings/supervisors")}
            secondaryLabel="Cancel"
            onSecondary={() => onGo("/settings/supervisors")}
          />
        </PageBody>
      );
    case "/settings/help":
      return (
        <PageBody>
          <PageHead title="Help" crumbs={["Settings", "Help"]} onGo={onGo} />
          <SectionTitle>FAQ</SectionTitle>
          <Accordion type="single" collapsible defaultValue="0" className="overflow-hidden rounded-[10px] border border-border-soft bg-card shadow-card">
            {FAQ.map(([q, a], index) => (
              <AccordionItem key={q} value={String(index)}>
                <AccordionTrigger className="px-4 text-[15px] font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="px-4 text-[13.5px] text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <SectionTitle>Support</SectionTitle>
          <StrokeGroup>
            <StrokeRow title="Help center" subtitle="help.safelagoon.com" chevron />
            <StrokeRow title="Email us" subtitle="support@safelagoon.com" chevron />
          </StrokeGroup>
          <SectionTitle>Legal</SectionTitle>
          <StrokeGroup>
            <StrokeRow title="Terms of use" subtitle="safelagoon.com/terms" chevron />
            <StrokeRow title="Privacy policy" subtitle="safelagoon.com/privacy" chevron />
          </StrokeGroup>
          <p className="text-[12.5px] text-muted-foreground">Version 1.0.0</p>
        </PageBody>
      );
    case "/auth":
      return <AuthBody onGo={onGo} />;
    default:
      return (
        <PageBody>
          <PageHead title="Missing screen" onGo={onGo} />
          <p>No route {screen}</p>
        </PageBody>
      );
  }
}
