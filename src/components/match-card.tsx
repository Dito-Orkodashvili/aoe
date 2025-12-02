import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { clsx } from "clsx";
import { TTournamentInfo } from "@/lib/supabase/tournament/get-tournament-details";

interface MatchCardProps {
  match?: TTournamentInfo["matches"][0];
}

export const MatchCard = ({ match }: MatchCardProps) => {
  if (!match) return <p>Match not found!</p>;

  const { player1, player2, player1_score, player2_score } = match;

  const isPlayer1Winning = Boolean(
    player1_score && player2_score && player1_score > player2_score,
  );
  const isPlayer2Winning = Boolean(
    player1_score && player2_score && player2_score > player1_score,
  );

  return (
    <Card className="hover:border-primary/50 transition-all py-2">
      <CardContent className="p-0">
        <div className="flex justify-between items-center gap-4 relative">
          <div className="flex-1">
            <PlayerRow
              score={player1_score ?? 0}
              player={player1?.nickname ?? "TBD"}
              isWinning={isPlayer1Winning}
            />
            <hr className="h-px my-2 bg-border border-0" />
            <PlayerRow
              score={player2_score ?? 0}
              player={player2?.nickname ?? "TBD"}
              isWinning={isPlayer2Winning}
            />
          </div>
          <div className="absolute right-14 h-full flex items-center">
            <Tooltip>
              <TooltipTrigger>
                <span className="bg-card block">
                  <Info className="text-secondary" size={18} />
                </span>
              </TooltipTrigger>
              <TooltipContent>Match Details</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PlayerRow = ({
  player,
  score,
  isWinning,
}: {
  player: string;
  score: number;
  isWinning: boolean;
}) => {
  return (
    <div className="flex items-center pl-4">
      <p
        className={clsx(
          `text-md flex-1 border-r-1 border-border`,
          isWinning ? "text-primary" : "text-muted-foreground",
        )}
      >
        {player}
      </p>
      <div className="px-4">
        <Badge
          variant={isWinning ? "default" : "outline"}
          className="w-8 flex justify-center"
        >
          {score}
        </Badge>
      </div>
    </div>
  );
};
