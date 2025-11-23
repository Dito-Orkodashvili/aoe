const statsUrl = process.env.NEXT_PUBLIC_AOE_API_GAME_STATS_URL;

export const getPlayerStats = async (profileId: number) => {
  const statsResponse = await fetch(statsUrl || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: 0,
      matchType: 3,
      profileId,
    }),
  });

  return await statsResponse.json();
};
