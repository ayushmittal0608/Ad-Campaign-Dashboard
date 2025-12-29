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
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Performance Metrics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}  
            fill="#24365cff"
            barSize={45}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
