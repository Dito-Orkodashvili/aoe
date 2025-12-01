import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TTournament } from "@/lib/types/tournament.types";

interface TournamentCardProps {
  tournament: TTournament;
}

export const TournamentCard = ({ tournament }: TournamentCardProps) => {
  return (
    <Card className="border-2 hover:border-accent/50 transition-all">
      <CardContent>
        <div className="grid md:grid-cols-5 gap-4 items-center">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Tournament</p>
            <p className="font-bold text-lg">{tournament.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Date</p>
            <p className="font-semibold">{formatDate(tournament.created_at)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Champion</p>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-accent" />
              <p className="font-bold text-accent">TBD</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Prize</p>
            <p className="text-xl font-bold text-secondary">
              {tournament.prize_pool} GEL
            </p>
          </div>
          <div className="text-right">
            <Link href={`/tournaments/${tournament.slug}`}>
              <Button variant="outline" size="sm" className="gap-2">
                View Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
