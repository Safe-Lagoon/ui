import { Clock, MapPin, ShieldBan, Smartphone } from "lucide-react";
import { KpiCard } from "@safelagoon/ui";

export default function KpiCardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        icon={<Clock aria-hidden />}
        value="4h 12m"
        label="Screen time today"
        trendLabel="↓ 18% vs yesterday"
        trendDirection="down"
      />
      <KpiCard
        icon={<ShieldBan aria-hidden />}
        value="14"
        label="Blocked attempts"
        trendLabel="↑ 3 since yesterday"
        trendDirection="up"
      />
      <KpiCard
        icon={<Smartphone aria-hidden />}
        value="28"
        label="Apps in use"
        trendLabel="No change"
        trendDirection="neutral"
      />
      <KpiCard
        icon={<MapPin aria-hidden />}
        value="Home"
        label="Current location"
        trendLabel="Inside safe zone"
        trendDirection="neutral"
      />
    </div>
  );
}
