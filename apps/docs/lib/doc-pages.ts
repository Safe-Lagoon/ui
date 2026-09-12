import type { DemoName } from "@/registry/demo-names";

export type DocExample = {
  title: string;
  preview: DemoName;
};

export type DocPage = {
  title: string;
  description: string;
  examples: DocExample[];
  code?: string;
};

export const docPages: Record<string, DocPage> = {
  button: {
    title: "Button",
    description:
      "Primary CTAs use lilac fill with white text. Secondary Lilac is the purple family (lilac border + light tint). Secondary Blue is the blue family (blue outline, no tint). Tertiary underlines on hover; Link is always underlined.",
    examples: [
      { title: "Variants & colors", preview: "button-variants" },
      { title: "Sizes", preview: "button-sizes-demo" },
    ],
    code: `import { Button } from "@safelagoon/ui";

<Button variant="primary">Get started</Button>
<Button variant="secondary-blue">Learn more</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>`,
  },
  input: {
    title: "Input",
    description: "Text fields with sm/default/lg sizes, email/number types, and MoneyInput for currency.",
    examples: [
      { title: "Default & error", preview: "input-demo" },
      { title: "Disabled & read-only", preview: "input-states-demo" },
      { title: "Sizes", preview: "input-sizes-demo" },
      { title: "Email, number & money", preview: "input-types-demo" },
    ],
    code: `import { Input, MoneyInput } from "@safelagoon/ui";

<Input type="email" placeholder="name@example.com" />
<Input type="number" min={0} />
<MoneyInput currencySymbol="$" placeholder="0.00" />
<Input inputSize="sm" placeholder="Small" />`,
  },
  checkbox: {
    title: "Checkbox",
    description: "Lilac checked state checkbox built on Radix UI.",
    examples: [
      { title: "Default, checked & disabled", preview: "checkbox-demo" },
      { title: "Controlled", preview: "checkbox-states-demo" },
    ],
    code: `import { Checkbox, Label } from "@safelagoon/ui";

<div className="flex items-center gap-3">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`,
  },
  dialog: {
    title: "Dialog",
    description: "Modal dialog built on Radix UI.",
    examples: [{ title: "Basic dialog", preview: "dialog-demo" }],
    code: `import { Dialog, DialogContent, DialogTrigger, Button } from "@safelagoon/ui";`,
  },
  tabs: {
    title: "Tabs",
    description: "Tabbed content panels.",
    examples: [{ title: "Three tabs", preview: "tabs-demo" }],
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@safelagoon/ui";`,
  },
  toggle: {
    title: "Toggle",
    description: "Pressable toggle buttons and single-select groups for filters, view modes, and toolbar actions.",
    examples: [{ title: "Single & group", preview: "toggle-demo" }],
    code: `import { Toggle, ToggleGroup, ToggleGroupItem } from "@safelagoon/ui";

<Toggle aria-label="Bold" variant="outline" size="sm" />

<ToggleGroup type="single" value={view} onValueChange={setView} variant="outline">
  <ToggleGroupItem value="overview">Overview</ToggleGroupItem>
  <ToggleGroupItem value="location">Location</ToggleGroupItem>
</ToggleGroup>`,
  },
  table: {
    title: "Table",
    description: "Low-level table primitives plus DataTable with sortable columns and border variants.",
    examples: [
      { title: "Basic table", preview: "table-demo" },
      { title: "Sorting & borders", preview: "data-table-demo" },
    ],
    code: `import { DataTable } from "@safelagoon/ui";

<DataTable
  columns={[
    { id: "app", header: "App", cell: (row) => row.app, sortValue: (row) => row.app },
  ]}
  data={rows}
  border="striped"
  getRowKey={(row) => row.app}
/>`,
  },
  layouts: {
    title: "Layouts",
    description: "Page shells from @safelagoon/ui/blocks — marketing, auth, dashboard, and cabinet.",
    examples: [{ title: "Marketing & cabinet", preview: "layouts-demo" }],
    code: `import { MarketingLayout, CabinetLayout } from "@safelagoon/ui/blocks";

<MarketingLayout>{children}</MarketingLayout>

<CabinetLayout navItems={items}>{children}</CabinetLayout>`,
  },
  "app-shell": {
    title: "App Shell",
    description:
      "Three-width portal shell on canvas #e8ecef: desktop sidebar 240, tablet rail 72 (≤900), phone chrome (hamburger · child avatar · 18px name · OS badge). Breakpoints are proto: ≤430 / ≤900 / >900. No inner white work-area card. Nav is the 240px left sheet — no bottom tab bar. Home has no page title. Hubs are 28px/22px h1; drills are 13px DotCrumbs then the same h1.",
    examples: [
      { title: "Sidebar + work area", preview: "app-shell-demo" },
      { title: "Home · 1280 / 820 / 390", preview: "home-shell-demo" },
    ],
    code: `import { AppShellLayout, AppShellPageHeader } from "@safelagoon/ui/blocks";

<AppShellLayout
  logo={<Logo />}
  childProfiles={[
    { id: "emma", name: "Emma", avatarFallback: "E" },
    { id: "noah", name: "Noah", avatarFallback: "N" },
  ]}
  activeChildProfileId={activeChildId}
  onChildProfileChange={setActiveChildId}
  groups={[{ id: "personal", label: "Personal", items: [...] }]}
  profile={{ name: "Alex", actions: [...] }}
>
  <AppShellPageHeader title="Dashboard" icon={<HomeIcon />} showDivider />
  {children}
</AppShellLayout>`,
  },
  portal: {
    title: "Portal constructor",
    description:
      "1:1 proto.js route table inside AppShell at 1280 / 820 / 390. Home has no page title. Drills are DotCrumbs (·) then 28px/22px h1. Activity rows share one feed-list card. Place editor is name / type chips / radius 50–3000 m / lilac pin / Save / Delete. Auth is the proto card, no shell.",
    examples: [{ title: "Home · Activity · Rules · Settings · 1280 / 820 / 390", preview: "portal-constructor-demo" }],
    code: `import { AppShellLayout, AppShellPageHeader } from "@safelagoon/ui/blocks";
import { DeviceModeControl, HubCard, PlaceEditor, DotCrumbs } from "@safelagoon/ui";

<AppShellLayout ...>
  {/* Home: no AppShellPageHeader title */}
  <DeviceModeControl value={mode} onValueChange={setMode} />

  {/* Drill: crumbs then title */}
  <AppShellPageHeader title="Home" breadcrumbs={<DotCrumbs items={["Rules", "Places", "Home"]} />} />
  <PlaceEditor name={name} type={type} radius={radius} center={center} onSave={save} onDelete={remove} />
</AppShellLayout>`,
  },
  title: {
    title: "Title",
    description:
      "Marketing Title stays on the brand scale. Portal pages use AppShellPageHeader: 28px/700 desktop, 22px phone, tracking -0.02em. DotCrumbs stay 13px and sit above the h1 — they are not the title.",
    examples: [{ title: "Icon, subtitle & divider", preview: "title-demo" }],
    code: `import { Title } from "@safelagoon/ui";

<Title
  title={t("dashboard.title")}
  icon={<DashboardIcon aria-hidden />}
  subtitle={t("dashboard.subtitle")}
  showDivider
/>`,
  },
  "ai-chat": {
    title: "AI Chat",
    description:
      "Full-work-area AI assistant panel with suggested prompts, reasoning, and message thread. Pair with AppShellLayout via the aiChat slot — the lagoon mark opens chat and hides until closed.",
    examples: [{ title: "App shell + chat", preview: "ai-chat-demo" }],
    code: `import { AiChat } from "@safelagoon/ui";
import { AppShellLayout } from "@safelagoon/ui/blocks";

<AppShellLayout
  aiChatOpen={chatOpen}
  onAiChatOpenChange={setChatOpen}
  aiChat={
    <AiChat
      suggestedPrompts={[
        { id: "screen-time", label: "How much screen time did Emma use today?" },
        { id: "location", label: "Where is Mia's phone right now?" },
        { id: "survey", label: "A work environment survey", category: "Create" },
      ]}
      onSend={handleAiMessage}
    />
  }
  profile={{ name: "Alex" }}
  groups={[...]}
>
  {children}
</AppShellLayout>`,
  },
  notifications: {
    title: "Notifications Panel",
    description:
      "Grouped notification list for parental-control alerts. Pair with AppShellLayout — the profile bell opens it in a dialog popup.",
    examples: [{ title: "Grouped alerts", preview: "notifications-panel-demo" }],
    code: `import { NotificationsPanel } from "@safelagoon/ui";
import { AppShellLayout } from "@safelagoon/ui/blocks";

<AppShellLayout
  notifications={
    <NotificationsPanel
      groups={[
        {
          label: "Today",
          items: [
            {
              id: "screen-time",
              title: "Emma reached her daily screen time limit",
              preview: "YouTube and TikTok are paused until tomorrow.",
              category: "Screen time",
              timestamp: "6:42 PM",
              icon: <ClockIcon />,
            },
          ],
        },
      ]}
    />
  }
  profile={{ name: "Alex", notificationCount: 3, actions: [...] }}
>
  {children}
</AppShellLayout>`,
  },
  toast: {
    title: "Toast",
    description:
      "Ephemeral notifications that appear and auto-dismiss. Mount Toaster once in your app shell, then call toast() from anywhere.",
    examples: [
      { title: "Variants", preview: "toast-demo" },
    ],
    code: `import { ThemeProvider, Toaster, toast, Button } from "@safelagoon/ui";

// app/layout.tsx — mount once
<ThemeProvider>
  {children}
  <Toaster position="bottom-right" />
</ThemeProvider>

// anywhere in client code
<Button onClick={() => toast.success(t("saved"))}>
  {t("save")}
</Button>

toast.error(t("error.generic"), { description: t("error.retry") });`,
  },
  header: {
    title: "Header",
    description: "Sticky site header with logo, desktop nav links, actions, and mobile burger toggle.",
    examples: [{ title: "Logo & menu", preview: "header-demo" }],
    code: `import { Header, Button } from "@safelagoon/ui";

<Header
  logo={<Logo />}
  links={[{ label: "Features", href: "/features" }]}
  actions={<Button variant="primary">Get started</Button>}
/>`,
  },
  "burger-menu": {
    title: "Burger Menu",
    description: "Fullscreen mobile navigation overlay triggered from a menu icon.",
    examples: [{ title: "Fullscreen menu", preview: "burger-menu-demo" }],
    code: `import { BurgerMenu } from "@safelagoon/ui";

<BurgerMenu items={[{ label: "Dashboard", href: "/dashboard" }]} />`,
  },
  sidebar: {
    title: "Sidebar",
    description: "Vertical left navigation with icons, active state, header, and footer slots.",
    examples: [{ title: "Vertical menu", preview: "sidebar-demo" }],
    code: `import { Sidebar } from "@safelagoon/ui";

<Sidebar
  items={[
    { id: "home", label: "Home", icon: <HomeIcon />, active: true },
  ]}
/>`,
  },
  drawer: {
    title: "Drawer",
    description: "Right-side panel (Sheet alias) for filters, settings, or secondary workflows.",
    examples: [{ title: "Right drawer", preview: "drawer-demo" }],
    code: `import { Drawer, DrawerContent, DrawerTrigger, Button } from "@safelagoon/ui";

<Drawer>
  <DrawerTrigger asChild><Button>Open</Button></DrawerTrigger>
  <DrawerContent side="right">...</DrawerContent>
</Drawer>`,
  },
  "date-picker": {
    title: "Date Picker",
    description:
      "Input-style trigger with calendar icon, compact date format (30 Jul 2025), and a popover calendar with month/year dropdowns.",
    examples: [{ title: "Single date", preview: "date-picker-demo" }],
    code: `import { DatePicker } from "@safelagoon/ui";

const [date, setDate] = useState<Date>();
<DatePicker label="Date" value={date} onChange={setDate} placeholder="Select a date" />`,
  },
  map: {
    title: "Map",
    description: "Google Maps via @vis.gl/react-google-maps — MiniMap preview and GeofenceMap editor from @safelagoon/ui/map.",
    examples: [{ title: "Live Google Maps", preview: "map-marker-demo" }],
    code: `import { MiniMap, GeofenceMap } from "@safelagoon/ui/map";

<MiniMap apiKey={key} center={{ lat: 59.33, lng: 18.07 }} height={200} />

<GeofenceMap
  apiKey={key}
  center={{ lat: 59.33, lng: 18.07 }}
  radius={500}
  editable
  onRadiusChange={setRadius}
/>`,
  },
  "log-card": {
    title: "Log Card",
    description: "Activity timeline row for portal logs.",
    examples: [
      { title: "Default", preview: "log-card-demo" },
      { title: "Blocked entry", preview: "log-card-blocked-demo" },
    ],
    code: `import { LogCard } from "@safelagoon/ui";

<LogCard title="Blocked website" description="example.com" timestamp="Today, 14:32" blocked />`,
  },
  "kpi-card": {
    title: "KPI Card",
    description: "Dashboard metric tile with icon, value, label, and optional trend line for portal home screens.",
    examples: [{ title: "Dashboard grid", preview: "kpi-card-demo" }],
    code: `import { KpiCard } from "@safelagoon/ui";

<KpiCard
  icon={<ClockIcon />}
  value="4h 12m"
  label="Screen time today"
  trendLabel="↓ 18% vs yesterday"
  trendDirection="down"
/>`,
  },
  "profile-card": {
    title: "Profile Card",
    description: "Child profile with OS badge, battery, PIN, and optional avatar upload with crop.",
    examples: [{ title: "Android profile", preview: "profile-card-demo" }],
    code: `import { ProfileCard } from "@safelagoon/ui";

<ProfileCard
  name="Alex"
  os="android"
  osLabel="Android"
  batteryPercent={78}
  batteryLabel="Battery"
  avatarFallback="A"
  avatarSrc={avatarSrc}
  avatarUploadLabel="Upload profile photo"
  avatarCropTitle="Crop profile photo"
  avatarCropLabel="Save photo"
  avatarCropCancelLabel="Cancel"
  avatarCropZoomLabel="Zoom"
  onAvatarUpload={handleFile}
  onAvatarCropComplete={setAvatarSrc}
/>`,
  },
  "rule-card": {
    title: "Rule Card",
    description: "Schedule/time-limit rule editor card.",
    examples: [
      { title: "View mode", preview: "rule-card-view-demo" },
      { title: "Edit mode", preview: "rule-card-edit-demo" },
    ],
    code: `import { RuleCard } from "@safelagoon/ui";`,
  },
  "schedule-grid": {
    title: "Schedule Grid",
    description: "7×24 internet rule heatmap.",
    examples: [{ title: "Interactive grid", preview: "schedule-grid-demo" }],
    code: `import { ScheduleGrid } from "@safelagoon/ui";`,
  },
  "sign-in-form": {
    title: "Sign In Form",
    description: "Auth block from @safelagoon/ui/blocks.",
    examples: [
      { title: "Default", preview: "sign-in-form-demo" },
      { title: "With validation errors", preview: "sign-in-form-errors-demo" },
    ],
    code: `import { SignInForm } from "@safelagoon/ui/blocks";

<SignInForm
  emailLabel="Email"
  passwordLabel="Password"
  submitLabel="Sign in"
  onSubmit={handleSignIn}
/>`,
  },
  gallery: {
    title: "Media Gallery",
    description:
      "Photo grid for smartphone downloads and AI Shield review — lightbox, timestamps, flagged badges, optional multi-select.",
    examples: [{ title: "Photos with AI Shield", preview: "gallery-demo" }],
    code: `import { MediaGallery } from "@safelagoon/ui";

<MediaGallery
  items={photos}
  selectable
  selectedIds={selected}
  onSelectionChange={setSelected}
/>`,
  },
  "screen-mirror": {
    title: "Screen Mirror Viewer",
    description:
      "One active frame per app session with prev/next controls, scrubber timeline, and scrollable session filmstrip.",
    examples: [{ title: "Session playback", preview: "screen-mirror-demo" }],
    code: `import { ScreenMirrorViewer } from "@safelagoon/ui";

<ScreenMirrorViewer
  frames={sessionFrames}
  activeFrameId={activeId}
  onActiveFrameChange={setActiveId}
  sessionLabel="Screen mirror session"
  timelineLabel="Session timeline"
/>`,
  },
  "portal-atoms": {
    title: "Portal atoms",
    description:
      "Atomic proto controls the SPA should compose. Constructor screens are assemblies of these — do not copy one-off markup from docs demos.",
    examples: [{ title: "Chrome · grid · feed · settings · auth", preview: "portal-atoms-demo" }],
    code: `import {
  AppMark,
  AppNavIcon,
  AuthCard,
  AuthPage,
  BrandMark,
  MapToolbar,
  PanelGrid,
  PayCard,
  PortalSelect,
  TextAction,
  ToggleRow,
  VideoThumb,
} from "@safelagoon/ui";

<AppShellLayout logo={<BrandMark />} topItems={[{ id: "home", icon: <AppNavIcon kind="home" /> }]}>
  <PanelGrid>
    <SectionCard label="Internet" metric="Filter on" />
  </PanelGrid>
  <StrokeRow leading={<AppMark kind="tiktok" mark="♪" />} title="TikTok" />
  <StrokeRow leading={<VideoThumb src={thumb} duration="12:04" />} title="How volcanoes work" />
  <ToggleRow title="AI Shield" subtitle="Needs-review content" checked={on} onCheckedChange={setOn} />
  <PortalSelect defaultValue="UTC"><option>UTC</option></PortalSelect>
  <PayCard label="Visa •••• 4242" selected />
  <MapToolbar value={tool} onValueChange={setTool} />
  <TextAction onClick={add}>+ Add place</TextAction>
</AppShellLayout>

<AuthPage>
  <BrandMark size="auth" className="mb-6" />
  <AuthCard>...</AuthCard>
</AuthPage>`,
  },
  "device-mode": {
    title: "Device Mode",
    description:
      "Home hero: one mutually exclusive 3-state control. Allow (state 2, green) / Rules (state 0, lilac) / Block (state 1, red). Caption changes under the bar. Unlinked and busy disable the control — they do not hide it. Time requests stay a separate card.",
    examples: [{ title: "Allow / rules / block · 1280 / 820 / 390", preview: "device-mode-control-demo" }],
    code: `import { DeviceModeControl } from "@safelagoon/ui";

<DeviceModeControl value={mode} onValueChange={setMode} />
// captions: “Rules are paused” / “Your rules are on” / “Device is blocked”`,
  },
  "feed-stacks": {
    title: "Feed stacks",
    description:
      "Activity feed primitives matching proto: ActivityDaySection wraps one 14px-radius feed-list; ActivityStack is a 64px row on a 72px 1fr auto grid (not its own card). Day headers are 12px/600 sentence case. FilterChips are 30px / 12.5px.",
    examples: [{ title: "Kinds + days + filmstrip · 1280 / 820 / 390", preview: "feed-stacks-demo" }],
    code: `import { ActivityStack, ActivityDaySection, FilterChips } from "@safelagoon/ui";

<FilterChips items={[{ id: "all", label: "All" }, { id: "apps", label: "Apps" }]} />
<ActivityDaySection title="Today · 6 Sep 2026" defaultExpanded>
  <ActivityStack kind="apps" title="Played on phone" meta="14:02–15:40 · 6 apps" count={6} />
</ActivityDaySection>`,
  },
  "event-timeline": {
    title: "Event Timeline Layout",
    description:
      "Universal timeline layout for mixed event types — filter chips, date grouping, and LogCard rendering for web/app/location logs.",
    examples: [{ title: "Mixed event feed", preview: "event-timeline-demo" }],
    code: `import { EventTimelineLayout } from "@safelagoon/ui/blocks";

<EventTimelineLayout
  events={events}
  types={eventTypes}
  filterLabel="Event types"
  renderEvent={(event) => <LogCard {...event} />}
/>`,
  },
};
