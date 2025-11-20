import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Trophy, Calendar, Users, Crown, Home, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Navigation } from "@/components/navigation";

export default async function Tournaments() {
  const supabase = await createClient();
  const { data: tournaments } = await supabase.from("tournament").select();

  console.log(tournaments);

  const upcomingTournaments = [
    {
      title: "Georgian Winter Championship 2024",
      date: "December 15, 2024",
      prize: "500 GEL",
      participants: "32 Players",
      format: "1v1 Single Elimination",
      status: "Open",
    },
    {
      title: "Team Championship",
      date: "December 22, 2024",
      prize: "800 GEL",
      participants: "16 Teams",
      format: "4v4 Team Games",
      status: "Open",
    },
    {
      title: "New Year Cup",
      date: "January 5, 2025",
      prize: "1000 GEL",
      participants: "64 Players",
      format: "1v1 Double Elimination",
      status: "Coming Soon",
    },
  ];

  const pastTournaments = [
    {
      title: "Autumn Championship 2024",
      date: "November 10, 2024",
      winner: "Purple",
      prize: "500 GEL",
      participants: "32 Players",
    },
    {
      title: "Summer Cup 2024",
      date: "August 20, 2024",
      winner: "Purple",
      prize: "400 GEL",
      participants: "24 Players",
    },
    {
      title: "Spring Open 2024",
      date: "May 15, 2024",
      winner: "Purple",
      prize: "600 GEL",
      participants: "40 Players",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl text-center space-y-4">
          <Trophy className="w-16 h-16 text-primary mx-auto animate-fade-in" />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            ტურნირები
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            შეერკინე საუკეთესო მოთამაშეებს და დაიმკვიდრე შენი ადგილი ისტორიაში!
          </p>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              მომავალი ტურნირები
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTournaments.map((tournament, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all hover-scale"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={
                        tournament.status === "Open" ? "default" : "secondary"
                      }
                    >
                      {tournament.status}
                    </Badge>
                    <Trophy className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{tournament.title}</CardTitle>
                  <CardDescription className="space-y-2 text-base">
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Calendar className="w-4 h-4" />
                      {tournament.date}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Users className="w-4 h-4" />
                      {tournament.participants}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">ფორმატი</p>
                    <p className="font-semibold">{tournament.format}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      საპრიზო ფონდი
                    </p>
                    <p className="text-2xl font-bold text-secondary">
                      {tournament.prize}
                    </p>
                  </div>
                  <Button
                    className="w-full gap-2"
                    disabled={tournament.status !== "Open"}
                  >
                    {tournament.status === "Open"
                      ? "Register Now"
                      : "Coming Soon"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
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
            {pastTournaments.map((tournament, index) => (
              <Card
                key={index}
                className="border-2 hover:border-accent/50 transition-all"
              >
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Tournament
                      </p>
                      <p className="font-bold text-lg">{tournament.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-semibold">{tournament.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Champion
                      </p>
                      <div className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-accent" />
                        <p className="font-bold text-accent">
                          {tournament.winner}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Prize
                      </p>
                      <p className="text-xl font-bold text-secondary">
                        {tournament.prize}
                      </p>
                    </div>
                    <div className="text-right">
                      <Link href={`/tournaments/${index + 1}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2024 Georgian AoE II Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
