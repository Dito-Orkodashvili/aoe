import { PageHero } from "@/components/sections/hero";
import { PlayersList } from "@/components/players-list";
import { getPlayers } from "@/lib/supabase/player/get-players";
import {
  getPlayersOfficialStats,
  mergePlayersWithStats,
} from "@/lib/supabase/player/get-players-official-stats";
import { BowArrow } from "lucide-react";

export const dynamic = "force-dynamic";

const Players = async () => {
  const players = await getPlayers();
  const stats = await getPlayersOfficialStats(players);

  const mergedPlayers = mergePlayersWithStats(players, stats);

  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <BowArrow className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
            ქართველი მებრძოლები
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
            გაიცანი ქართველი ტოპ მეომრები და შეუერთდი ბრძოლას!
          </p>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 py-8 mb-8">
        {players && <PlayersList players={mergedPlayers} />}
      </div>
    </>
  );
};

export default Players;
