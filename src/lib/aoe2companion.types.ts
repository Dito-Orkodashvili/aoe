export type LeaderboardStats = {
  leaderboardId: string;
  leaderboardName: string;
  abbreviation: string;

  profileId: number;
  name: string;

  rank: number;
  rankCountry: number;
  rating: number;
  maxRating: number;
  total: number;

  wins: number;
  losses: number;
  games: number;
  drops: number;

  streak: number;
  active: boolean;

  lastMatchTime: string;
  updatedAt: string;

  season: number;
  rankLevel: string;
  rankLevelName: string;
  rankLevelImageUrl: string | null;
};

export type LinkedProfile = {
  clan: string | null;
  drops: number | null;
  games: number | null;
  hidden: boolean | null;

  name: string;
  profileId: number;
  steamId: string;
  country: string;

  platform: number | "steam";
  verified: boolean;
  shared: boolean;
  sharedHistory: unknown | null;
};

export type AoeCompanionStatsResponse = {
  params: {
    extend: string;
  };

  clan: string | null;
  drops: string | null;
  games: string | null;
  hidden: boolean | null;

  name: string;
  profileId: number;
  steamId: string;
  country: string;
  countryIcon: string;
  countryName: string;

  platform: "steam" | number;
  platformName: string;

  verified: boolean;
  shared: boolean;
  sharedHistory: unknown | null;

  linkedProfiles: LinkedProfile[];

  leaderboards: LeaderboardStats[];
  ratings: unknown[];

  stats: CivStatsByLeaderboard[];
};

export type CivStatsByLeaderboard = {
  leaderboardId: string;
  leaderboardName: string;
  abbreviation: string;

  map: MapStats[];
  civ: CivStats[];
};

export type CivStats = {
  civ: string;
  civName: string;
  civImageUrl: string;

  games: number;
  wins: number;
  losses: number;
};

export type MapStats = {
  map: string;
  mapName: string;
  mapImageUrl: string;

  games: number;
  wins: number;
  losses: number;
};

export type AoeCompanionMatchesResponse = {
  page: number;
  perPage: number;
  total: number | null;
  matches: AoeMatch[];
};

export type AoeMatch = {
  matchId: number;

  started: string;
  finished: string;

  leaderboard: string;
  leaderboardId: string;
  leaderboardName: string;
  internalLeaderboardId: number;

  name: string;
  server: string | null;
  privacy: "public" | "private";

  mod: boolean;
  patch: number;
  pup: boolean;

  map: string;
  mapName: string;
  mapImageUrl: string;

  difficulty: string;
  difficultyName: string;

  startingAge: string;
  startingAgeName: string;
  endingAge: string;
  endingAgeName: string;

  gameMode: string;
  gameModeName: string;

  lockSpeed: boolean;
  lockTeams: boolean;

  mapSize: string;
  mapSizeName: string;

  population: number;
  hideCivs: boolean;
  recordGame: boolean;

  regicideMode: boolean;
  empireWarsMode: boolean;
  suddenDeathMode: boolean;
  antiquityMode: boolean;
  turboMode: boolean;

  fullTechTree: boolean;
  allowCheats: boolean;

  gameVariant: string;

  resources: string;
  resourcesName: string;

  sharedExploration: boolean;

  speed: string;
  speedName: string;
  speedFactor: number;

  civilizationSet: string;
  civilizationSetName: string;

  teamPositions: boolean;
  teamTogether: boolean;
  treatyLength: number;

  victory: string;
  victoryName: string;

  revealMap: string;
  revealMapName: string;

  scenario: string | null;
  password: boolean;
  modDataset: string | null;

  teams: MatchTeam[];
};

export type MatchTeam = {
  teamId: number;
  players: MatchPlayer[];
};

export type MatchPlayer = {
  profileId: number;
  name: string;

  rating: number;
  ratingDiff: number;

  civ: string;
  civName: string;
  civImageUrl: string;

  color: number;
  colorHex: string;
  slot: number;

  status: "player" | string;
  team: number;

  replay: boolean;
  won: boolean;

  country: string;
  shared: boolean;
  verified: boolean;
};
