import type { ComponentType, SVGProps } from "react";
import { createElement } from "react";
import { AiChatTrigger } from "@safelagoon/ui";
import {
  AiAssistantMark,
  Alarm,
  AndroidBadge,
  ArrowLeft,
  ArrowRight,
  Battery,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  FeatureAiMcp,
  FeatureAiShield,
  FeatureApps,
  FeatureCalls,
  FeatureChild,
  FeatureFree,
  FeatureGallery,
  FeatureGps,
  FeatureMessenger,
  FeatureScreenTime,
  FeatureSocial,
  FeatureWeb,
  IOSBadge,
  Location,
  LogoMark,
  LogoHeader,
  Message,
  Phone,
  Settings,
  Shield,
} from "@safelagoon/ui/icons";

export type IconCatalogEntry = {
  name: string;
  category: string;
  component: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  /** Import path shown in “Copy import” (defaults to `@safelagoon/ui/icons`). */
  importFrom?: string;
  /** Render full component preview instead of a sized SVG glyph. */
  previewMode?: "icon" | "component";
};

function AiChatTriggerPreview() {
  return createElement(AiChatTrigger, {
    label: "Open AI assistant",
    onClick: () => {},
  });
}

export const iconCatalog: IconCatalogEntry[] = [
  { name: "ChevronDown", category: "Navigation", component: ChevronDown },
  { name: "ChevronUp", category: "Navigation", component: ChevronUp },
  { name: "ChevronLeft", category: "Navigation", component: ChevronLeft },
  { name: "ChevronRight", category: "Navigation", component: ChevronRight },
  { name: "ArrowLeft", category: "Navigation", component: ArrowLeft },
  { name: "ArrowRight", category: "Navigation", component: ArrowRight },
  { name: "FeatureChild", category: "Features", component: FeatureChild },
  { name: "FeatureFree", category: "Features", component: FeatureFree },
  { name: "FeatureGps", category: "Features", component: FeatureGps },
  { name: "FeatureWeb", category: "Features", component: FeatureWeb },
  { name: "FeatureApps", category: "Features", component: FeatureApps },
  { name: "FeatureSocial", category: "Features", component: FeatureSocial },
  { name: "FeatureMessenger", category: "Features", component: FeatureMessenger },
  { name: "FeatureScreenTime", category: "Features", component: FeatureScreenTime },
  { name: "FeatureCalls", category: "Features", component: FeatureCalls },
  { name: "FeatureAiShield", category: "Features", component: FeatureAiShield },
  { name: "FeatureGallery", category: "Features", component: FeatureGallery },
  { name: "FeatureAiMcp", category: "Features", component: FeatureAiMcp },
  { name: "AiAssistantMark", category: "App shell", component: AiAssistantMark },
  {
    name: "AiChatTrigger",
    category: "App shell",
    component: AiChatTriggerPreview as IconCatalogEntry["component"],
    importFrom: "@safelagoon/ui",
    previewMode: "component",
  },
  { name: "LogoMark", category: "Brand", component: LogoMark },
  { name: "LogoHeader", category: "Brand", component: LogoHeader },
  { name: "AndroidBadge", category: "Platform", component: AndroidBadge },
  { name: "IOSBadge", category: "Platform", component: IOSBadge },
  { name: "Battery", category: "General", component: Battery },
  { name: "Alarm", category: "General", component: Alarm },
  { name: "Location", category: "General", component: Location },
  { name: "Shield", category: "General", component: Shield },
  { name: "Clock", category: "General", component: Clock },
  { name: "Phone", category: "General", component: Phone },
  { name: "Message", category: "General", component: Message },
  { name: "Camera", category: "General", component: Camera },
  { name: "Settings", category: "General", component: Settings },
];

export const iconCategories = [...new Set(iconCatalog.map((icon) => icon.category))];

export function iconImportStatement(entry: IconCatalogEntry | string) {
  if (typeof entry === "string") {
    return `import { ${entry} } from "@safelagoon/ui/icons";`;
  }

  const from = entry.importFrom ?? "@safelagoon/ui/icons";
  return `import { ${entry.name} } from "${from}";`;
}
