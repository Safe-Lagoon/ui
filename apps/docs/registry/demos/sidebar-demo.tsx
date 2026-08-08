import { Home, Settings, Users } from "lucide-react";
import { Sidebar } from "@safelagoon/ui";

export default function SidebarDemo() {
  return (
    <div className="h-80 overflow-hidden rounded-xl border border-border-soft">
      <Sidebar
        header={<span className="font-bold text-brand-blue">Safe Lagoon</span>}
        items={[
          { id: "home", label: "Home", icon: <Home className="size-4" />, active: true },
          { id: "profiles", label: "Profiles", icon: <Users className="size-4" /> },
          { id: "settings", label: "Settings", icon: <Settings className="size-4" /> },
        ]}
        footer={<span className="text-body-14 text-muted-foreground">v0.1.0</span>}
      />
    </div>
  );
}
