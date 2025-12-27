import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ChartNoAxesCombined,
  ExternalLink,
  Flag,
  Flame,
  Gamepad2,
  Globe,
  Mountain,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import { getPlayerById } from "@/lib/supabase/player/get-player-by-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getPlayerOfficialStats,
  mergePlayerWithStats,
} from "@/lib/supabase/player/get-player-official-stats";
import Image from "next/image";
import { getCivById } from "@/lib/utils/civilization.utils";
import { TwitchLink } from "@/components/twitch-link";
import { YoutubeLink } from "@/components/youtube-link";
import { RecentMatchesList } from "@/components/player/recent-matches-list";
import { CivStatsList } from "@/components/player/civ-stats-list";
import { MapStatsList } from "@/components/player/map-stats-list";

const PlayerDetails = async ({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) => {
  const { playerId } = await params;

  const player = await getPlayerById(playerId);
  const {
    aoe_profile_id,
    fav_civ,
    nickname,
    name,
    last_name,
    gender,
    picture_url,
    region,
    twitch,
    youtube,
    bio,
    team,
  } = player || {};

  const resolvedFavCiv = getCivById(fav_civ);

  let playerStats = null;

  if (aoe_profile_id) {
    const playerOfficialStats = await getPlayerOfficialStats([
      Number(aoe_profile_id),
    ]);

    playerStats = mergePlayerWithStats(player, playerOfficialStats);
  }

  const { one_v_one_stats } = playerStats || {};

  let total1v1Games = 0;

  if (one_v_one_stats?.wins && one_v_one_stats?.losses) {
    total1v1Games = one_v_one_stats.wins + one_v_one_stats.losses;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/players"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        მეომრების სია
      </Link>

      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl" />
        <Card className="border-0 bg-card/50 backdrop-blur-sm p-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-primary/20">
                  <AvatarImage
                    src={picture_url ?? `/aoe/anonymous_player_${gender}.webp`}
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
                <h1 className="text-3xl md:text-4xl font-bold text-foreground font-medieval">
                  {nickname}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">
                  {name} {last_name}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    {region || "საქართველო"}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    {team ?? "Team Georgia"}
                  </div>
                </div>
                {(youtube || twitch || aoe_profile_id) && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {youtube && <YoutubeLink href={youtube} />}
                    {twitch && <TwitchLink href={twitch} />}
                    {aoe_profile_id && (
                      <>
                        <a
                          href={`https://www.ageofempires.com/stats/?profileId=${aoe_profile_id}&game=age2&matchType=3`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 text-primary" />
                          <span className="text-foreground">AoE პროფილი</span>
                        </a>
                        <a
                          href={`https://www.aoe2insights.com/user/relic/${aoe_profile_id}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 text-primary" />
                          <span className="text-foreground">
                            Aoe2Insights პროფილი
                          </span>
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4 gap-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {player.nickname}-ის შესახებ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {bio ?? "ინფორმაცია არ გვაქვს :("}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <ChartNoAxesCombined className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">
              {one_v_one_stats?.rating ?? "N/A"}
            </p>
            <p className="text-sm text-muted-foreground">მიმდინარე რეიტინგი</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Mountain className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">
              {one_v_one_stats?.highestrating ?? "N/A"}
            </p>
            <p className="text-sm text-muted-foreground">პიკ რეიტინგი</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">
              {one_v_one_stats?.streak || "N/A"}
            </p>
            <p className="text-sm text-muted-foreground">მოგებების სერია</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">
              {total1v1Games}
            </p>
            <p className="text-sm text-muted-foreground">ბრძოლების რაოდენობა</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            {resolvedFavCiv ? (
              <a
                className="flex justify-center mb-2"
                href={`https://ageofempires.fandom.com/wiki/${resolvedFavCiv.name}`}
                target="_blank"
              >
                <Image
                  src={`/aoe/civs/${resolvedFavCiv.icon}`}
                  alt={resolvedFavCiv.name}
                  width={32}
                  height={32}
                  title={resolvedFavCiv.name}
                />
              </a>
            ) : (
              <Flag className="w-8 h-8 mx-auto mb-2 text-primary" />
            )}

            <p className="text-3xl font-bold text-foreground">
              {resolvedFavCiv ? (
                <a
                  className="flex justify-center"
                  href={`https://ageofempires.fandom.com/wiki/${resolvedFavCiv.name}`}
                  target="_blank"
                >
                  {resolvedFavCiv.name}
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p className="text-sm text-muted-foreground">საყვარელი ცივი</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="matches" className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="matches" className="cursor-pointer">
            უახლესი ბრძოლები
          </TabsTrigger>
          <TabsTrigger value="civilizations" className="cursor-pointer">
            ცივილიზაციები
          </TabsTrigger>
          <TabsTrigger value="maps" className="cursor-pointer">
            რუკები
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>უახლესი ბრძლების ისტორია</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentMatchesList profileId={aoe_profile_id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="civilizations">
          <Card>
            <CardHeader>
              <CardTitle>ცივილიზაციების სტატისტიკა</CardTitle>
            </CardHeader>
            <CardContent>
              <CivStatsList profileId={aoe_profile_id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maps">
          <Card>
            <CardHeader>
              <CardTitle>რუკების სტატისტიკა</CardTitle>
            </CardHeader>
            <CardContent>
              <MapStatsList profileId={aoe_profile_id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default PlayerDetails;
