import { format, isValid } from "date-fns";

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
