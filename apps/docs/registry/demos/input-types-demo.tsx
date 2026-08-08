"use client";

import { Input, Label, MoneyInput } from "@safelagoon/ui";

export default function InputTypesDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="0" min={0} max={100} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="money">Money</Label>
        <MoneyInput id="money" placeholder="0.00" currencySymbol="$" />
      </div>
    </div>
  );
}
