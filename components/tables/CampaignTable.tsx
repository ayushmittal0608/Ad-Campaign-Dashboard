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
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Camp ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Brand</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium">Budget</th>
              <th className="px-6 py-3 text-right text-sm font-medium">
                Daily Budget
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                Platforms
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                Created
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">
                  <Link
                    href={`/insights/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {c.id}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm">{c.name}</td>
                <td className="px-6 py-4 text-sm">{c.brand_id}</td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  ₹{c.budget.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  ₹{c.daily_budget.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {c.platforms.join(", ")}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {data.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg p-4 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-start">
              <Link
                href={`/insights/${c.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {c.name}
              </Link>
              <StatusBadge status={c.status} />
            </div>

            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Campaign ID:</span> {c.id}
              </p>
              <p>
                <span className="font-medium">Brand:</span> {c.brand_id}
              </p>
              <p>
                <span className="font-medium">Budget:</span> ₹
                {c.budget.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Daily:</span> ₹
                {c.daily_budget.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Platforms:</span>{" "}
                {c.platforms.join(", ")}
              </p>
              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(c.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
