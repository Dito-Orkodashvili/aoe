import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  ChartNoAxesCombined,
  Clock,
  Crown,
  Download,
  ExternalLink,
  Flag,
  Flame,
  Gamepad2,
  Globe,
  Mountain,
  Skull,
  Trophy,
  Twitch,
  User,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { getPlayerDetails } from "@/lib/supabase/player/get-player-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getPlayerOfficialStats,
  mergePlayerWithStats,
} from "@/lib/supabase/player/get-player-official-stats";
import Image from "next/image";
import { getPlayerMatchHistory } from "@/lib/supabase/match-history/get-recent-match-history";
import { ExtractedMatchInfo } from "@/lib/types/match-history.types";
import {
  didPlayerWin,
  groupPlayersByTeam,
  timeAgo,
} from "@/lib/supabase/match-history/extract-match-info";
import { clsx } from "clsx";
import { capitalize } from "@/lib/utils";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { getCivById } from "@/lib/utils/civilization.utils";
import { TwitchLink } from "@/components/twitch-link";
import { YoutubeLink } from "@/components/youtube-link";

const civilizationStats: unknown[] = [];

const PlayerDetails = async ({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) => {
  const { playerId } = await params;

  const player = await getPlayerDetails(playerId);
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
  let matchHistory: ExtractedMatchInfo[] = [];

  if (aoe_profile_id) {
    const playerOfficialStats = await getPlayerOfficialStats([
      Number(aoe_profile_id),
    ]);

    playerStats = mergePlayerWithStats(player, playerOfficialStats);

    matchHistory = await getPlayerMatchHistory(aoe_profile_id);
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
                <p className="text-xl text-muted-foreground mb-4">
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
                          href={`https://www.aoe2insights.com/user/${aoe_profile_id}/`}
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
        <TabsList className="grid grid-cols-2 max-w-[50rem]">
          <TabsTrigger value="matches" className="cursor-pointer">
            უახლესი ბრძოლები
          </TabsTrigger>
          <TabsTrigger value="civilizations" className="cursor-pointer">
            ცივილიზაციები
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>უახლესი ბრძლების ისტორია</CardTitle>
            </CardHeader>
            <CardContent>
              {matchHistory.length > 0 ? (
                <div className="space-y-4">
                  {matchHistory.map((match, index) => {
                    const didWin = didPlayerWin(aoe_profile_id, match.players);

                    const teams = groupPlayersByTeam(match.players);
                    const team1Players = teams[0];
                    const team2Players = teams[1];

                    const resolvedMapName = "";
                    return (
                      <div
                        key={index}
                        className={clsx(
                          `rounded-xl border-2 overflow-hidden`,
                          didWin ? "border-green-800" : "border-red-900",
                        )}
                      >
                        <div className="flex items-center gap-4 p-4 border-b border-border/50">
                          <ImageWithFallback
                            src={`/aoe/maps/${resolvedMapName}.png`}
                            fallbackSrc={`/aoe/maps/unknown.png`}
                            alt={match.mapName}
                            title={match.mapName}
                            width={64}
                            height={64}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">
                                {capitalize(resolvedMapName)}
                              </span>

                              {didWin ? (
                                <Crown className="text-green-600 w-6 h-6" />
                              ) : (
                                <Skull className="text-red-500 w-6 h-6" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {timeAgo(match.completionTime)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {match.duration}
                              </span>
                            </div>
                          </div>
                          <a
                            href={`https://aoe.ms/replay/?gameId=${match.id}&profileId=${aoe_profile_id}`}
                            className="self-start flex gap-2 items-center text-sm text-blue-400 underline"
                          >
                            <Download className="text-green-600" width={16} />{" "}
                            ჩანაწერი
                          </a>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 p-4">
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              Team 1
                            </p>
                            {team1Players?.map((p, pIndex) => {
                              const didWin = didPlayerWin(
                                p.profileId.toString(),
                                match.players,
                              );

                              const civ = getCivById(p.civilizationId);

                              return (
                                <div
                                  key={pIndex}
                                  className={clsx(
                                    "flex items-center justify-between bg-background/50 rounded-lg px-3 py-2",
                                    didWin
                                      ? "border border-green-800/50"
                                      : "border border-red-900/50",
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    {didWin ? (
                                      <Crown className="text-green-600 w-4 h-4" />
                                    ) : (
                                      <Skull className="text-red-500 w-4 h-4" />
                                    )}
                                    <div className="flex gap-2">
                                      <div className="flex gap-2 items-center">
                                        <a
                                          href={`https://www.ageofempires.com/stats/?profileId=${p.profileId}&game=age2&matchType=3`}
                                          className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                                        >
                                          {p.alias}
                                        </a>
                                        {civ && (
                                          <Image
                                            width={32}
                                            height={32}
                                            src={`/aoe/civs/${civ.icon}`}
                                            title={civ.name}
                                            alt={civ.name}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-foreground">
                                      {p.oldRating}
                                    </p>
                                    <p
                                      className={`text-xs font-medium ${p.ratingChange >= 0 ? "text-green-500" : "text-red-500"}`}
                                    >
                                      {p.ratingChange >= 0 && "+"}
                                      {p.ratingChange}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-center md:hidden">
                            <span className="text-lg font-bold text-muted-foreground">
                              VS
                            </span>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              Team 2
                            </p>
                            {team2Players?.map((p, pIndex) => {
                              const didWin = didPlayerWin(
                                p.profileId.toString(),
                                match.players,
                              );

                              const civ = getCivById(p.civilizationId);

                              return (
                                <div
                                  key={pIndex}
                                  className={clsx(
                                    "flex items-center justify-between bg-background/50 rounded-lg px-3 py-2",
                                    didWin
                                      ? "border border-green-800/50"
                                      : "border border-red-900/50",
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    {didWin ? (
                                      <Crown className="text-green-600 w-4 h-4" />
                                    ) : (
                                      <Skull className="text-red-500 w-4 h-4" />
                                    )}
                                    <div className="flex gap-2">
                                      <div className="flex gap-2 items-center">
                                        <a
                                          href={`https://www.ageofempires.com/stats/?profileId=${p.profileId}&game=age2&matchType=3`}
                                          className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                                        >
                                          {p.alias}
                                        </a>
                                        {civ && (
                                          <Image
                                            width={32}
                                            height={32}
                                            src={`/aoe/civs/${civ.icon}`}
                                            title={civ.name}
                                            alt={civ.name}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-foreground">
                                      {p.oldRating}
                                    </p>
                                    <p
                                      className={`text-xs font-medium ${p.ratingChange >= 0 ? "text-green-500" : "text-red-500"}`}
                                    >
                                      {p.ratingChange >= 0 && "+"}
                                      {p.ratingChange}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  უახლესი ბრძლები არ მოიძებნა
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="civilizations">
          <Card>
            <CardHeader>
              <CardTitle>ცივილიზაციების სტატისტიკა</CardTitle>
            </CardHeader>
            <CardContent>
              {civilizationStats.length > 0 ? (
                <div className="space-y-6">
                  {/*{civilizationStats.map((civ, index) => (
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
                  ))}*/}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  ცივილიზაციების სტატისტიკა არ მოიძებნა
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
