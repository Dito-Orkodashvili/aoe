import { getPlayers } from "@/lib/supabase/player/get-players";
import type { MetadataRoute } from "next";

const BASE_URL = "https://aoe.ge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.VERCEL_ENV !== "production") {
    return [];
  }

  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    {
      url: `${BASE_URL}/tournaments`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/players`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/build-orders`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/leaderboard`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const players = await getPlayers();

  const playerRoutes: MetadataRoute.Sitemap = players.map((player) => ({
    url: `${BASE_URL}/players/${player.id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...playerRoutes];
}
