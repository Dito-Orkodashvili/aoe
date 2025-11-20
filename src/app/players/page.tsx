import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/navigation";
import { Trophy, Target, Swords } from "lucide-react";

const players = [
    {
        id: 1,
        name: "Purple",
        nickname: "Purple",
        elo: 2150,
        rank: 1,
        favoriteCiv: "Franks",
        winRate: 68,
        totalGames: 450,
        image: "players/purple.png",
    },
    {
        id: 2,
        name: "Valchoka",
        nickname: "Valchoka",
        elo: 2080,
        rank: 2,
        favoriteCiv: "Berbers",
        winRate: 64,
        totalGames: 380,
        image: "players/valchoka.png",
    },
    {
        id: 3,
        name: "Lucipher",
        nickname: "Washed_Up_Lucipher",
        elo: 1895,
        rank: 3,
        favoriteCiv: "Georgians",
        winRate: 62,
        totalGames: 320,
        image: "players/lucipher.png",
    },
    {
        id: 4,
        name: "Sandro",
        nickname: "Sandriko",
        elo: 1980,
        rank: 4,
        favoriteCiv: "Wu",
        winRate: 59,
        totalGames: 290,
        image: "players/sandriko.png",
    },
    {
        id: 5,
        name: "Archer",
        nickname: "Archer",
        elo: 2000,
        rank: 5,
        favoriteCiv: "Malay",
        winRate: 75,
        totalGames: 403,
        image: "players/Archer.png",
    },
    {
        id: 6,
        name: "Guramata",
        nickname: "guramata",
        elo: 1950,
        rank: 6,
        favoriteCiv: "Cumans",
        winRate: 61,
        totalGames: 265,
        image: "players/guramata.png",
    },
    {
        id: 7,
        name: "Zviad",
        nickname: "zv",
        elo: 2050,
        rank: 7,
        favoriteCiv: "Mongols",
        winRate: 63,
        totalGames: 4450,
        image: "players/zv.png",
    },
    {
        id: 8,
        name: "Misha",
        nickname: "Misha_Winemaker",
        elo: 1961,
        rank: 8,
        favoriteCiv: "Berbers",
        winRate: 100,
        totalGames: 103,
        image: "players/misha_winemaker.png",
    },
];

const Players = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Georgian AoE II Players
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the top Age of Empires II players from Georgia&#39;s
            competitive community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <Card
              key={player.id}
              className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Avatar className="w-full h-full rounded-none">
                    <AvatarImage
                      src={player.image}
                      alt={player.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-none text-4xl">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Rank #{player.rank}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{player.name}</h3>
                    <p className="text-muted-foreground">
                      &#34;{player.nickname}&#34;
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-semibold">ELO: {player.elo}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Win Rate: {player.winRate}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Swords className="w-5 h-5 text-primary" />
                    <span>Games Played: {player.totalGames}</span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">
                      Favorite Civilization
                    </p>
                    <Badge variant="secondary">{player.favoriteCiv}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
