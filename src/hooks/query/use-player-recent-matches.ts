import { useQuery } from "@tanstack/react-query";
import { AoeCompanionMatchesResponse } from "@/lib/aoe2companion.types";

export const usePlayerRecentMatches = (profileId: string | null) => {
  const url = `https://data.aoe2companion.com/api/matches?profile_ids=${profileId}&with_profile_ids=&search=&leaderboard_ids=&language=en&use_enums=true&page=1`;

  return useQuery<AoeCompanionMatchesResponse | null>({
    queryKey: ["player-recent-matches", profileId],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "aoe.ge (+https://aoe.ge)",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch matches");
      return res.json();
    },
    enabled: Boolean(profileId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
