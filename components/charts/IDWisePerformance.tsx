"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  insights: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
  };
};

export default function PerformanceBar({ insights }: Props) {
  const data = [
    { name: "Impressions", value: insights.impressions },
    { name: "Clicks", value: insights.clicks },
    { name: "Conversions", value: insights.conversions },
    { name: "Spend", value: insights.spend },
  ];

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Performance Metrics
      </h2>

      {/* Responsive chart container */}
      <div className="w-full h-[240px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              width={40}
            />

            <Tooltip
              formatter={(value) => [
                typeof value === "number" ? value.toLocaleString() : "-",
                "",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              fill="#24365cff"
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
