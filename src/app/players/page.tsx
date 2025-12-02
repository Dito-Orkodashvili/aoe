import { PageHero } from "@/components/sections/hero";
import Image from "next/image";
import { PlayersList } from "@/components/players-list";
import { getPlayers } from "@/lib/supabase/player/get-players";
import {
  getPlayersOfficialStats,
  mergePlayersWithStats,
} from "@/lib/supabase/player/get-players-official-stats";

export const dynamic = "force-dynamic";

const Players = async () => {
  const players = await getPlayers();
  const stats = await getPlayersOfficialStats(players);

  const mergedPlayers = mergePlayersWithStats(players, stats);

  return (
    <>
      <PageHero>
        <div className="flex justify-center mb-6">
          <Image
            src="/teutonic_knight.png"
            alt="Teutonic knight"
            width={80}
            height={111}
            className="animate-fade-in"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
          Georgian AoE II Players
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          Meet the top Age of Empires II players from Georgia&#39;s competitive
          community
        </p>
      </PageHero>

      <div className="container mx-auto px-4 py-8">
        {players && <PlayersList players={mergedPlayers} />}
      </div>
    </>
  );
};

export default Players;
