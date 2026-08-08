import { ProfileCard } from "@safelagoon/ui";

export default function ProfileCardDemo() {
  return (
    <ProfileCard
      name="Alex"
      os="android"
      osLabel="Android"
      batteryPercent={78}
      batteryLabel="Battery"
      pin="1234"
      pinLabel="PIN"
      avatarFallback="A"
    />
  );
}
