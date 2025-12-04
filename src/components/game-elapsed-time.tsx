"use client";

import { useElapsedTime } from "@/hooks/use-elapsed-time";

export const GameElapsedTime = ({ startTime }: { startTime: number }) => {
  const elapsed = useElapsedTime(startTime);

  return <span>{elapsed}</span>;
};
