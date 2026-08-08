import type { ComponentType, SVGProps } from "react";
import {
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
  FeatureApps,
  FeatureCalls,
  FeatureChild,
  FeatureFree,
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
};

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

export function iconImportStatement(name: string) {
  return `import { ${name} } from "@safelagoon/ui/icons";`;
}
