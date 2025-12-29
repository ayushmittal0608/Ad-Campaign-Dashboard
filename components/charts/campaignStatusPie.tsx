"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  insights: {
    active_campaigns: number;
    paused_campaigns: number;
    completed_campaigns: number;
  };
};

const COLORS = {
  active: "#1d2d4dff",
  paused: "#4e576eff",
  completed: "#6b6f77ff",
};

export default function CampaignStatusPie({ insights }: Props) {
  const data = [
    { name: "Active", value: insights.active_campaigns, color: COLORS.active },
    { name: "Paused", value: insights.paused_campaigns, color: COLORS.paused },
    {
      name: "Completed",
      value: insights.completed_campaigns,
      color: COLORS.completed,
    },
  ];

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Campaign Status
      </h2>

      {/* Chart */}
      <div className="w-full h-[220px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="55%"
              paddingAngle={6}
              cornerRadius={10}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

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
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-1 gap-2 text-sm">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
          >
            <span
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 truncate">
              {item.name}: <span className="font-medium">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
