"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoorOpen, Play } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement } from "react";

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
    <Tabs value={activeTab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="live" className="gap-2">
          <Play className="h-4 w-4" />
          Live Matches
        </TabsTrigger>
        <TabsTrigger value="lobby" className="gap-2">
          <DoorOpen className="h-4 w-4" />
          Lobby
        </TabsTrigger>
      </TabsList>
      {activeTab === "live" && liveComponent}
      {activeTab === "lobby" && lobbyComponent}
    </Tabs>
  );
};
