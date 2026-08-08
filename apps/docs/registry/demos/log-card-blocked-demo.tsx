import { LogCard } from "@safelagoon/ui";
import { FeatureWeb } from "@safelagoon/ui/icons";

export default function LogCardBlockedDemo() {
  return (
    <div className="w-full max-w-md">
      <LogCard
        icon={<FeatureWeb className="size-5" />}
        title="Blocked website"
        description="Attempted to visit example.com"
        timestamp="Today, 14:32"
        blocked
        blockedLabel="Blocked"
      />
    </div>
  );
}
