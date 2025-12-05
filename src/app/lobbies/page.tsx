import { Swords } from "lucide-react";
import { PageHero } from "@/components/sections/hero";
import { LobbiesTable } from "@/components/lobbies-table";
import { LobbyTabs } from "@/components/lobby-tabs";
import { LiveMatchesTable } from "@/components/live-matches-table";

const Lobbies = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: "live" | "lobby" }>;
}) => {
  const { tab } = await searchParams;

  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <Swords className="w-10 h-10 text-primary mx-auto drop-shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            ბრძლის ველი
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            უყურე ლაივ ბრძლებს ან შეუერთდი აქტიურ ლობიებს
          </p>
        </div>
      </PageHero>

      <main className="container mx-auto px-4 py-8">
        <LobbyTabs
          activeTab={tab ?? "live"}
          liveComponent={<LiveMatchesTable />}
          lobbyComponent={<LobbiesTable />}
        />
      </main>
    </>
  );
};

export default Lobbies;
