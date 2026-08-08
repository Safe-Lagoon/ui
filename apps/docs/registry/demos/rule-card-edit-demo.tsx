"use client";

import * as React from "react";
import { RuleCard, type WeekdayValue } from "@safelagoon/ui";

const weekdayOptions = [
  { value: 0 as const, label: "Mon" },
  { value: 1 as const, label: "Tue" },
  { value: 2 as const, label: "Wed" },
  { value: 3 as const, label: "Thu" },
  { value: 4 as const, label: "Fri" },
  { value: 5 as const, label: "Sat" },
  { value: 6 as const, label: "Sun" },
];

export default function RuleCardEditDemo() {
  const [name, setName] = React.useState("Weekend limit");
  const [enabled, setEnabled] = React.useState(true);
  const [weekdays, setWeekdays] = React.useState<WeekdayValue[]>([5, 6]);

  return (
    <div className="w-full max-w-md">
      <RuleCard
        mode="edit"
        name={name}
        enabled={enabled}
        weekdays={weekdays}
        weekdaysOptions={weekdayOptions}
        nameLabel="Rule name"
        enabledLabel="Enabled"
        saveLabel="Save"
        cancelLabel="Cancel"
        deleteLabel="Delete"
        editLabel="Edit"
        confirmDeleteLabel="Delete this rule?"
        onNameChange={setName}
        onEnabledChange={setEnabled}
        onWeekdaysChange={setWeekdays}
        onSave={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}
