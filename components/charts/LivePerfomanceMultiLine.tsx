"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DataPoint = {
  time: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
};

export default function LivePerformanceLines({ data }: { data: DataPoint[] }) {
  return (
    <div className="mt-6 space-y-6">
      {/* Grid auto adapts: 1 col mobile, 2 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SingleLineChart
          data={data}
          dataKey="impressions"
          color="#2563eb"
          title="Impressions"
        />

        <SingleLineChart
          data={data}
          dataKey="clicks"
          color="#16a34a"
          title="Clicks"
        />

        <SingleLineChart
          data={data}
          dataKey="conversions"
          color="#dc2626"
          title="Conversions"
        />

        <SingleLineChart
          data={data}
          dataKey="spend"
          color="#f59e0b"
          title="Spend (₹)"
        />
      </div>
    </div>
  );
}

function SingleLineChart({
  data,
  dataKey,
  color,
  title,
}: {
  data: DataPoint[];
  dataKey: keyof DataPoint;
  color: string;
  title: string;
}) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        {title}
      </h2>

      {/* Responsive height */}
      <div className="w-full h-[220px] sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              dataKey="time"
              tick={{ fontSize: 12 }}
              minTickGap={20}
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

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
