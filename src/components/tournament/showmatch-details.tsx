import { ShowmatchCard } from "@/components/tournament/showmatch-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Settings } from "lucide-react";
import { TournamentDetailsType } from "@/lib/types/tournament.types";
import { Badge } from "@/components/ui/badge";
import { getMapById } from "@/lib/utils";

interface ShowmatchDetailsProps {
  tournament: TournamentDetailsType;
}

export const ShowmatchDetails = ({ tournament }: ShowmatchDetailsProps) => {
  const {
    tournament_stages,
    tournament_participants,
    tournament_maps,
    status,
  } = tournament;

  const matches = tournament_stages[0]!.tournament_matches;
  const match = matches && matches[0];

  if (!match) {
    // TODO: show error
    return null;
  }

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <ShowmatchCard
        tournamentId={tournament.id}
        stages={tournament_stages}
        participants={tournament_participants}
        maps={tournament_maps}
        tournamentStatus={status}
      />

      <Card className="border-dashed border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5 text-muted-foreground" />
            მატჩის პარამეტრები
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                ფორმატი
              </p>
              <p className="text-foreground">Best of {match.best_of}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                რუკების რაოდენობა
              </p>
              <p className="text-foreground">{tournament_maps.length} რუკა</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                საპრიზო ფონდი
              </p>
              <p className="text-foreground">{tournament.prize_pool || "0"}$</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
