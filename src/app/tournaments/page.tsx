import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, Crown, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/sections/hero";
import { TournamentCard } from "@/components/tournament/tournament-card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { getTournamentsFilled } from "@/lib/supabase/tournament/get-tournaments-filled";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Tournaments() {
  const tournaments = await getTournamentsFilled();

  const ongoingTournaments = tournaments
    .filter((tournament) => ["active", "upcoming"].includes(tournament.status))
    .sort((a, b) => (a.status === "active" ? -1 : 1));

  const pastTournaments = tournaments.filter(
    (tournament) => tournament.status === "completed",
  );

  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <Trophy className="w-16 h-16 text-primary mx-auto animate-fade-in" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
            ტურნირები
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
            შეერკინე საუკეთესო მოთამაშეებს და დაიმკვიდრე შენი ადგილი ისტორიაში!
          </p>
        </div>
      </PageHero>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              მიმდინარე და მომავალი ტურნირები
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingTournaments.map((tournament, index) => {
              const isActive = tournament.status === "active";
              const isShowmatch =
                tournament.stages.length === 1 &&
                tournament.stages[0].format === "showmatch";
              const player1 = tournament.participants[0].player;
              const player2 = tournament.participants[1].player;

              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary transition-all hover-scale"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant={isActive ? "destructive" : "secondary"}
                        className={cn(isActive && "animate-pulse")}
                      >
                        {isActive ? "მიმდინარე" : "მომავალი"}
                      </Badge>
                      <Trophy className="w-5 h-5 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">
                      {tournament.title}
                    </CardTitle>
                    <CardDescription className="space-y-2 text-base">
                      <div className="flex items-center gap-2 text-foreground/80 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(tournament.start_date)}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Users className="w-4 h-4" />
                      {tournament.participants.length}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        მონაწილეები
                      </p>
                      <div className="font-semibold flex gap-4 items-center">
                        <div className="relative">
                          <Link
                            href={`/players/${player1.id}`}
                            className="underline text-secondary"
                            title={player1.nickname}
                          >
                            <Avatar className="w-10 h-10 md:w-18 md:h-18 rounded-full object-cover border-1 border-primary/20">
                              <AvatarImage
                                src={
                                  player1.picture_url ??
                                  `/aoe/anonymous_player_${player1.gender}.webp`
                                }
                                alt={player1.nickname}
                                className="object-cover"
                              />
                              <AvatarFallback className="rounded-none text-4xl">
                                {player1.nickname
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                        </div>
                        <span className="text-md text-primary">VS</span>
                        <Link
                          href={`/players/${player2.id}`}
                          className="underline text-secondary"
                          title={player2.nickname}
                        >
                          <Avatar className="w-10 h-10 md:w-18 md:h-18 rounded-full object-cover border-1 border-primary/20">
                            <AvatarImage
                              src={
                                player2.picture_url ??
                                `/aoe/anonymous_player_${player2.gender}.webp`
                              }
                              alt={player2.nickname}
                              className="object-cover"
                            />
                            <AvatarFallback className="rounded-none text-4xl">
                              {player2.nickname
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">ფორმატი</p>
                      <p className="font-semibold">
                        {isShowmatch ? "შოუმატჩი" : "???"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        საპრიზო ფონდი
                      </p>
                      <p className="text-2xl font-bold text-secondary">
                        {tournament.prize_pool}$
                      </p>
                    </div>
                    <Button className="w-full gap-2" disabled={!isActive}>
                      {isActive ? "დეტალები" : "მალე დაიწყება"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Tournaments */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <Crown className="w-8 h-8 text-accent" />
            <h2 className="text-4xl font-bold text-foreground">
              Past Champions
            </h2>
          </div>

          <div className="space-y-4">
            {pastTournaments.length > 0 ? (
              pastTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))
            ) : (
              <p className="text-center text-muted-foreground my-4">
                No tournaments to show yet!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Tournament Rules */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Tournament Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>General Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  • All players must be registered members
                </p>
                <p className="text-muted-foreground">
                  • Standard AoE II competitive settings
                </p>
                <p className="text-muted-foreground">
                  • Fair play and sportsmanship required
                </p>
                <p className="text-muted-foreground">
                  • Discord required for communication
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Register</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  • Join our Discord server
                </p>
                <p className="text-muted-foreground">
                  • Fill out registration form
                </p>
                <p className="text-muted-foreground">• Wait for confirmation</p>
                <p className="text-muted-foreground">
                  • Check bracket before tournament
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
