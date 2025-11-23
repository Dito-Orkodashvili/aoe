import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { clsx } from "clsx";

interface Match {
  player1: string;
  player2: string;
  score1: number;
  score2: number;
}

interface MatchCardProps {
  match?: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  return (
    <Card className="hover:border-primary/50 transition-all mb-4 py-2">
      <CardContent className="p-0">
        <div className="flex justify-between items-center gap-4 relative">
          <div className="flex-1">
            <PlayerRow
              score={match?.score1 ?? 0}
              player={match?.player1 ?? "TBD"}
              isWinning={Boolean(match && match.score1 > match.score2)}
            />
            <hr className="h-px my-2 bg-border border-0" />
            <PlayerRow
              score={match?.score2 ?? 0}
              player={match?.player2 ?? "TBD"}
              isWinning={Boolean(match && match.score2 > match.score1)}
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
