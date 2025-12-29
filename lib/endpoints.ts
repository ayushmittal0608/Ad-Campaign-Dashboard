export const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

export const endpoints = {
  getCampaigns: "/campaigns",

  getCampaignById: (id: string) => `/campaigns/${id}`,

  getAllCampaignInsights: "/campaigns/insights",

  getCampaignInsights: (id: string) => `/campaigns/${id}/insights`,

  getCampaignInsightsStream: (id: string) =>
    `/campaigns/${id}/insights/stream`,
};
