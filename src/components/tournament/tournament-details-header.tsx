import { TournamentDetailsType } from "@/lib/types/tournament.types";
import { Calendar, CircleDollarSign, Swords, Users } from "lucide-react";
import { TournamentStatus } from "./tournament-status";
import { formatDate } from "@/lib/utils";

interface TournamentDetailsHeaderProps {
  tournament: TournamentDetailsType;
}

export const TournamentDetailsHeader = ({
  tournament,
}: TournamentDetailsHeaderProps) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 px-4 flex items-center bg-hero bg-[url(/aoe/aoe_page_hero_bg.jpeg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
            {tournament.title}
          </h1>
          <p className="max-w-xl mx-auto">{tournament.description}</p>
          <div className="flex w-full justify-center">
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {tournament.start_date
                  ? formatDate(tournament.start_date)
                  : "Unknown"}
              </div>{" "}
              |
              <div className="flex items-center gap-2">
                <CircleDollarSign className="w-4 h-4" />
                {tournament.prize_pool}$
              </div>{" "}
              |
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {tournament.max_participants} Players
              </div>{" "}
              |
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4" />
                {tournament.team_size} vs {tournament.team_size}
              </div>
            </div>
          </div>
          <div>
            <TournamentStatus status={tournament.status} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
