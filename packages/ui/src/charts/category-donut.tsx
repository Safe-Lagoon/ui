"use client";

import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "../lib/utils";

const BRAND_BLUE = "#2F77EE";
const BRAND_LILAC = "#B97CFF";
const DEFAULT_COLORS = [BRAND_BLUE, BRAND_LILAC, "#689FFA", "#94B8FF", "#D4B5FF"];

export interface CategoryDonutDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface CategoryDonutProps {
  data: CategoryDonutDataPoint[];
  className?: string;
  size?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  showTooltip?: boolean;
  centerLabel?: React.ReactNode;
}

export function CategoryDonut({
  data,
  className,
  size = 200,
  innerRadius = "62%",
  outerRadius = "88%",
  showTooltip = true,
  centerLabel,
}: CategoryDonutProps) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {showTooltip ? (
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
          ) : null}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {centerLabel ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {centerLabel}
        </div>
      ) : null}
    </div>
  );
}
