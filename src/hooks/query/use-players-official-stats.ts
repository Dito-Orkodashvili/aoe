import { useQuery } from "@tanstack/react-query";

export const usePlayersOfficialStats = (
  profileIds: number[],
  { enabled }: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ["players-official-stats", profileIds],
    queryFn: () => {
      const encoded = encodeURIComponent(JSON.stringify(profileIds));
      return fetch(`/api/players-stats?profileIds=${encoded}`).then((res) =>
        res.json(),
      );
    },
    enabled: profileIds.length > 0 && enabled,
  });
};
