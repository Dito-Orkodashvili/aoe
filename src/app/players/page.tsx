import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/navigation";
import { Trophy, Target, Swords } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const Players = async () => {
  const supabase = await createClient();

  const { data: players } = await supabase.from("players").select();

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
          {players?.map((player) => (
            <Card
              key={player.id}
              className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Avatar className="w-full h-full rounded-none">
                    <AvatarImage
                      src={player.picture_url ?? ""}
                      alt={player.nickname}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-none text-4xl">
                      {player.nickname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Rank #1
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
                    <span className="font-semibold">
                      ELO: {player.elo_local}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Win Rate: 50%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Swords className="w-5 h-5 text-primary" />
                    <span>Games Played: 500</span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">
                      Favorite Civilization
                    </p>
                    <Badge variant="secondary">{player.fav_civ}</Badge>
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
