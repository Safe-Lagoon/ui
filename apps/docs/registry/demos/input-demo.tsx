import { Input } from "@safelagoon/ui";

export default function InputDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Input placeholder="Email address" aria-label="Email" />
      <Input placeholder="With error" error="This field is required" aria-label="Error example" />
    </div>
  );
}
