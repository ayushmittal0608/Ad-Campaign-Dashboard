"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: any[];
  dataKey: string;
  title: string;
  color: string;
};

export default function SingleAreaChart({
  data,
  dataKey,
  title,
  color,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={`url(#gradient-${dataKey})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
