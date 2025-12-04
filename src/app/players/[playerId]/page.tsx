import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  Swords,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { getPlayerDetails } from "@/lib/supabase/player/get-player-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  getPlayerOfficialStats,
  mergePlayerWithStats,
} from "@/lib/supabase/player/get-player-official-stats";

const recentMatches = [
  {
    opponent: "Hera",
    result: "win",
    map: "Arabia",
    date: "2024-01-15",
    elo: "+12",
  },
  {
    opponent: "Liereyy",
    result: "win",
    map: "Arena",
    date: "2024-01-14",
    elo: "+10",
  },
  {
    opponent: "TaToH",
    result: "loss",
    map: "Nomad",
    date: "2024-01-13",
    elo: "-8",
  },
  {
    opponent: "DauT",
    result: "win",
    map: "Arabia",
    date: "2024-01-12",
    elo: "+15",
  },
  {
    opponent: "MbL",
    result: "win",
    map: "Black Forest",
    date: "2024-01-11",
    elo: "+9",
  },
];

const civilizationStats = [
  { name: "Vikings", games: 320, winRate: 82 },
  { name: "Mongols", games: 280, winRate: 76 },
  { name: "Mayans", games: 245, winRate: 74 },
  { name: "Chinese", games: 198, winRate: 71 },
  { name: "Britons", games: 167, winRate: 69 },
];

const achievements = [
  {
    title: "Red Bull Wololo Champion",
    description: "Won the 2023 Red Bull Wololo tournament",
    date: "2023-09-20",
  },
  {
    title: "Hidden Cup 4 Winner",
    description: "First place in Hidden Cup 4",
    date: "2022-05-15",
  },
  {
    title: "King of the Desert",
    description: "Champion of KotD5",
    date: "2023-03-10",
  },
];

const PlayerDetails = async ({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) => {
  const { playerId } = await params;

  const player = await getPlayerDetails(playerId);
  const { steam_id } = player || {};

  let playerStats = null;

  if (steam_id) {
    const playerOfficialStats = await getPlayerOfficialStats(steam_id);

    playerStats = mergePlayerWithStats(player, playerOfficialStats);
  }

  const {
    one_v_one_stats,
    fav_civ,
    nickname,
    created_at,
    aoe_profile_id,
    name,
    league,
    picture_url,
    region,
  } = playerStats || {};

  let total1v1Games = 0;
  let winRate = 0;

  if (one_v_one_stats?.wins && one_v_one_stats?.losses) {
    total1v1Games = one_v_one_stats.wins + one_v_one_stats.losses;
    winRate = Math.floor((one_v_one_stats.wins / total1v1Games) * 100);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/players"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Players
      </Link>

      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl" />
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-primary/20">
                  <AvatarImage
                    src={picture_url ?? ""}
                    alt={nickname}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-none text-4xl">
                    {nickname
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-medieval">
                  {nickname}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{name}</p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    {region}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    Team ???
                  </div>
                  {created_at && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Playing since {format(created_at, "yyyy")}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {one_v_one_stats?.rating || "N/A"}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {one_v_one_stats?.highestrating ?? "N/A"}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {fav_civ}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Swords className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">
              {total1v1Games}
            </p>
            <p className="text-sm text-muted-foreground">Total Games</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">{winRate}%</p>
            <p className="text-sm text-muted-foreground">Win Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">
              {one_v_one_stats?.streak ?? 0}
            </p>
            <p className="text-sm text-muted-foreground">Win Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">???</p>
            <p className="text-sm text-muted-foreground">Avg Game</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="matches">Recent Matches</TabsTrigger>
          <TabsTrigger value="civilizations">Civilizations</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Recent Match History</CardTitle>
            </CardHeader>
            <CardContent>
              {recentMatches.length > 0 ? (
                <div className="space-y-3">
                  {recentMatches.map((match, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        match.result === "win"
                          ? "bg-green-500/10 border-green-500/20"
                          : "bg-red-500/10 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            match.result === "win" ? "default" : "destructive"
                          }
                        >
                          {match.result === "win" ? "W" : "L"}
                        </Badge>
                        <div>
                          <p className="font-medium text-foreground">
                            vs {match.opponent}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {match.map}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${match.result === "win" ? "text-green-500" : "text-red-500"}`}
                        >
                          {match.elo}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {match.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No recent matches
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="civilizations">
          <Card>
            <CardHeader>
              <CardTitle>Civilization Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              {civilizationStats.length > 0 ? (
                <div className="space-y-6">
                  {civilizationStats.map((civ, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">
                          {civ.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {civ.games} games • {civ.winRate}% win rate
                        </span>
                      </div>
                      <Progress value={civ.winRate} className="h-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No civilization data
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10"
                    >
                      <Trophy className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No achievements yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default PlayerDetails;
