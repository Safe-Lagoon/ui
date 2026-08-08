"use client";

import * as React from "react";
import { DatePicker } from "@safelagoon/ui";

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 6, 30));

  return (
    <div className="w-full max-w-xs space-y-6">
      <DatePicker
        label="Date"
        value={date}
        onChange={setDate}
        placeholder="Select a date"
      />
      <DatePicker label="Empty" placeholder="Select a date" />
    </div>
  );
}
