"use client";

import * as React from "react";
import { ScheduleGrid } from "@safelagoon/ui";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ScheduleGridDemo() {
  const [value, setValue] = React.useState([
    { day: 0, hour: 9 },
    { day: 0, hour: 10 },
    { day: 0, hour: 11 },
    { day: 1, hour: 9 },
    { day: 1, hour: 10 },
    { day: 4, hour: 18 },
    { day: 4, hour: 19 },
    { day: 4, hour: 20 },
  ]);

  return (
    <div className="w-full max-w-2xl">
      <ScheduleGrid value={value} onChange={setValue} dayLabels={dayLabels} />
    </div>
  );
}
