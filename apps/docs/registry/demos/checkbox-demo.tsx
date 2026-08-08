"use client";

import { Checkbox, Label } from "@safelagoon/ui";

export default function CheckboxDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="opacity-50">
          Disabled option
        </Label>
      </div>
    </div>
  );
}
