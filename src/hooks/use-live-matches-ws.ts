import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SpectateMessage,
  SpectateSlots,
  TransformedSpectateMatch,
  TransformedSpectateSlot,
} from "@/lib/types/lobby.types";
import { addSpectateListener, wsSend } from "@/lib/ws/aoe2lobby-ws-manager";

const now = () => Date.now();

export function useLiveMatchesWs() {
  const [matches, setMatches] = useState<TransformedSpectateMatch[]>([]);
  const matchesRef = useRef<Record<string, TransformedSpectateMatch>>({});
  const flushTimer = useRef<NodeJS.Timeout | null>(null);

  const applySlots = (
    slots: SpectateSlots | undefined | null,
  ): TransformedSpectateSlot[] => {
    if (!slots) return [];

    return Object.entries(slots).map(([key, slot]) => ({
      profileId: key,
      ...slot,
    }));
  };

  const applyMessage = useCallback((msg: SpectateMessage) => {
    if (msg.spectate_match_all) {
      Object.entries(msg.spectate_match_all).forEach(([id, match]) => {
        const players = applySlots(match.slots);
        matchesRef.current[id] = {
          matchId: id,
          players,
          ...match,
          isGeorgianParticipating: players.some((p) => p.country === "ge"),
          lastUpdated: now(),
        };
      });
    }

    if (msg.spectate_match_update) {
      Object.entries(msg.spectate_match_update).forEach(([id, match]) => {
        const prev = matchesRef.current[id];

        if (!prev) return;

        const players = match.slots ? applySlots(match.slots) : prev.players;

        matchesRef.current[id] = {
          ...prev,
          ...match,
          players,
          isGeorgianParticipating: players.some((p) => p.country === "ge"),
          lastUpdated: now(),
        };
      });
    }

    if (msg.spectate_match_remove) {
      msg.spectate_match_remove.forEach((id) => {
        delete matchesRef.current[id];
      });
    }

    if (msg.spectate_player_remove) {
      msg.spectate_player_remove.forEach((playerId) => {
        for (const match of Object.values(matchesRef.current)) {
          const before = match.players.length;
          match.players = match.players.filter(
            (p) => String(p.profileid) !== String(playerId),
          );

          match.isGeorgianParticipating = match.players.some(
            (p) => p.country === "ge",
          );

          if (match.players.length !== before) {
            match.lastUpdated = now();
          }
        }
      });
    }

    if (flushTimer.current) {
      clearTimeout(flushTimer.current);
    }

    flushTimer.current = setTimeout(() => {
      const sorted = Object.values(matchesRef.current).sort((a, b) => {
        if (a.isGeorgianParticipating && !b.isGeorgianParticipating) return -1;
        if (!a.isGeorgianParticipating && b.isGeorgianParticipating) return 1;

        return b.lastUpdated - a.lastUpdated;
      });

      setMatches(sorted);
    }, 120);
  }, []);

  useEffect(() => {
    wsSend({ action: "subscribe", type: "matches", context: "spectate" });

    const removeListener = addSpectateListener(applyMessage);

    return () => {
      if (flushTimer.current) clearTimeout(flushTimer.current);
      removeListener();
    };
  }, [applyMessage]);

  return useMemo(
    () => ({
      matches,
    }),
    [matches],
  );
}
