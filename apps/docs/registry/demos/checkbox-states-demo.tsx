"use client";

import * as React from "react";
import { Checkbox, Label } from "@safelagoon/ui";

export default function CheckboxStatesDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id="controlled"
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <Label htmlFor="controlled">
        Controlled — {checked ? "checked" : "unchecked"}
      </Label>
    </div>
  );
}
