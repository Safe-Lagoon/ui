"use client";

import * as React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { cn } from "../lib/utils";

const BRAND_BLUE = "#2F77EE";

export interface SparkLineDataPoint {
  value: number;
}

export interface SparkLineProps {
  data: SparkLineDataPoint[];
  className?: string;
  width?: number | string;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export function SparkLine({
  data,
  className,
  width = "100%",
  height = 32,
  color = BRAND_BLUE,
  strokeWidth = 2,
}: SparkLineProps) {
  return (
    <div className={cn("inline-block", className)} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={strokeWidth}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
