"use client";

import { TournamentSidebar } from "@/components/tournament/tournament-sidebar";
import { DollarSign } from "lucide-react";
import { TournamentActionBar } from "@/components/tournament/tournament-action-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentInfo } from "@/components/tournament/tournament-info";
import { PrizePoolInfo } from "@/components/tournament/prize-pool-info";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ParticipantsInfo } from "@/components/tournament/participants-info";
import { useState } from "react";
import {
  TournamentDetailsTabType,
  TournamentDetailsType,
} from "@/lib/types/tournament.types";
import { TournamentDetailsHeader } from "@/components/tournament/tournament-details-header";
import { ShowmatchDetails } from "@/components/tournament/showmatch-details";

interface TournamentDetailsTabsProps {
  tournament: TournamentDetailsType;
  isAdmin: boolean;
}

export const TournamentDetailsTabs = ({
  tournament,
  isAdmin,
}: TournamentDetailsTabsProps) => {
  const [activeTab, setActiveTab] =
    useState<TournamentDetailsTabType>("settings");

  const isShowmatch =
    tournament.tournament_stages.length === 1 &&
    tournament.tournament_stages[0].format === "showmatch";

  return (
    <section className="flex flex-1">
      {!isShowmatch && (
        <TournamentSidebar
          stages={tournament.tournament_stages}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      )}
      <main className="flex-1 overflow-y-auto">
        <TournamentDetailsHeader tournament={tournament} />
        {isShowmatch ? (
          <ShowmatchDetails tournament={tournament} isAdmin={isAdmin} />
        ) : (
          <>
            <TournamentActionBar status="draft" />

            {activeTab === "info" && (
              <div>
                <div className="p-6 space-y-8 flex gap-4">
                  <TournamentInfo tournament={tournament} />
                  {tournament.prize_pool && (
                    <PrizePoolInfo
                      prize={tournament.prize_pool}
                      participantsCount={
                        tournament.tournament_participants.length
                      }
                    />
                  )}
                </div>
                <div className="p-6 space-y-8 flex gap-4">
                  {tournament.tournament_stages.map((stage) => (
                    <Card className="flex-1" key={stage.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-primary" />
                          {stage.stage_number} ეტაპი
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ფორმატი</TableHead>
                              <TableHead className="text-right">
                                სტატუსი
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">
                                {stage.format}
                              </TableCell>
                              <TableCell className="text-right font-bold text-secondary">
                                {stage.status}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "stage-1" && (
              <div className="p-6 space-y-8 flex gap-4">
                <div>Stage 1</div>
              </div>
            )}
            {activeTab === "stage-2" && (
              <div className="p-6 space-y-8 flex gap-4">
                <div>Stage 2</div>
              </div>
            )}
            {activeTab === "participants" && (
              <div className="p-6">
                <ParticipantsInfo
                  participants={tournament.tournament_participants}
                />
              </div>
            )}
            {activeTab === "standings" && <div className="p-6">Standings</div>}
            {activeTab === "maps" && <div className="p-6">Maps</div>}
            {activeTab === "settings" && <div className="p-6">Settings</div>}
          </>
        )}
      </main>
    </section>
  );
};
