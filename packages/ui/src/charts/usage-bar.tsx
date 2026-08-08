"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../lib/utils";

const BRAND_BLUE = "#2F77EE";
const BRAND_LILAC = "#B97CFF";

export interface UsageBarDataPoint {
  name: string;
  value: number;
}

export interface UsageBarProps {
  data: UsageBarDataPoint[];
  className?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  barColor?: string;
}

export function UsageBar({
  data,
  className,
  height = 240,
  showGrid = true,
  showTooltip = true,
  barColor = BRAND_BLUE,
}: UsageBarProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          {showGrid ? (
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          ) : null}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            width={36}
          />
          {showTooltip ? (
            <Tooltip
              cursor={{ fill: `${BRAND_LILAC}22` }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
          ) : null}
          <Bar
            dataKey="value"
            fill={barColor}
            radius={[6, 6, 0, 0]}
            maxBarSize={48}
            activeBar={{ fill: BRAND_LILAC }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
