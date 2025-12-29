"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type ApiError = {
  error?: string;
  message?: string;
  status?: number;
  campaign_id?: string;
  retry_after?: number;
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  let parsedError: ApiError = {};
  let status = 500;

  try {
    parsedError = JSON.parse(error.message);
    status = parsedError.status ?? 500;
  } catch {
    status = 500;
  }

  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  const getTitle = () => {
    switch (status) {
      case 404:
        return "Campaign Not Found";
      case 429:
        return "Too Many Requests";
      case 400:
        return "Bad Request";
      case 500:
      default:
        return "Something Went Wrong";
    }
  };

  const getDescription = () => {
    switch (status) {
      case 404:
        return `The campaign ${
          parsedError.campaign_id ? `"${parsedError.campaign_id}"` : ""
        } does not exist or was removed.`;
      case 429:
        return `You have hit the API rate limit. Please wait ${
          parsedError.retry_after ?? 60
        } seconds before trying again.`;
      case 400:
        return parsedError.message ?? "The request was invalid.";
      case 500:
      default:
        return parsedError.message ?? "An unexpected server error occurred.";
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-black-500 mb-4">
        {getTitle()}
      </h1>

      <p className="text-gray-400 max-w-md mb-6">
        {getDescription()}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-blue-800 px-5 py-2 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          Retry
        </button>

        <button
          onClick={() => router.push("/campaigns")}
          className="rounded-lg border border-gray-600 px-5 py-2 text-gray-300 hover:bg-gray-800 transition cursor-pointer"
        >
          Go to Campaigns
        </button>
      </div>
    </div>
  );
}
