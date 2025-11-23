import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Target, Trophy, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hero } from "@/components/sections/hero";
import { PlayoffBrackets } from "@/components/playoff-brackets";
import { PrizePoolInfo } from "@/components/prize-pool-info";
import { TournamentInfo } from "@/components/tournament-info";
import { ParticipantsInfo } from "@/components/participants-info";

const TournamentDetails = () => {
  const tournament = {
    title: "Autumn Championship 2024",
    date: "November 10, 2024",
    winner: "Purple",
    prize: "500 GEL",
    participants: 32,
    format: "1v1 Single Elimination",
    map: "Arabia",
  };

  return (
    <>
      <Hero>
        <div className="flex justify-center mb-6">
          <Trophy className="w-16 h-16 text-primary mx-auto animate-fade-in" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
          {tournament.title}
        </h1>
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {tournament.date}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {tournament.participants} Players
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {tournament.format}
            </div>
          </div>
        </div>
      </Hero>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="prize-pool" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="prize-pool">Prize Pool</TabsTrigger>
              <TabsTrigger value="format">Format</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
            </TabsList>

            <TabsContent value="prize-pool" className="space-y-8">
              <PrizePoolInfo />
            </TabsContent>

            <TabsContent value="format">
              <TournamentInfo />
            </TabsContent>

            <TabsContent value="participants">
              <ParticipantsInfo />
            </TabsContent>
          </Tabs>

          <PlayoffBrackets />
        </div>
      </section>

      {/* Tournament Stats */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Tournament Statistics
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">32</p>
                <p className="text-muted-foreground">Total Players</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-secondary mb-2">31</p>
                <p className="text-muted-foreground">Matches Played</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-accent mb-2">500</p>
                <p className="text-muted-foreground">Prize Pool (GEL)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">8h</p>
                <p className="text-muted-foreground">Duration</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default TournamentDetails;
