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
    <main className="container mx-auto px-4 py-8">
      <LobbyTabs
        activeTab={tab ?? "live"}
        liveComponent={<LiveMatchesTable />}
        lobbyComponent={<LobbiesTable />}
      />
    </main>
  );
};

export default Lobbies;
