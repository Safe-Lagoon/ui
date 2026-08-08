import type { DemoName } from "./demo-names";

import appShellDemo from "./demos/app-shell-demo.tsx?raw";
import burgerMenuDemo from "./demos/burger-menu-demo.tsx?raw";
import buttonSizesDemo from "./demos/button-sizes-demo.tsx?raw";
import buttonVariants from "./demos/button-variants.tsx?raw";
import checkboxDemo from "./demos/checkbox-demo.tsx?raw";
import checkboxStatesDemo from "./demos/checkbox-states-demo.tsx?raw";
import dataTableDemo from "./demos/data-table-demo.tsx?raw";
import datePickerDemo from "./demos/date-picker-demo.tsx?raw";
import dialogDemo from "./demos/dialog-demo.tsx?raw";
import drawerDemo from "./demos/drawer-demo.tsx?raw";
import eventTimelineDemo from "./demos/event-timeline-demo.tsx?raw";
import galleryDemo from "./demos/gallery-demo.tsx?raw";
import headerDemo from "./demos/header-demo.tsx?raw";
import inputDemo from "./demos/input-demo.tsx?raw";
import inputSizesDemo from "./demos/input-sizes-demo.tsx?raw";
import inputStatesDemo from "./demos/input-states-demo.tsx?raw";
import inputTypesDemo from "./demos/input-types-demo.tsx?raw";
import layoutsDemo from "./demos/layouts-demo.tsx?raw";
import logCardBlockedDemo from "./demos/log-card-blocked-demo.tsx?raw";
import logCardDemo from "./demos/log-card-demo.tsx?raw";
import mapMarkerDemo from "./demos/map-marker-demo.tsx?raw";
import profileCardDemo from "./demos/profile-card-demo.tsx?raw";
import ruleCardEditDemo from "./demos/rule-card-edit-demo.tsx?raw";
import ruleCardViewDemo from "./demos/rule-card-view-demo.tsx?raw";
import scheduleGridDemo from "./demos/schedule-grid-demo.tsx?raw";
import screenMirrorDemo from "./demos/screen-mirror-demo.tsx?raw";
import sidebarDemo from "./demos/sidebar-demo.tsx?raw";
import signInFormDemo from "./demos/sign-in-form-demo.tsx?raw";
import signInFormErrorsDemo from "./demos/sign-in-form-errors-demo.tsx?raw";
import tableDemo from "./demos/table-demo.tsx?raw";
import tabsDemo from "./demos/tabs-demo.tsx?raw";

export const demoSources: Record<DemoName, string> = {
  "app-shell-demo": appShellDemo,
  "burger-menu-demo": burgerMenuDemo,
  "button-sizes-demo": buttonSizesDemo,
  "button-variants": buttonVariants,
  "checkbox-demo": checkboxDemo,
  "checkbox-states-demo": checkboxStatesDemo,
  "data-table-demo": dataTableDemo,
  "date-picker-demo": datePickerDemo,
  "dialog-demo": dialogDemo,
  "drawer-demo": drawerDemo,
  "event-timeline-demo": eventTimelineDemo,
  "gallery-demo": galleryDemo,
  "header-demo": headerDemo,
  "input-demo": inputDemo,
  "input-sizes-demo": inputSizesDemo,
  "input-states-demo": inputStatesDemo,
  "input-types-demo": inputTypesDemo,
  "layouts-demo": layoutsDemo,
  "log-card-blocked-demo": logCardBlockedDemo,
  "log-card-demo": logCardDemo,
  "map-marker-demo": mapMarkerDemo,
  "profile-card-demo": profileCardDemo,
  "rule-card-edit-demo": ruleCardEditDemo,
  "rule-card-view-demo": ruleCardViewDemo,
  "schedule-grid-demo": scheduleGridDemo,
  "screen-mirror-demo": screenMirrorDemo,
  "sidebar-demo": sidebarDemo,
  "sign-in-form-demo": signInFormDemo,
  "sign-in-form-errors-demo": signInFormErrorsDemo,
  "table-demo": tableDemo,
  "tabs-demo": tabsDemo,
};
