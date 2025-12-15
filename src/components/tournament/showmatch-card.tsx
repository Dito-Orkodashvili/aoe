import { Crown, Play, Swords, Map as MapIcon, User } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TournamentDetailsType } from "@/lib/types/tournament.types";
import { getCivById, getMapById } from "@/lib/utils";
import { ShowmatchStartButton } from "@/components/tournament/showmatch-start-button";

interface ShowmatchCardProps {
  tournamentId: string;
  stages: TournamentDetailsType["tournament_stages"];
  participants: TournamentDetailsType["tournament_participants"];
  maps: TournamentDetailsType["tournament_maps"];
  tournamentStatus: TournamentDetailsType["status"];
  onStartMatch?: () => void;
}
export const ShowmatchCard = ({
  tournamentId,
  stages,
  participants,
  maps,
  tournamentStatus,
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
          <div className="flex-1 text-center">
            <div className="relative inline-block">
              <div className="w-30 h-30 md:w-34 md:h-34 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center mx-auto mb-3">
                {player1.player.picture_url ? (
                  <img
                    src={player1.player.picture_url}
                    alt={player1.player.nickname}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-20 h-20 md:w-22 md:h-22 text-primary/50" />
                )}
              </div>
              {match.status === "completed" &&
                (match.score_p1 ?? 0) > (match.score_p2 ?? 0) && (
                  <Crown className="absolute -top-2 -right-2 w-6 h-6 text-amber-500" />
                )}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              {player1.player.nickname}
            </h3>
            {player1.player.tournament_elo && (
              <p className="text-sm text-muted-foreground">
                სატურნირო რეიტინგი: {player1.player.tournament_elo}
              </p>
            )}
            {player1.player.fav_civ && (
              <Badge variant="secondary" className="mt-2">
                {getCivById(player1.player.fav_civ)?.name}
              </Badge>
            )}

            <p className="text-3xl md:text-4xl font-bold text-primary mt-3">
              {match.score_p1 ?? 0}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-muted-foreground">
                VS
              </span>
            </div>
            {tournamentStatus === "draft" && (
              <ShowmatchStartButton tournamentId={tournamentId} />
            )}
          </div>

          {/* Player 2 */}
          <div className="flex-1 text-center">
            <div className="relative inline-block">
              <div className="w-30 h-30 md:w-34 md:h-34 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 flex items-center justify-center mx-auto mb-3">
                {player2.player.picture_url ? (
                  <img
                    src={player2.player.picture_url}
                    alt={player2.player.nickname}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-20 h-20 md:w-22 md:h-22 text-accent/50" />
                )}
              </div>
              {match.status === "completed" &&
                (match.score_p1 ?? 0) < (match.score_p2 ?? 0) && (
                  <Crown className="absolute -top-2 -right-2 w-6 h-6 text-amber-500" />
                )}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              {player2.player.nickname}
            </h3>
            {player2.player.tournament_elo && (
              <p className="text-sm text-muted-foreground">
                სატურნირო რეიტინგი: {player2.player.tournament_elo}
              </p>
            )}
            {player2.player.fav_civ && (
              <Badge variant="secondary" className="mt-2">
                {getCivById(player2.player.fav_civ)?.name}
              </Badge>
            )}
            <p className="text-3xl md:text-4xl font-bold text-accent mt-3">
              {match.score_p2 ?? 0}
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapIcon className="w-5 h-5 text-primary" />
            <div className="flex flex-wrap gap-2 justify-center w-full">
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
