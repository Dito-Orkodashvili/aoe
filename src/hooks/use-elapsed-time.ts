import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

export function useElapsedTime(matchStartTimestamp: number) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const startMs =
      matchStartTimestamp < 10_000_000_000
        ? matchStartTimestamp * 1000
        : matchStartTimestamp;

    const update = () => {
      const d = intervalToDuration({
        start: startMs,
        end: Date.now(),
      });

      const hours = d.hours ?? 0;
      const minutes = d.minutes ?? 0;
      const seconds = d.seconds ?? 0;

      const hh = hours.toString().padStart(2, "0");
      const mm = minutes.toString().padStart(2, "0");
      const ss = seconds.toString().padStart(2, "0");

      setElapsed(hours > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [matchStartTimestamp]);

  return elapsed;
}
