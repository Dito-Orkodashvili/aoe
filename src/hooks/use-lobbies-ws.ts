import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  LobbyMessage,
  LobbySlots,
  TransformedLobbyMatch,
  TransformedLobbySlot,
} from "@/lib/types/lobby.types";
import { addLobbyListener, wsSend } from "@/lib/ws/aoe2lobby-ws-manager";
import { TPlayer } from "@/lib/types/player.types";

const now = () => Date.now();

export function useLobbiesWs() {
  const [matches, setMatches] = useState<TransformedLobbyMatch[]>([]);
  const matchesRef = useRef<Record<string, TransformedLobbyMatch>>({});
  const flushTimer = useRef<NodeJS.Timeout | null>(null);

  const applySlots = (
    slots: LobbySlots | undefined | null,
  ): TransformedLobbySlot[] => {
    if (!slots) return [];

    return Object.entries(slots).map(([key, slot]) => ({
      profileId: key,
      ...slot,
    }));
  };

  const applyMessage = useCallback((msg: LobbyMessage) => {
    if (msg.lobby_match_all) {
      Object.entries(msg.lobby_match_all).forEach(([id, match]) => {
        const players = applySlots(match.slots);

        matchesRef.current[id] = {
          lobbyId: id,
          players,
          ...match,
          isGeorgianParticipating: players.some((p) => p.country === "ge"),
          lastUpdated: now(),
        };
      });
    }

    if (msg.lobby_match_update) {
      Object.entries(msg.lobby_match_update).forEach(([id, match]) => {
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

    if (msg.lobby_match_remove) {
      msg.lobby_match_remove.forEach((id) => {
        delete matchesRef.current[id];
      });
    }

    if (msg.lobby_player_remove) {
      msg.lobby_player_remove.forEach((playerId) => {
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
      const sorted = Object.values(matchesRef.current).sort(
        (a, b) => b.lastUpdated - a.lastUpdated,
      );

      setMatches(sorted);
    }, 120);
  }, []);

  useEffect(() => {
    wsSend({
      action: "subscribe",
      type: "matches",
      context: "lobby",
    });

    const removeListener = addLobbyListener(applyMessage);

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
