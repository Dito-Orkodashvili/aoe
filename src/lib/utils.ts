import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export function slugify(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: string | null | undefined) {
  if (!date) return null;
  return format(new Date(date), "dd MMM yyyy");
}

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
