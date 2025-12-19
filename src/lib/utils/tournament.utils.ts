import { TournamentType } from "@/lib/types/tournament.types";

export function distributePrizePool(amount: number, participants: number) {
  let distribution: number[];

  if (participants < 4) {
    distribution = [1];
  } else if (participants < 8) {
    distribution = [0.7, 0.3];
  } else {
    distribution = [0.5, 0.25, 0.15, 0.1];
  }

  return distribution.map((pct, i) => ({
    place: i + 1,
    amount: Math.round(amount * pct),
  }));
}

type TournamentStatus = TournamentType["status"];

type TournamentLike = {
  status: TournamentStatus;
  start_date: string | null;
};

const STATUS_PRIORITY: Record<TournamentStatus, number> = {
  active: 0,
  registration: 1,
  upcoming: 2,
  draft: 3,
  completed: 4,
  cancelled: 5,
};

export function sortTournaments<T extends TournamentLike>(
  tournaments: T[],
): T[] {
  return [...tournaments].sort((a, b) => {
    const statusDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];

    if (statusDiff !== 0) return statusDiff;

    const timeA = a.start_date ? Date.parse(a.start_date) : Infinity;
    const timeB = b.start_date ? Date.parse(b.start_date) : Infinity;

    return timeA - timeB;
  });
}
