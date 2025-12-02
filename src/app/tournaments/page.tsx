import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Crown, Trophy } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/sections/hero";
import { getTournaments } from "@/lib/supabase/tournament/get-tournaments";
import { TournamentCard } from "@/components/tournament-card";

export default async function Tournaments() {
  const tournaments = await getTournaments();

  const ongoingTournaments = tournaments.filter(
    (tournament) => tournament.status === "ongoing",
  );

  const upcomingTournaments = tournaments.filter(
    (tournament) => tournament.status === "upcoming",
  );

  const pastTournaments = tournaments.filter(
    (tournament) => tournament.status === "completed",
  );

  return (
    <>
      <PageHero>
        <div className="flex justify-center mb-6">
          <Trophy className="w-16 h-16 text-primary mx-auto animate-fade-in" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
          ტურნირები
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          შეერკინე საუკეთესო მოთამაშეებს და დაიმკვიდრე შენი ადგილი ისტორიაში!
        </p>
        <Button asChild>
          <Link href="/tournaments/create">შექმენი ტურნირი</Link>
        </Button>
      </PageHero>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              მიმდინარე ტურნირები
            </h2>
          </div>

          <div className="space-y-4">
            {ongoingTournaments.length > 0 ? (
              ongoingTournaments.map((tournament) => (
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
