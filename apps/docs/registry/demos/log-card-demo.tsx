import { LogCard } from "@safelagoon/ui";
import { Shield } from "lucide-react";

export default function LogCardDemo() {
  return (
    <LogCard
      icon={<Shield className="size-5 text-brand-blue" />}
      title="Blocked website"
      description="example.com was blocked by web filter"
      timestamp="Today, 14:32"
      blocked
    />
  );
}
