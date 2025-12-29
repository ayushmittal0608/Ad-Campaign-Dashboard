import Link from "next/link";
import { BASE_URL, endpoints } from "@/lib/endpoints";

type Campaign = {
  id: string;
  name: string;
  brand_id: string;
  status: string;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
};

async function getCampaigns(): Promise<Campaign[]> {
  const res = await fetch(`${BASE_URL}${endpoints.getCampaigns}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  const json = await res.json();
  return Array.isArray(json) ? json : json.campaigns ?? [];
}

export default async function CampaignTable() {
  const data = await getCampaigns();

  return (
    <div className="bg-white rounded-md p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Camp Id</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Brand Id</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-6 py-3 text-right text-sm font-medium">Budget</th>
            <th className="px-6 py-3 text-center text-sm font-medium">Daily Budget</th>
            <th className="px-6 py-3 text-center text-sm font-medium">Platforms</th>
            <th className="px-6 py-3 text-center text-sm font-medium">Created At</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm font-medium">
                <Link
                  href={`/insights/${campaign.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {campaign.id}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm">{campaign.name}</td>
              <td className="px-6 py-4 text-sm">{campaign.brand_id}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-right">₹{campaign.budget}</td>
              <td className="px-6 py-4 text-sm text-center">₹{campaign.daily_budget}</td>
              <td className="px-6 py-4 text-sm text-center">{campaign.platforms.join(", ")}</td>
              <td className="px-6 py-4 text-sm text-center">
                {new Date(campaign.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
