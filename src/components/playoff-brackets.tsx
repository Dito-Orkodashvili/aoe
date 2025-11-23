import { MatchCard } from "@/components/match-card";
import { Card } from "@/components/ui/card";

export const PlayoffBrackets = () => {
  const finalBracket = {
    round: "Grand Final",
    player1: "Purple",
    score1: 3,
    player2: "Sandriko",
    score2: 1,
    map: "Arabia",
  };

  const semiFinals = [
    {
      player1: "Purple",
      score1: 3,
      player2: "Lucipher",
      score2: 0,
    },
    {
      player1: "Sandriko",
      score1: 3,
      player2: "zv",
      score2: 2,
    },
  ];

  const quarterFinals = [
    {
      player1: "Purple",
      score1: 2,
      player2: "Sandro_Monk",
      score2: 0,
      map: "Arabia",
    },
    {
      player1: "zv",
      score1: 2,
      player2: "Archer",
      score2: 1,
    },
    {
      player1: "Lucipher",
      score1: 2,
      player2: "guramata",
      score2: 0,
    },
    {
      player1: "sandriko",
      score1: 2,
      player2: "omerta",
      score2: 1,
    },
  ];
  return (
    <Card className="p-4">
      <div className="mb-4 grid grid-flow-col grid-cols-3 items-center text-center text-sm font-bold uppercase">
        <div>Quarterfinals</div>
        <div>Semifinals</div>
        <div>Finals</div>
      </div>
      <div className="grid grid-flow-col grid-cols-3 items-center">
        <div className="grid grid-flow-row grid-rows-3">
          {quarterFinals.map((match, index) => {
            return <MatchCard match={match} key={index} />;
          })}
        </div>
        <div className="mx-4 grid h-1/2 grid-flow-row grid-rows-2">
          {semiFinals.map((match, index) => {
            return <MatchCard match={match} key={index} />;
          })}
        </div>
        <div className="grid h-1/4 grid-flow-row grid-rows-1">
          <MatchCard match={finalBracket} />
        </div>
      </div>
    </Card>
  );
};
