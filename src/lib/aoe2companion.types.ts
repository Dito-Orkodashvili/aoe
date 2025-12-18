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

export type AoeCompanionCivStatsResponse = {
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
