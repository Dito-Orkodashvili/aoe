"use client";

import { Clock, Eye, Filter, Map, Swords, Users } from "lucide-react";
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
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { GameElapsedTime } from "@/components/game-elapsed-time";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PopoverTrigger } from "@/components/ui/popover";
import { useLiveMatchesWs } from "@/hooks/use-live-matches-ws";
import { TPlayer } from "@/lib/types/player.types";
import { clsx } from "clsx";

interface LiveMatchesTableProps {
  players: TPlayer[];
}

export const LiveMatchesTable = ({ players }: LiveMatchesTableProps) => {
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { matches } = useLiveMatchesWs(players);

  const filteredMatches = matches.filter((match) =>
    Boolean(!match.antiquity_mode && !match.cheats && !match.full_tech_tree),
  );

  console.log("live matches:", matches);

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
              <TableHead>Players</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Elapsed
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  Map
                </div>
              </TableHead>
              <TableHead>Game ID</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="text-right">Spectate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatches.map((match) => (
              <TableRow key={match.matchId}>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Users
                          className={clsx(
                            "h-4 w-4 mr-2",
                            match.isGeorgianParticipating &&
                              "text-primary animate-pulse",
                          )}
                        />
                        {match.players.length}
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
                <TableCell>
                  <GameElapsedTime startTime={match.start_time} />
                </TableCell>
                <TableCell className="font-medium">{match.map_name}</TableCell>
                <TableCell>{match.matchid}</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    disabled={match.observable}
                  >
                    <a href={`aoe2de://1/${match.matchid}`} target={`_blank`}>
                      <Eye className="h-4 w-4" />
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
