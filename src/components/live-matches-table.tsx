"use client";

import { Eye, Swords } from "lucide-react";
import { useState } from "react";
import { GameElapsedTime } from "@/components/game-elapsed-time";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLiveMatchesWs } from "@/hooks/use-live-matches-ws";
import { GAME_MODE } from "@/lib/utils/lobby.utils";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { VirtualTable } from "@/components/virtual-table";
import { SpectateMatchInfo } from "@/components/spectate-match-info";

export const LiveMatchesTable = () => {
  const [onlyGeorgians, setOnlyGeorgians] = useState<boolean>(true);
  const [onlyRanked, setOnlyRanked] = useState<boolean>(false);
  const [only1v1, setOnly1v1] = useState<boolean>(false);

  const { matches } = useLiveMatchesWs();

  const filteredMatches = matches.filter((match) =>
    Boolean(
      !match.antiquity_mode &&
        !match.cheats &&
        !match.full_tech_tree &&
        match.isGeorgianParticipating === onlyGeorgians,
    ),
  );

  return (
    <div className="w-full">
      <Card className="p-2 mb-4">
        <CardContent className="flex flex-wrap gap-4 w-full px-0 items-center">
          <div className="flex gap-2">
            <Checkbox
              checked={onlyGeorgians}
              id="only_georgians"
              onCheckedChange={(checked) => setOnlyGeorgians(checked === true)}
            />
            <Label className="mb-0 text-xs" htmlFor="only_georgians">
              მხოლოდ ქართველები
            </Label>
          </div>
          <div className="bg-border w-[1px] h-[1rem]" />
          <div className="flex gap-2">
            <Checkbox
              checked={onlyRanked}
              id="only_ranked"
              onCheckedChange={(checked) => setOnlyRanked(checked === true)}
            />
            <Label className="mb-0 text-xs" htmlFor="only_ranked">
              რენკირებული
            </Label>
          </div>
          <div className="bg-border w-[1px] h-[1rem]" />
          <div className="flex gap-2">
            <Checkbox
              checked={only1v1}
              id="only_1v1"
              onCheckedChange={(checked) => setOnly1v1(checked === true)}
            />
            <Label className="mb-0 text-xs" htmlFor="only_1v1">
              მხოლოდ 1v1
            </Label>
          </div>
        </CardContent>
      </Card>

      <VirtualTable
        data={filteredMatches}
        rowHeight={56.8}
        height={600}
        header={
          <div className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground bg-card">
            <div className="w-[100px]">მოთამაშე</div>
            <div className="flex-1">ტიპი</div>
            <div className="flex-1">გასული დრო</div>
            <div className="flex-1">რუკა</div>
            <div className="w-[100px]">სტატუსი</div>
            <div className="w-[120px] text-right">ყურება</div>
          </div>
        }
        renderRow={(match) => (
          <div className="flex items-center px-4 py-3 border-b hover:bg-muted/50 transition-colors">
            <div className="w-[100px]">
              <SpectateMatchInfo match={match} />
            </div>
            <div className="flex-1">{GAME_MODE[match.mode]}</div>
            <div className="flex-1">
              <GameElapsedTime startTime={match.start_time} />
            </div>
            <div className="flex-1">{match.map_name}</div>
            <div className="w-[100px]">
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            </div>
            <div className="w-[120px] text-right">
              <Button
                size="sm"
                variant="secondary"
                asChild
                disabled={match.observable}
              >
                <a href={`aoe2de://1/${match.matchid}`} target="_blank">
                  <Eye className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
        noDataComponent={
          <div className="text-center py-12">
            <Swords className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">თამაში არ მოიძებნა</h3>
            <p className="text-muted-foreground">
              მითითებული ფილტრებით მიმდინარე თამაში.
            </p>
          </div>
        }
      />
    </div>
  );
};
