export interface MatchHistoryResponse {
  result: {
    code: number;
    message: string;
  };
  matchHistoryStats: MatchHistoryStat[];
  profiles: MatchHistoryProfile[];
}

export interface MatchHistoryStat {
  id: number;
  creator_profile_id: number;
  mapname: string;
  maxplayers: number;
  matchtype_id: number;
  options: string;
  slotinfo: string;
  description: string;
  startgametime: number;
  completiontime: number;
  observertotal: number;

  matchhistoryreportresults: MatchHistoryReportResult[];
  matchhistoryitems: unknown[];
  matchurls: MatchUrl[];

  matchhistorymember: MatchHistoryMember[];

  gamemod_id: number;
}

export interface MatchHistoryReportResult {
  matchhistory_id: number;
  profile_id: number;
  resulttype: number;
  teamid: number;
  civilization_id: number;
  xpgained: number;
  counters: string;
  matchstartdate: number;
}

export interface MatchUrl {
  profile_id: number;
  url: string;
  size: number;
  datatype: number;
}

export interface MatchHistoryMember {
  matchhistory_id: number;
  profile_id: number;
  civilization_id: number;
  statgroup_id: number;
  teamid: number;
  wins: number;
  losses: number;
  streak: number;
  arbitration: number;
  outcome: number;
  oldrating: number;
  newrating: number;
  reporttype: number;
}

export interface ExtractedMatchInfo {
  id: number;
  mapName: string;
  completionTime: number;
  duration: string;
  players: ExtractedPlayerInfo[];
}

export interface ExtractedPlayerInfo {
  profileId: number;
  civilizationId: number;
  oldRating: number;
  newRating: number;
  ratingChange: number;
  outcome: "win" | "loss";
  name: string;
  alias: string;
  country: string;
  teamId: number;
}

export interface MatchHistoryProfile {
  profile_id: number;
  name: string;
  alias: string;
  personal_statgroup_id: number;
  xp: number;
  level: number;
  leaderboardregion_id: number;
  country: string;
  clanlist_name: string;
}
