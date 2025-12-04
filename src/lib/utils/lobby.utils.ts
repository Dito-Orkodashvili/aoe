import { AoE2Player, EGameMode, LiveGamePlayer } from "@/lib/types/lobby.types";

export function parseAoE2MatchResponse(raw: any) {
  if (!Array.isArray(raw) || raw.length < 3) {
    console.error("Unexpected response", raw);
    throw new Error("Bad AOE2 API response");
  }

  const matchesRaw = raw[1];
  const playersRaw = raw[2];

  if (!Array.isArray(matchesRaw) || !Array.isArray(playersRaw)) {
    console.error("Unexpected structure:", raw);
    throw new Error("Invalid match structure");
  }

  return {
    matches: matchesRaw.map(parseMatch),
    players: playersRaw.map(parsePlayer),
  };
}

function parseMatch(row: any[]) {
  return {
    matchId: row[0],
    matchUUID: row[1],
    lobbyId: row[2],
    leaderProfileId: row[6],
    gameTypeId: row[7],
    lobbyName: row[8],
    matchName: row[9],
    isPasswordProtected: row[10] === 1,
    mapName: row[11],
    ratingTypeId: row[13],
    numPlayers: row[14],
    gameModeId: row[16],
    playersInMatch: row[17].map(parseMatchPlayer),
    isRanked: row[18] === 1,
    matchStartTimestamp: row[24],
  };
}

function parseMatchPlayer(row: any[]): LiveGamePlayer {
  return {
    matchId: row[0],
    profileId: row[1],
    ping: row[2],
    statGroupId: row[3],
    civilizationId: row[4],
    team: row[5],
    ipAddress: row[6],
  };
}

function parsePlayer(row: any[]): AoE2Player {
  return {
    rank: row[0],
    profileId: row[1],
    platformUserId: row[2],
    avatarInfoJson: row[3],
    name: row[4],
    clanTag: row[5],
    statGroupId: row[6],
    rating: row[7],
    wins: row[8],
    losses: row[9],
    streak: row[10],
    steamId: row[11],
    platformId: row[12],
    aliases: row[13],
  };
}

export async function getSessionId() {
  const url = process.env.LIBRE_SESSION_SERVICE_URL ?? "";
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[Steam] Failed to fetch sessionId");
    return null;
  }

  const data = await res.json();
  return data.sessionId;
}

// const transformSlots = (slots: LobbySlots): TransformedLobbySlot[] => {
//   if (!slots) return [];
//
//   return Object.entries(slots).map(([key, slot]) => ({
//     profileId: key,
//     ...slot,
//   }));
// };
//
// export const transformLobbyWSResponse = (
//   data?: LobbyMessage | null,
// ): TransformedLobbyMatch[] => {
//   if (!data) return [];
//   const allMatches = data.spectate_match_all;
//
//   return Object.keys(allMatches).map((profileId) => ({
//     profileId,
//     players: transformSlots(allMatches[profileId]?.slots),
//     ...allMatches[profileId],
//   }));
// };

export const GAME_MODE = {
  [EGameMode["RandomMap"]]: "Random Map",
  [EGameMode["EmpireWars"]]: "Empire Wars",
  [EGameMode["Regicide"]]: "Regicide",
  [EGameMode["KingOfTheHill"]]: "King Of The Hill",
  [EGameMode["DeathMatch"]]: "Death Match",
  [EGameMode["BattleRoyale"]]: "Battle Royale",
  [EGameMode["SuddenDeath"]]: "Sudden Death",
  [EGameMode["CaptureRelic"]]: "Capture The Relic",
  [EGameMode["DefendWonder"]]: "Defend The Wonder",
  [EGameMode["WonderRace"]]: "Wonder Race",
  [EGameMode["CoOpCampaign"]]: "Co-Op Campaign",
  [EGameMode["CustomScenario"]]: "Custom Scenario",
};
