"use client";

import { RuleCard } from "@safelagoon/ui";

const weekdayOptions = [
  { value: 0 as const, label: "Mon" },
  { value: 1 as const, label: "Tue" },
  { value: 2 as const, label: "Wed" },
  { value: 3 as const, label: "Thu" },
  { value: 4 as const, label: "Fri" },
  { value: 5 as const, label: "Sat" },
  { value: 6 as const, label: "Sun" },
];

export default function RuleCardViewDemo() {
  return (
    <div className="w-full max-w-md">
      <RuleCard
        mode="view"
        name="School nights"
        enabled
        weekdays={[0, 1, 2, 3, 4]}
        weekdaysOptions={weekdayOptions}
        nameLabel="Rule name"
        enabledLabel="Enabled"
        saveLabel="Save"
        cancelLabel="Cancel"
        deleteLabel="Delete"
        editLabel="Edit"
        confirmDeleteLabel="Delete this rule?"
      />
    </div>
  );
}
