"use client";
import PerformancePie from "../../components/charts/performancePie";
import { useEffect, useState } from "react";
import { BASE_URL, endpoints } from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import CampaignStatusPie from "../../components/charts/campaignStatusPie";

type Campaign = {
  id: string;
  name: string;
};

export default function InsightsPage() {
  const [insights, setInsights] = useState<any>(null);
 
  const [campaignIds, setCampaignIds] = useState<Campaign[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch(`${BASE_URL}${endpoints.getCampaigns}`);
        const json = await res.json();
        const campaignList = json.campaigns.map((c: any) => ({
          id: c.id,
          name: c.name,
        }));
        setCampaignIds(campaignList);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    }

    fetchCampaigns();
  }, []);

  useEffect(() => {
    async function fetchInsights() {
      const res = await fetch(`${BASE_URL}${endpoints.getAllCampaignInsights}`);
      const json = await res.json();
      setInsights(json.insights);
     
    }

    fetchInsights();
  }, []);

  
  if (!insights) return null;

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      router.push(`insights/${selectedId}`);
    }
  };

  return (
    <div className="space-y-6 p-10">
      <h1 className="text-2xl font-bold">Insights</h1>

      <div className="absolute top-20 right-10">
        <select
          className="border border-gray-300 rounded p-2"
          onChange={handleCampaignChange}
          defaultValue=""
        >
          <option value="">
            Select Campaign
          </option>
          {campaignIds.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id}
            </option>
          ))}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Kpi title="Total Campaigns" value={insights.total_campaigns} />
        <Kpi title="Total Spend" value={`₹${insights.total_spend}`} />
        <Kpi title="Avg CTR" value={`${insights.avg_ctr}%`} />
        <Kpi title="Avg CPC" value={`₹${insights.avg_cpc}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CampaignStatusPie insights={insights} />
        <PerformancePie insights={insights} />
    </div>

    </div>
  );
}

function Kpi({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}
