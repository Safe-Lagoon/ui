import type { demos } from "@/registry/demos";

export type DocPage = {
  title: string;
  description: string;
  code: string;
  preview?: keyof typeof demos;
};

export const docPages: Record<string, DocPage> = {
  button: {
    title: "Button",
    description: "Primary lilac CTA, secondary lilac/blue, tertiary link.",
    preview: "button-variants",
    code: `import { Button } from "@safelagoon/ui";

<Button variant="primary">Get started</Button>
<Button variant="secondary-blue">Learn more</Button>`,
  },
  input: {
    title: "Input",
    description: "Text input with hover, focus, error, and disabled states.",
    preview: "input-demo",
    code: `import { Input } from "@safelagoon/ui";

<Input placeholder="Email" aria-label="Email" />
<Input error="Required" aria-label="Email" />`,
  },
  checkbox: {
    title: "Checkbox",
    description: "Lilac checked state checkbox.",
    code: `import { Checkbox } from "@safelagoon/ui";

<Checkbox id="terms" />`,
  },
  dialog: {
    title: "Dialog",
    description: "Modal dialog built on Radix UI.",
    code: `import { Dialog, DialogContent, DialogTrigger } from "@safelagoon/ui";`,
  },
  tabs: {
    title: "Tabs",
    description: "Tabbed content panels.",
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@safelagoon/ui";`,
  },
  table: {
    title: "Table",
    description: "Data table primitives.",
    code: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@safelagoon/ui";`,
  },
  "log-card": {
    title: "Log Card",
    description: "Activity timeline row for portal logs.",
    preview: "log-card-demo",
    code: `import { LogCard } from "@safelagoon/ui";

<LogCard title="Blocked website" description="example.com" timestamp="Today, 14:32" blocked />`,
  },
  "profile-card": {
    title: "Profile Card",
    description: "Child profile with OS badge, battery, PIN.",
    preview: "profile-card-demo",
    code: `import { ProfileCard } from "@safelagoon/ui";

<ProfileCard name="Alex" os="android" batteryPercent={78} pin="1234" />`,
  },
  "rule-card": {
    title: "Rule Card",
    description: "Schedule/time-limit rule editor card.",
    code: `import { RuleCard } from "@safelagoon/ui";`,
  },
  "schedule-grid": {
    title: "Schedule Grid",
    description: "7×24 internet rule heatmap.",
    code: `import { ScheduleGrid } from "@safelagoon/ui";`,
  },
  "sign-in-form": {
    title: "Sign In Form",
    description: "Auth block from @safelagoon/ui/blocks.",
    code: `import { SignInForm } from "@safelagoon/ui/blocks";`,
  },
};
