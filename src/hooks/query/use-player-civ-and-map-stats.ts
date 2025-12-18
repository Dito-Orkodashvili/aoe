import { useQuery } from "@tanstack/react-query";
import { AoeCompanionStatsResponse } from "@/lib/aoe2companion.types";

export const usePlayerCivAndMapStats = (profileId: string | null) => {
  const url = `https://data.aoe2companion.com/api/profiles/${profileId}?language=en&extend=stats&page=1`;

  return useQuery<AoeCompanionStatsResponse | null>({
    queryKey: ["player-civs-and-maps-stats", profileId],
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
