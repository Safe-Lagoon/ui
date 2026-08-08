import { Input, Label } from "@safelagoon/ui";

export default function InputSizesDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="input-sm">Small</Label>
        <Input id="input-sm" inputSize="sm" placeholder="Small input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="input-default">Default</Label>
        <Input id="input-default" placeholder="Default input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="input-lg">Large</Label>
        <Input id="input-lg" inputSize="lg" placeholder="Large input" />
      </div>
    </div>
  );
}
