import { Input } from "@safelagoon/ui";

export default function InputStatesDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Input placeholder="Default" aria-label="Default" />
      <Input placeholder="Disabled" disabled aria-label="Disabled" />
      <Input placeholder="Read-only value" readOnly defaultValue="parent@example.com" aria-label="Read only" />
    </div>
  );
}
