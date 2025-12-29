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
    <div className="space-y-6 mt-6">
       <div className="flex gap-6">
        <div className="flex-1">
          <SingleLineChart
            data={data}
            dataKey="impressions"
            color="#2563eb"
            title="Impressions"
          />
        </div>

        <div className="flex-1">
          <SingleLineChart
            data={data}
            dataKey="clicks"
            color="#16a34a"
            title="Clicks"
          />
        </div>
      </div>

      {/* Row 2: Conversions + Spend */}
      <div className="flex gap-6">
        <div className="flex-1">
          <SingleLineChart
            data={data}
            dataKey="conversions"
            color="#dc2626"
            title="Conversions"
          />
        </div>

        <div className="flex-1">
          <SingleLineChart
            data={data}
            dataKey="spend"
            color="#f59e0b"
            title="Spend (₹)"
          />
        </div>
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
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
