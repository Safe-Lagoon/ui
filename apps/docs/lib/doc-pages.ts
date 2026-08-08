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
      "Collapsible sidebar layout with grouped navigation, hideable panel, and bottom profile menu — for portal dashboards.",
    examples: [{ title: "Sidebar + work area", preview: "app-shell-demo" }],
    code: `import { AppShellLayout, AppShellPageHeader } from "@safelagoon/ui/blocks";

<AppShellLayout
  logo={<Logo />}
  groups={[{ id: "personal", label: "Personal", items: [...] }]}
  profile={{ name: "Alex", actions: [...] }}
>
  <AppShellPageHeader title="Dashboard" icon={<HomeIcon />} showDivider />
  {children}
</AppShellLayout>`,
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
  "profile-card": {
    title: "Profile Card",
    description: "Child profile with OS badge, battery, PIN.",
    examples: [{ title: "Android profile", preview: "profile-card-demo" }],
    code: `import { ProfileCard } from "@safelagoon/ui";

<ProfileCard name="Alex" os="android" batteryPercent={78} pin="1234" />`,
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
