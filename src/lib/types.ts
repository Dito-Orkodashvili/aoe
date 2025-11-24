import { Tables } from "@/lib/supabase/types";

export interface PersonalStatResponse {
  result: {
    code: number;
    message: string;
  };
  statGroups: StatGroup[];
  leaderboardStats: LeaderboardStat[];
}

export interface StatGroup {
  id: number;
  name: string;
  type: number;
  members: StatGroupMember[];
}

export interface StatGroupMember {
  profile_id: number;
  name: string;
  alias: string;
  personal_statgroup_id: number;
  xp: number;
  level: number;
  leaderboardregion_id: number;
  country: string;
  clanlist_name: string | null;
}

export interface LeaderboardStat {
  statgroup_id: number;
  leaderboard_id: number;
  wins: number;
  losses: number;
  streak: number;
  disputes: number;
  drops: number;
  rank: number;
  ranktotal: number;
  ranklevel: number;
  rating: number;
  regionrank: number;
  regionranktotal: number;
  lastmatchdate: number;
  highestrank: number;
  highestranklevel: number;
  highestrating: number;
}

export interface PlayerWithStats extends Tables<"players"> {
  one_v_one_stats?: LeaderboardStat | null;
  team_game_stats?: LeaderboardStat | null;
}
