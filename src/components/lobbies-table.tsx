"use client";

import { Filter, Info, ShieldCheck, ShieldX, Swords } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useLobbiesWs } from "@/hooks/use-lobbies-ws";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PopoverTrigger } from "@/components/ui/popover";
import { GAME_MODE } from "@/lib/utils/lobby.utils";
import { EGameMode } from "@/lib/types/lobby.types";
import { TPlayer } from "@/lib/types/player.types";
import { clsx } from "clsx";

interface LobbiesTableProps {
  players: TPlayer[];
}

export const LobbiesTable = ({ players }: LobbiesTableProps) => {
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  // const { data: liveGames, isLoading, error } = useLiveGames();

  const { matches } = useLobbiesWs(players);

  const filteredMatches = matches.filter(
    (match) =>
      !match.antiquity_mode &&
      !match.cheats &&
      !match.full_tech_tree &&
      !match.ew_mode &&
      match.open_slots,
  );

  console.log("Lobby Matches:", matches);
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <Select value={modeFilter} onValueChange={setModeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Match Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="ranked">Ranked</SelectItem>
            <SelectItem value="unranked">Unranked</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Team Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="1v1">1v1</SelectItem>
            <SelectItem value="team">Team Game</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Details</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Lobby</TableHead>
              <TableHead>Map</TableHead>
              <TableHead>Slots</TableHead>
              <TableHead className="w-8 text-center">Password</TableHead>
              <TableHead className="w-8 text-center">Join</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatches.map((match) => (
              <TableRow key={match.lobbyId}>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={clsx(
                          match.isGeorgianParticipating &&
                            "text-secondary animate-pulse",
                        )}
                      >
                        <Info />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                      <div className="space-y-3 bg-background p-4 rounded-md">
                        <h4 className="font-semibold text-sm border-b pb-2">
                          Players in Match
                        </h4>
                        <div className="space-y-2">
                          {match.players.map((player) => (
                            <div
                              key={player.profileId}
                              className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                            >
                              <div>
                                <p className="font-medium text-sm">
                                  {player.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {player.civilization}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {player.country}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>{GAME_MODE[match.mode as EGameMode]}</TableCell>
                <TableCell>{match.description}</TableCell>
                <TableCell className="font-medium">{match.map_name}</TableCell>
                <TableCell>{`${match.slots_taken}/${match.slots_total}`}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {match.password ? <ShieldCheck /> : <ShieldX />}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    disabled={match.observable}
                  >
                    <a href={`aoe2de://0/${match.lobbyId}`} target={`_blank`}>
                      <Swords className="h-4 w-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <Swords className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Ongoing Matches</h3>
          <p className="text-muted-foreground">
            There are no matches currently in progress
          </p>
        </div>
      )}
    </div>
  );
};
