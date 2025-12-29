"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import IDWisePerformance from "../../../components/charts/IDWisePerformance";
import { BASE_URL, endpoints } from "@/lib/endpoints";
import Loading from "../../loading"; // import your loading component

export default function CampaignInsightsPage() {
  const { id } = useParams<{ id: string }>(); 

  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    if (!id) return;

    async function fetchInsights() {
      setLoading(true); // start loading
      try {
        const res = await fetch(
          `${BASE_URL}${endpoints.getCampaignInsights(id)}`,
          { cache: "no-store" }
        );
        const json = await res.json();
        setInsights(json.insights ?? json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // stop loading
      }
    }

    fetchInsights();
  }, [id]);

  if (loading) return <Loading />; // show loading

  return (
    <div className="space-y-6 p-10">
      <h1 className="text-2xl font-bold">Campaign Insights • {id}</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Kpi title="Spend" value={`₹${insights.spend}`} />
        <Kpi title="CTR" value={`${insights.ctr}%`} />
        <Kpi title="CPC" value={`₹${insights.cpc}`} />
        <Kpi title="Conversions" value={insights.conversion_rate} />
      </div>

      <IDWisePerformance insights={insights} />
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
