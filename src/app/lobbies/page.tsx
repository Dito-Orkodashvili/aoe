import { Swords } from "lucide-react";
import { PageHero } from "@/components/sections/hero";
import { LobbiesTable } from "@/components/lobbies-table";
import { LobbyTabs } from "@/components/lobby-tabs";
import { LiveMatchesTable } from "@/components/live-matches-table";
import { getPlayers } from "@/lib/supabase/player/get-players";

const Lobbies = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: "live" | "lobby" }>;
}) => {
  const { tab } = await searchParams;
  const players = await getPlayers();

  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <Swords className="w-10 h-10 text-amber-400 mx-auto drop-shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Ongoing Matches
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Watch live games in progress
          </p>
        </div>
      </PageHero>

      <main className="container mx-auto px-4 py-8">
        <LobbyTabs
          activeTab={tab ?? "live"}
          liveComponent={<LiveMatchesTable players={players} />}
          lobbyComponent={<LobbiesTable players={players} />}
        />
      </main>
    </>
  );
};

export default Lobbies;
