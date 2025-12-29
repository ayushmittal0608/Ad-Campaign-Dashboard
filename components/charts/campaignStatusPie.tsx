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
  active: "#1d2d4dff",     // green
  paused: "#4e576eff",     // amber
  completed: "#6b6f77ff",  // blue
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
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Campaign Status
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={65}        
            paddingAngle={5}       
            cornerRadius={12}      
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
