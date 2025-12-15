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
