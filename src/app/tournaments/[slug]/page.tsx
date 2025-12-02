import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Calendar, Target, Trophy, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrizePoolInfo } from "@/components/prize-pool-info";
import { TournamentInfo } from "@/components/tournament-info";
import { ParticipantsInfo } from "@/components/participants-info";
import { notFound } from "next/navigation";
import { getTournamentDetails } from "@/lib/supabase/tournament/get-tournament-details";
import { formatDate } from "@/lib/utils";
import { MatchCard } from "@/components/match-card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/hero";

const TournamentDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const tournament = await getTournamentDetails(slug);
  console.log("tournament: ", tournament);
  if (!tournament) {
    notFound();
  }

  const isShowmatch = tournament.max_participants === 2;

  return (
    <>
      <PageHero>
        <div className="flex justify-center mb-6">
          <Trophy className="w-16 h-16 text-primary mx-auto animate-fade-in" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
          {tournament.name}
        </h1>
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(tournament.created_at)}
            </div>{" "}
            |
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {tournament.max_participants} Players
            </div>{" "}
            |
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {isShowmatch ? "Showmatch" : tournament.format}
            </div>
          </div>
        </div>
        <Badge variant="destructive" className="animate-pulse">
          მიმდინარე
        </Badge>
      </PageHero>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            {isShowmatch ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-primary" />
                    Current Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-lg min-w-md">
                    <MatchCard match={tournament.matches[0]} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div></div>
              // <PlayoffBrackets />
            )}
          </div>
          <Card className="p-4">
            <Tabs defaultValue="prize-pool" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="prize-pool">Info</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
              </TabsList>

              <TabsContent value="prize-pool" className="space-y-8 flex gap-4">
                <TournamentInfo tournament={tournament} />
                {tournament.prize_pool && (
                  <PrizePoolInfo
                    prize={tournament.prize_pool}
                    participantsCount={tournament.participants.length}
                  />
                )}
              </TabsContent>

              <TabsContent value="participants">
                <ParticipantsInfo participants={tournament.participants} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>

      {/* Tournament Stats */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Tournament Statistics
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {tournament.participants.length}
                </p>
                <p className="text-muted-foreground">Total Players</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-secondary mb-2">
                  {tournament.matches.length}
                </p>
                <p className="text-muted-foreground">Matches Played</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-accent mb-2">
                  {tournament.prize_pool} GEL
                </p>
                <p className="text-muted-foreground">Prize Pool</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default TournamentDetails;
