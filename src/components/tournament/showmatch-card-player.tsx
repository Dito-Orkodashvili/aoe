import {
  TournamentMatchType,
  TournamentPlayerType,
} from "@/lib/types/tournament.types";
import { Crown, Minus, Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, getCivById } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { startTransition, useState } from "react";
import { updateShowmatchScore } from "@/app/tournaments/actions";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface ShowmatchCardPlayerProps {
  player: TournamentPlayerType;
  matchId: string;
  winner: boolean;
  status: TournamentMatchType["status"];
  initialScore: number;
  bestOf: number;
  side: "p1" | "p2";
  canUpdateScore: boolean;
}
export const ShowmatchCardPlayer = ({
  player,
  matchId,
  status,
  winner,
  bestOf,
  side,
  initialScore,
  canUpdateScore,
}: ShowmatchCardPlayerProps) => {
  const [score, setScore] = useState(initialScore);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const updateScore = (delta: 1 | -1) => {
    const optimistic = score + delta;

    const isScoreMax = score >= Math.ceil(bestOf / 2);
    if (optimistic < 0 || isPending || (delta === 1 && isScoreMax)) return;

    setScore(optimistic);
    setIsPending(true);

    startTransition(async () => {
      const res = await updateShowmatchScore({
        matchId,
        side,
        delta,
      });

      setIsPending(false);

      if (!res.ok) {
        setScore(score);
        toast({
          title: "შეცდომა",
          description: res.error.message,
          variant: "destructive",
        });
      }
    });
  };

  const isP1 = side === "p1";

  return (
    <div className="flex-1 text-center">
      <div className="relative inline-block">
        <div
          className={cn(
            "w-30 h-30 md:w-34 md:h-34 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 transition-all flex items-center justify-center mx-auto mb-3",
            isP1 ? "border-primary/30" : "border-secondary/30",
            isP1 ? "hover:border-secondary/30" : "hover:border-primary/30",
          )}
        >
          <Link
            href={`/players/${player.id}`}
            className="text-lg md:text-xl font-bold text-foreground block"
          >
            {player.picture_url ? (
              <img
                src={player.picture_url}
                alt={player.nickname}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-20 h-20 md:w-22 md:h-22 text-primary/50" />
            )}
          </Link>
        </div>
        {status === "completed" && winner && (
          <Crown className="absolute -top-2 -right-2 w-6 h-6 text-amber-500" />
        )}
      </div>
      <Link
        href={`/players/${player.id}`}
        className="text-lg md:text-xl font-bold text-foreground block"
      >
        {player.nickname}
      </Link>

      {player.tournament_elo && (
        <p className="text-sm text-muted-foreground">
          სატურნირო რეიტინგი: {player.tournament_elo}
        </p>
      )}
      {player.fav_civ && (
        <Badge variant={isP1 ? "destructive" : "secondary"} className="mt-2">
          {getCivById(player.fav_civ)?.name}
        </Badge>
      )}

      <div className="flex gap-4 justify-center items-center  mt-3">
        {canUpdateScore && (
          <Button
            className="rounded-full size-6"
            size="icon"
            onClick={() => updateScore(-1)}
            disabled={isPending || !canUpdateScore}
          >
            <Minus />
          </Button>
        )}
        <p
          className={cn(
            "text-3xl md:text-4xl font-bold",
            isP1 ? "text-primary" : "text-secondary",
          )}
        >
          {score}
        </p>
        {canUpdateScore && (
          <Button
            className="rounded-full size-6"
            size="icon"
            onClick={() => updateScore(1)}
            disabled={isPending || !canUpdateScore}
          >
            <Plus />
          </Button>
        )}
      </div>
    </div>
  );
};
