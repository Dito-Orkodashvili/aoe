import { format, formatDistanceToNow, isValid } from "date-fns";
import { ka } from "date-fns/locale";

function parseDate(date: string | null | undefined) {
  if (!date) return null;

  const parsed = new Date(date);

  if (!isValid(parsed)) {
    console.error("Invalid date passed to formatDateTime:", date);
    return null;
  }

  return parsed;
}

export function formatDate(date: string | null | undefined) {
  const parsed = parseDate(date);

  if (!parsed) return date;

  return format(parsed, "dd MMM yyyy");
}

export function formatDateTime(date?: string | null) {
  const parsed = parseDate(date);

  if (!parsed) return date;

  return format(parsed, "dd MMM yyyy, HH:mm");
}

export function timeAgoFromISO(isoDate: string | null | undefined): string {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "";

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ka,
  });
}

export function getDurationSeconds(
  started?: string | null,
  finished?: string | null,
): number | null {
  if (!started || !finished) return null;

  const start = Date.parse(started);
  const end = Date.parse(finished);

  if (Number.isNaN(start) || Number.isNaN(end)) return null;

  return Math.max(0, Math.floor((end - start) / 1000));
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return `${m}:${String(s).padStart(2, "0")}`;
}
