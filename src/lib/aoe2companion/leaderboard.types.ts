export type LeaderboardId = "rm_1v1" | "rm_team";

export type LeaderboardResponse = {
  params: {
    extend: string;
  };
  leaderboardId: LeaderboardId;
  country: string | null;
  total: number;
  start: number;
  count: number;
  page: number;
  perPage: number;
  players: LeaderboardPlayer[];
};

export type LeaderboardPlayer = {
  leaderboardId: LeaderboardId;
  profileId: number;
  name: string;
  rank: number;
  rating: number;
  lastMatchTime: string;
  drops: number;
  losses: number;
  streak: number;
  wins: number;
  games: number;
  updatedAt: string;
  rankCountry: number;
  active: boolean;
  season: number;
  rankLevel: number;
  country: string;
  clan: string;
  avatarSmallUrl: string;
};
