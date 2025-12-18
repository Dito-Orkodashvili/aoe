import { AoeCompanionCivStatsResponse } from "@/lib/aoe2companion.types";

type CacheEntry<T> = {
  value: T;
  fetchedAt: number;
};

const valueCache = new Map<string, CacheEntry<any>>();
const throttleMap = new Map<string, number>();

const WINDOW_MS = 30_000;

function canFetch(key: string) {
  const last = throttleMap.get(key) ?? 0;
  return Date.now() - last >= WINDOW_MS;
}

function getCached<T>(key: string): T | null {
  return valueCache.get(key)?.value ?? null;
}

function setCached<T>(key: string, value: T) {
  valueCache.set(key, {
    value,
    fetchedAt: Date.now(),
  });
  throttleMap.set(key, Date.now());
}

export async function getPlayerCivStats(
  profileId: string | null,
): Promise<AoeCompanionCivStatsResponse | null> {
  if (!profileId) return null;

  const key = `aoe:${profileId}`;

  // If throttled → return cached value
  if (!canFetch(key)) {
    return getCached(key);
  }

  const url = `https://data.aoe2companion.com/api/profiles/${profileId}?language=en&extend=stats&page=1`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 30 },
      headers: {
        "User-Agent": "aoe.ge (+https://aoe.ge)",
      },
    });

    if (!res.ok) {
      // fallback to cache on API failure
      return getCached(key);
    }

    const data = await res.json();

    setCached(key, data);
    return data;
  } catch (err) {
    console.error(err);
    return getCached(key);
  }
}
