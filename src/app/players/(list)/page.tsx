import { PlayersList } from "@/components/players-list";
import { getPlayers } from "@/lib/supabase/player/get-players";
import {
  getPlayersOfficialStats,
  mergePlayersWithStats,
} from "@/lib/supabase/player/get-players-official-stats";
import { PlayersListSkeleton } from "@/components/players-list-skeleton";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "მეომრები",
  description:
    "ქართველი Age of Empires II მოთამაშეების რეიტინგი — 1v1 და გუნდური ელო, მოგებათა სერია და სტატისტიკა.",
  alternates: { canonical: "/players" },
  openGraph: {
    title: "ქართველი მებრძოლები — aoe.ge",
    description:
      "ქართველი Age of Empires II მოთამაშეების რეიტინგი — 1v1 და გუნდური ელო, მოგებათა სერია და სტატისტიკა.",
    url: "/players",
  },
};

const PlayersWithStats = async () => {
  const players = await getPlayers();

  if (!players.length) return null;

  const stats = await getPlayersOfficialStats(players);

  return <PlayersList players={mergePlayersWithStats(players, stats)} />;
};

const Players = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      <Suspense fallback={<PlayersListSkeleton />}>
        <PlayersWithStats />
      </Suspense>
    </div>
  );
};

export default Players;
