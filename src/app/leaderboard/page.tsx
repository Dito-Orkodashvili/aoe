import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { Trophy } from "lucide-react";
import { PageHero } from "@/components/sections/hero";

const Leaderboard = () => {
  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <Trophy className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
            გლობალური <span className="text-amber-400">ლიდერბორდი</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
            თვალია დევნე მსოფლიოს საუკეთესო მებრძოლებს
          </p>
        </div>
      </PageHero>
      <LeaderboardTable />
    </>
  );
};

export default Leaderboard;
