"use client";

import { ShieldCheck, ShieldX, Swords } from "lucide-react";
import { useState } from "react";
import { useLobbiesWs } from "@/hooks/use-lobbies-ws";
import { Button } from "@/components/ui/button";
import { GAME_MODE } from "@/lib/utils/lobby.utils";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { VirtualTable } from "@/components/virtual-table";
import { LobbyMatchInfo } from "@/components/lobby-match-info";

export const LobbiesTable = () => {
  const [onlyGeorgians, setOnlyGeorgians] = useState<boolean>(false);

  const { matches } = useLobbiesWs();

  const filteredMatches = matches.filter(
    (match) =>
      !match.antiquity_mode &&
      !match.cheats &&
      !match.full_tech_tree &&
      !match.ew_mode &&
      match.open_slots &&
      match.isGeorgianParticipating === onlyGeorgians,
  );

  return (
    <div>
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
        </CardContent>
      </Card>

      <VirtualTable
        data={filteredMatches}
        rowHeight={60.8}
        height={600}
        header={
          <div className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground bg-card">
            <div className="w-20 px-4">Details</div>
            <div className="flex-1 px-4">Mode</div>
            <div className="flex-1 px-4">Lobby</div>
            <div className="flex-1 px-4">Map</div>
            <div className="w-16 text-center px-4">Slots</div>
            <div className="w-20 text-center px-4">Password</div>
            <div className="w-12 text-center px-4">Join</div>
          </div>
        }
        renderRow={(match) => (
          <div className="flex items-center px-4 py-3 border-b hover:bg-muted/50 transition-colors">
            <div className="w-20 px-4">
              <LobbyMatchInfo match={match} />
            </div>
            <div className="flex-1 px-4">{GAME_MODE[match.mode]}</div>
            <div className="flex-1 px-4 truncate">{match.description}</div>
            <div className="flex-1 px-4 truncate">{match.map_name}</div>
            <div className="w-16 text-center px-4">
              {`${match.slots_taken}/${match.slots_total}`}
            </div>
            <div className="w-20 px-4">
              <div className="flex justify-center">
                {match.password ? <ShieldCheck /> : <ShieldX />}
              </div>
            </div>
            <div className="w-12 text-right px-4">
              <Button
                size="sm"
                variant="outline"
                asChild
                disabled={match.observable}
              >
                <a href={`aoe2de://0/${match.lobbyId}`} target={`_blank`}>
                  <Swords className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
        noDataComponent={
          <div className="text-center py-12">
            <Swords className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">ლობი არ მოიძებნა</h3>
            <p className="text-muted-foreground">
              მითითებული ფილტრებით ლობი არ მოიძებნა.
            </p>
          </div>
        }
      />
    </div>
  );
};
