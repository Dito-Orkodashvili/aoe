import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Users, Target, Swords } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/sections/hero";

export const dynamic = "force-dynamic";

const Players = async () => {
  const supabase = await createClient();

  const { data: players } = await supabase.from("players").select();

  return (
    <>
      <Hero>
        <div className="flex justify-center mb-6">
          <Users className="w-16 h-16 text-primary mx-auto animate-fade-in" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
          Georgian AoE II Players
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          Meet the top Age of Empires II players from Georgia&#39;s competitive
          community
        </p>
      </Hero>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {players?.map((player) => (
            <Card
              key={player.id}
              className="overflow-hidden hover:shadow-lg transition-shadow pt-0 pb-0 gap-2"
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
              <CardContent className="px-6 pb-4 pt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{player.nickname}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      ELO: {player.elo_local}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Tournament wins: 14</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Swords className="w-5 h-5 text-primary" />
                    <span>League: {player.league}</span>
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
    </>
  );
};

export default Players;
