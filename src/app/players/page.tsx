import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/sections/hero";
import Image from "next/image";
import { PlayersList } from "@/components/players-list";

export const dynamic = "force-dynamic";

const Players = async () => {
  const supabase = await createClient();

  const { data: players } = await supabase.from("players").select(`
    *,
    player_stats(*)
  `);

  return (
    <>
      <Hero>
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
      </Hero>

      <div className="container mx-auto px-4 py-8">
        {players && <PlayersList players={players} />}
      </div>
    </>
  );
};

export default Players;
