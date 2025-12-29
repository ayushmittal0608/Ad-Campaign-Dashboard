import { BASE_URL, endpoints } from "./endpoints";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}

export async function fetchAllCampaignInsights() {
  const res = await fetch(`${BASE_URL}${endpoints.getAllCampaignInsights}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch insights");
  }

  return res.json();
}

export function streamCampaignInsights(
  campaignId: string,
  onMessage: (data: any) => void,
  onError?: () => void
) {
  const url = `${BASE_URL}${endpoints.getCampaignInsightsStream(campaignId)}`;

  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };

  eventSource.onerror = () => {
    onError?.();
    eventSource.close();
  };

  return () => eventSource.close(); // cleanup
}
