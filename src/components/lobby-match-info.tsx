"use client";

import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Users } from "lucide-react";
import clsx from "clsx";
import { Badge } from "./ui/badge";
import { TransformedLobbyMatch } from "@/lib/types/lobby.types";
import { usePlayersOfficialStats } from "@/hooks/query/use-players-official-stats";
import { useState } from "react";
import { mergeLobbyPlayersWithStats } from "@/lib/supabase/player/get-players-official-stats";

interface LobbyMatchInfoProps {
  match: TransformedLobbyMatch;
}

export const LobbyMatchInfo = ({ match }: LobbyMatchInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const playerIds = match.players.map((player) => player.profileid);

  const { data: userStats } = usePlayersOfficialStats(playerIds, {
    enabled: isOpen,
  });

  const mergedPlayers = mergeLobbyPlayersWithStats(match.players, userStats);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Users
            className={clsx(
              "h-4 w-4 mr-2",
              match.isGeorgianParticipating && "text-primary animate-pulse",
            )}
          />
          {mergedPlayers.length}
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-80" align="start" style={{ zIndex: 9999 }}>
          <div className="space-y-3 bg-background p-4 rounded-md">
            <h4 className="font-semibold text-sm border-b pb-2">
              Players in Match
            </h4>
            <div className="space-y-2">
              {mergedPlayers.map((player) => (
                <div
                  key={player.profileid}
                  className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">{player.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {player.civilization}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {player.one_v_one_stats?.rating ?? "N/A"} ELO
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
