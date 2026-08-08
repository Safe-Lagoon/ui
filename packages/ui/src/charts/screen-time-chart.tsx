"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../lib/utils";

const BRAND_BLUE = "#2F77EE";
const BRAND_LILAC = "#B97CFF";

export interface ScreenTimeDataPoint {
  label: string;
  minutes: number;
}

export interface ScreenTimeChartProps {
  data: ScreenTimeDataPoint[];
  className?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
}

export function ScreenTimeChart({
  data,
  className,
  height = 240,
  showGrid = true,
  showTooltip = true,
}: ScreenTimeChartProps) {
  const gradientId = React.useId();

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BRAND_BLUE} stopOpacity={0.35} />
              <stop offset="100%" stopColor={BRAND_LILAC} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          {showGrid ? (
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          ) : null}
          <XAxis
            dataKey="label"
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
            tickFormatter={(value: number) => `${value}m`}
          />
          {showTooltip ? (
            <Tooltip
              cursor={{ stroke: BRAND_BLUE, strokeWidth: 1, strokeDasharray: "4 4" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number) => [`${value} min`, "Screen time"]}
            />
          ) : null}
          <Area
            type="monotone"
            dataKey="minutes"
            stroke={BRAND_BLUE}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 5, fill: BRAND_LILAC, stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
