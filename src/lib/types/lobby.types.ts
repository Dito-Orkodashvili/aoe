import { LeaderboardStat } from "@/lib/types";

export interface LiveGamesResponse {
  matches: LiveGame[];
  players: AoE2Player[];
}

export interface LiveGame {
  matchId: number;
  matchUUID: number;
  lobbyId: string;
  leaderProfileId: number;
  gameTypeId: number;
  lobbyName: string;
  matchName: string;
  isPasswordProtected: boolean;
  mapName: string;
  replayDataBase64: string;
  ratingTypeId: number;
  numPlayers: number;
  playerSummaryBase64: string;
  gameModeId: number;
  playersInMatch: LiveGamePlayer[];
  isRanked: boolean;
  mapSizeId: number;
  populationLimitId: number;
  gameSpeedId: number;
  lockSpeedFlag: boolean;
  cheatsEnabled: boolean;
  matchStartTimestamp: number;
  serverRegionCode: string;
  serverRegionName: string;
}

export interface LiveGamePlayer {
  matchId: number;
  profileId: number;
  ping: number;
  statGroupId: number;
  civilizationId: number;
  team: number;
  ipAddress: string;
}

export interface AoE2Player {
  rank: number;
  profileId: number;
  platformUserId: string;
  avatarInfoJson: string;
  name: string;
  clanTag: string;
  statGroupId: number;
  rating: number;
  wins: number;
  losses: number;
  streak: number | null;
  steamId: string;
  platformId: number;
  aliases: string[];
}

export type LobbySubscribeMessage =
  | { action: "subscribe"; type: "matches"; context: "lobby" }
  | {
      action: "subscribe";
      type: "elotypes";
      context: "lobby";
      ids: string[];
    }
  | {
      action: "subscribe";
      type: "players";
      context: "lobby";
      ids: string[];
    };

export interface LobbySlot {
  civilization: number;
  color: number;
  country: string;
  name: string;
  profileid: number;
  status: number;
  steam_avatar: string;
  steam_profile: string;
  team: number;
}

export type LobbySlots = Record<string, LobbySlot>;

export interface LobbyMatch {
  ai: boolean;
  ai_difficulty: number;
  allowed_civs: number;
  antiquity_mode: boolean;
  cheats: boolean;
  cheated_time: number;
  data_mod: string | null;
  description: string;
  dm_max_elo: number;
  dm_min_elo: number;
  ending_age: number;
  ew_mode: boolean;
  full_tech_tree: boolean;
  game: number;
  hide_civilizations: boolean;
  host_profileid: number;
  lock_speed: boolean;
  lock_teams: boolean;
  map_name: string;
  map_type: number;
  mapid: number;
  match_typeid: number;
  matchid: number;
  mode: EGameMode;
  observable: boolean;
  observer_delay: number;
  open_slots: boolean;
  origin: number;
  password: boolean;
  population: number;
  ranked_dm: number;
  record: boolean;
  regicide_mode: boolean;
  resources: number;
  reveal_map: number;
  scenario: string | null;
  selected_content: number;
  server: number;
  shared_exploration: boolean;
  size: number;
  slots: LobbySlots;
  slots_taken: number;
  slots_total: number;
  speed: number;
  starting_age: number;
  steam_lobbyid: string;
  sudden_death_mode: boolean;
  team_positions: boolean;
  team_together: boolean;
  treaty_length: number;
  turbo_mode: boolean;
  victory: number;
  victory_threshold: number;
}

export interface LobbyMessage {
  lobby_match_all?: Record<string, LobbyMatch>;
  lobby_match_update?: Record<string, Partial<LobbyMatch>>;
  lobby_match_remove?: string[];
  lobby_observers_update?: Record<string, { observers: number }>;
  lobby_player_remove?: string[];
}

export type TransformedLobbySlot = LobbySlot & {
  profileId: string;
};

export type TransformedLobbyMatch = LobbyMatch & {
  lobbyId: string;
  players: TransformedLobbySlot[];
  lastUpdated: number;
  isGeorgianParticipating?: boolean;
};

/*
 * Spectate
 * */
export type SpectateSubscribeMessage =
  | { action: "subscribe"; type: "matches"; context: "spectate" }
  | {
      action: "subscribe";
      type: "players";
      context: "spectate";
      ids?: string[];
    };

export type SpectateSlot = LobbySlot;
export type SpectateSlots = LobbySlots;
export type SpectateMatch = LobbyMatch & { start_time: number };
export interface SpectateMessage {
  spectate_match_all?: Record<string, SpectateMatch>;
  spectate_match_update?: Record<string, Partial<SpectateMatch>>;
  spectate_match_remove?: string[];
  spectate_observers_update?: Record<string, { observers: number }>;
  spectate_player_remove?: string[];
}

export type TransformedSpectateSlot = SpectateSlot & {
  profileId: string;
};

export type TransformedSpectateMatch = SpectateMatch & {
  matchId: string;
  players: TransformedLobbySlot[];
  lastUpdated: number;
  isGeorgianParticipating?: boolean;
};

export enum EGameMode {
  RandomMap = 0,
  EmpireWars = 1,
  Regicide = 2,
  KingOfTheHill = 3,
  DeathMatch = 4,
  BattleRoyale = 5,
  SuddenDeath = 6,
  CaptureRelic = 7,
  DefendWonder = 8,
  WonderRace = 9,
  CoOpCampaign = 10,
  CustomScenario = 11,
}

export interface LobbyPlayerWithStats extends LobbySlot {
  one_v_one_stats?: LeaderboardStat | null;
}
