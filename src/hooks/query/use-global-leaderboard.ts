import { useQuery } from "@tanstack/react-query";
import {
  LeaderboardId,
  LeaderboardResponse,
} from "@/lib/aoe2companion/leaderboard.types";

type ParamsType = {
  searchTerm?: string;
  page?: number;
  type?: LeaderboardId;
  country?: string;
};

const BASE_URL = "https://data.aoe2companion.com/api/leaderboards";

export const useGlobalLeaderboard = (params: ParamsType) => {
  const { searchTerm = "", page = 1, type = "rm_1v1", country } = params;
  const hasCountryFilter = country && country !== "all";

  return useQuery<LeaderboardResponse>({
    queryKey: ["global-leaderboard", type, searchTerm, page, country],

    queryFn: async ({ signal }) => {
      const url = new URL(`${BASE_URL}/${type}`);

      url.searchParams.set("direction", "forward");
      url.searchParams.set("search", searchTerm);
      url.searchParams.set("language", "en");
      url.searchParams.set("extend", "players.avatar_small_url");
      url.searchParams.set("page", String(page));

      if (hasCountryFilter) {
        url.searchParams.set("country", country);
      }

      const res = await fetch(url.toString(), {
        signal,
        headers: {
          "User-Agent": "aoe.ge (+https://aoe.ge)",
        },
      });

      if (!res.ok) {
        throw new Error(`Leaderboard fetch failed: ${res.status}`);
      }

      return res.json();
    },
    enabled: page > 0,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
