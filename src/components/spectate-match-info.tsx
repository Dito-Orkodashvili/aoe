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
import { TransformedSpectateMatch } from "@/lib/types/lobby.types";
import { usePlayersOfficialStats } from "@/hooks/query/use-players-official-stats";
import { useState } from "react";
import { mergeLobbyPlayersWithStats } from "@/lib/supabase/player/get-players-official-stats";
import ReactCountryFlag from "react-country-flag";

interface SpectateMatchInfoProps {
  match: TransformedSpectateMatch;
}

export const SpectateMatchInfo = ({ match }: SpectateMatchInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredPlayers = match.players.filter((player) =>
    Boolean(player.profileid),
  );
  const playerIds = filteredPlayers.map((player) => player.profileid);

  const {
    data: userStats,
    isLoading,
    isError,
  } = usePlayersOfficialStats(playerIds, {
    enabled: isOpen,
  });

  const mergedPlayers = mergeLobbyPlayersWithStats(filteredPlayers, userStats);

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
          {filteredPlayers.length}
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-80" align="start" style={{ zIndex: 9999 }}>
          <div className="space-y-3 bg-background p-4 rounded-md">
            <h4 className="font-semibold text-sm border-b pb-2">
              Players in Match
            </h4>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : isError ? (
              <p>Error loading players</p>
            ) : (
              <div className="space-y-2">
                {mergedPlayers.map((player) => (
                  <div
                    key={player.profileid}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                  >
                    <div className="flex gap-2 items-center">
                      <a
                        href={`https://www.ageofempires.com/stats/?profileId=${player.profileid}&game=age2`}
                        className="font-medium text-sm hover:underline"
                        about="_blank"
                      >
                        {player.name}
                      </a>
                      {player.country && (
                        <p className="text-xs text-muted-foreground">
                          <ReactCountryFlag
                            className="text-sm"
                            countryCode={player.country.toUpperCase()}
                            aria-label={player.country}
                            title={player.country}
                            svg
                          />
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {player.one_v_one_stats?.rating ? (
                        <span className="font-bold">
                          {player.one_v_one_stats?.rating}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
