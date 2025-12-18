"use client";

import { Map as MapIcon, Swords } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TournamentDetailsType } from "@/lib/types/tournament.types";
import { getMapById } from "@/lib/utils";
import { ShowmatchStartButton } from "@/components/tournament/showmatch-start-button";
import { GlowingVs } from "@/components/tournament/glowing-vs";
import { ShowmatchCardPlayer } from "@/components/tournament/showmatch-card-player";

interface ShowmatchCardProps {
  tournamentId: string;
  stages: TournamentDetailsType["tournament_stages"];
  participants: TournamentDetailsType["tournament_participants"];
  maps: TournamentDetailsType["tournament_maps"];
  tournamentStatus: TournamentDetailsType["status"];
  onStartMatch?: () => void;
  isAdmin: boolean;
}
export const ShowmatchCard = ({
  tournamentId,
  stages,
  participants,
  maps,
  tournamentStatus,
  isAdmin,
}: ShowmatchCardProps) => {
  const matches = stages[0]!.tournament_matches;
  const match = matches && matches[0];

  if (!match) {
    // TODO: show error
    return null;
  }

  const [player1, player2] = participants;

  return (
    <Card className="border-2 border-primary/20 overflow-hidden pt-0 pb-4">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-primary" />
            მატჩი
          </CardTitle>
          <Badge variant="secondary">Best of {match.best_of}</Badge>
        </div>
      </div>
      <CardContent className="pt-6">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Player 1 */}
          <ShowmatchCardPlayer
            player={player1.player}
            status={match.status}
            matchId={match.id}
            side="p1"
            bestOf={match.best_of}
            initialScore={match.score_p1 ?? 0}
            winner={
              match.status === "completed" &&
              (match.score_p1 ?? 0) > (match.score_p2 ?? 0)
            }
            canUpdateScore={isAdmin}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted/50 border border-border flex items-center justify-center">
              <GlowingVs />
            </div>
            {match.status === "pending" && (
              <ShowmatchStartButton tournamentId={tournamentId} />
            )}
          </div>

          {/* Player 2 */}
          <ShowmatchCardPlayer
            player={player2.player}
            status={match.status}
            matchId={match.id}
            side="p2"
            bestOf={match.best_of}
            initialScore={match.score_p2 ?? 0}
            winner={
              match.status === "completed" &&
              (match.score_p2 ?? 0) > (match.score_p1 ?? 0)
            }
            canUpdateScore={isAdmin}
          />
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapIcon className="w-5 h-5 text-primary" />
            <div className="flex flex-wrap gap-2 w-full">
              {maps.map((map, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1.5">
                  {getMapById(map.map_id)?.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
