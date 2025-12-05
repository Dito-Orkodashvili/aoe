"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoorOpen, Play } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, Suspense } from "react";
import { TournamentInfo } from "@/components/tournament-info";
import { PrizePoolInfo } from "@/components/prize-pool-info";
import { ParticipantsInfo } from "@/components/participants-info";
import { Badge } from "@/components/ui/badge";

interface LobbyTabsProps {
  activeTab: "live" | "lobby";
  liveComponent: ReactElement;
  lobbyComponent: ReactElement;
}

export const LobbyTabs = ({
  activeTab,
  liveComponent,
  lobbyComponent,
}: LobbyTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setTab}
      defaultValue="live"
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger
          value="live"
          className="cursor-pointer flex gap-4 items-center"
        >
          <span>Live</span>
          <span className="block animate-pulse w-4 h-4 bg-primary rounded-full" />
        </TabsTrigger>
        <TabsTrigger value="lobby" className="cursor-pointer">
          Lobby
        </TabsTrigger>
      </TabsList>

      <TabsContent value="live" className="space-y-8 flex gap-4">
        {liveComponent}
      </TabsContent>

      <TabsContent value="lobby">{lobbyComponent}</TabsContent>
    </Tabs>
  );
};
