"use client";

import { useEffect, useState } from "react";
import { BASE_URL, endpoints } from "@/lib/endpoints";
import LivePerformanceMultiLine from "../../components/charts/LivePerfomanceMultiLine";
import Loading from "../loading";
const MAX_POINTS = 30;

type Campaign = {
  id: string;
  name: string;
};

type StreamDataPoint = {
  time: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
};

/* -------------------- Page -------------------- */

export default function CampaignInsightsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [streamData, setStreamData] = useState<StreamDataPoint[]>([]);


  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`${BASE_URL}${endpoints.getCampaigns}`);
        const data = await res.json();

       
        setCampaigns(data.campaigns || data);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      } finally {
        setLoadingCampaigns(false);
      }
    };

    fetchCampaigns();
  }, []);


  useEffect(() => {
    if (!selectedCampaign) return;

    const es = new EventSource(
      `${BASE_URL}${endpoints.getCampaignInsightsStream(selectedCampaign)}`
    );

    es.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      const dataPoint: StreamDataPoint = {
        time: new Date().toLocaleTimeString(),
        impressions: payload.impressions,
        clicks: payload.clicks,
        conversions: payload.conversions,
        spend: payload.spend,
      };

      setStreamData((prev) => {
        const updated = [...prev, dataPoint];
        return updated.length > MAX_POINTS
          ? updated.slice(-MAX_POINTS)
          : updated;
      });
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
      es.close();
    };

    return () => es.close();
  }, [selectedCampaign]);

  const latest = streamData[streamData.length - 1];

  if(loadingCampaigns){
    return <Loading/>;
  }

  return (
    <div className="space-y-6 p-10">
      <h1 className="text-2xl font-bold">Campaign Live Stream</h1>

   
      <select
        value={selectedCampaign ?? ""}
        onChange={(e) => {
          setSelectedCampaign(e.target.value);
          setStreamData([]);
        }}
        className="border p-2 rounded-lg"
        style={{width: "100%"}}
      >
        <option value="">
          {loadingCampaigns ? "Loading campaigns..." : "Select a campaign"}
        </option>

        {campaigns.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {!latest && (
        <p className="mt-4 text-gray-500">
          Select a campaign to see live data.
        </p>
      )}

      {latest && (
        <>
       
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Kpi title="Spend" value={`₹${latest.spend}`} />
            <Kpi
              title="CTR"
              value={`${
                latest.impressions
                  ? ((latest.clicks / latest.impressions) * 100).toFixed(2)
                  : 0
              }%`}
            />
            <Kpi
              title="CPC"
              value={
                latest.clicks
                  ? `₹${(latest.spend / latest.clicks).toFixed(2)}`
                  : "₹0"
              }
            />
            <Kpi
              title="Conversions"
              value={latest.conversions}
            />
          </div>

          <LivePerformanceMultiLine data={streamData} />
        </>
      )}
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
