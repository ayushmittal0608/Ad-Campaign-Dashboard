"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BASE_URL, endpoints } from "@/lib/endpoints";
import Loading from "./loading";

import CampaignStatusPie from "../components/charts/campaignStatusPie";
import PerformancePie from "../components/charts/performancePie";

export default function Home() {
  const [insights, setInsights] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [insightsRes, campaignsRes] = await Promise.all([
          fetch(`${BASE_URL}${endpoints.getAllCampaignInsights}`),
          fetch(`${BASE_URL}${endpoints.getCampaigns}`),
        ]);

        const insightsJson = await insightsRes.json();
        const campaignsJson = await campaignsRes.json();

        setInsights(insightsJson.insights);
        setCampaigns(campaignsJson.campaigns.slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;
  if (!insights) return <p className="p-10">No data available</p>;

  return (
    <main className="p-4 md:p-10 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Mixo Ads Dashboard</h1>

        <Link
          href="/live"
          className="w-full md:w-auto text-center bg-black text-white px-4 py-2 rounded border border-black hover:bg-white hover:text-black transition"
        >
          Live Stream
        </Link>
      </div>

      {/* KPI Cards */}
      <Link href="/insights">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <Kpi title="Total Campaigns" value={insights.total_campaigns} />
          <Kpi title="Total Spend" value={`₹${insights.total_spend}`} />
          <Kpi title="Avg CTR" value={`${insights.avg_ctr}%`} />
          <Kpi title="Avg CPC" value={`₹${insights.avg_cpc}`} />
        </div>
      </Link>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Link href="/insights" className="block">
          <CampaignStatusPie insights={insights} />
        </Link>
        <Link href="/insights" className="block">
          <PerformancePie insights={insights} />
        </Link>
      </div>

      {/* Top 5 Campaigns */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold text-gray-800">Top 5 Campaigns</h2>
          <Link
            href="/campaigns"
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="min-w-[700px] w-full border-collapse">
            <thead>
              <tr className="text-left text-xs md:text-sm text-gray-500 border-b">
                <th className="pb-3">Campaign ID</th>
                <th className="pb-3">Campaign</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Budget</th>
                <th className="pb-3 text-right">Daily Budget</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((c, index) => (
                <tr
                  key={c.id}
                  className={`text-xs md:text-sm border-b last:border-b-0 hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-50/40" : ""
                  }`}
                >
                  <td className="py-3 font-mono text-gray-600">{c.id}</td>

                  <td className="py-3 font-medium text-gray-800">{c.name}</td>

                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          c.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="py-3 text-gray-700">₹{c.budget.toLocaleString()}</td>

                  <td className="py-3 text-right text-gray-700">
                    ₹{c.daily_budget.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Kpi({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow">
      <p className="text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-lg md:text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}
