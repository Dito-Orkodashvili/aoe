"use client";

import { cn } from "@/lib/utils";
import {
  Users,
  Map as MapIcon,
  Settings,
  BarChart3,
  Layers,
  ChevronLeft,
  ChevronRight,
  Info,
  Tally1,
  Tally2,
  ChessPawn,
  ChessQueen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElementType, useState } from "react";
import {
  TournamentDetailsTabType,
  TournamentStagesType,
} from "@/lib/types/tournament.types";

type Tab = {
  type: "divider" | "item";
  id?: TournamentDetailsTabType;
  label?: string;
  icon?: ElementType;
  order: number;
};

interface TournamentSidebarProps {
  stages: TournamentStagesType[];
  activeTab: TournamentDetailsTabType;
  onTabChange: (section: TournamentDetailsTabType) => void;
}

export const TournamentSidebar = ({
  stages,
  activeTab,
  onTabChange,
}: TournamentSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const tabItems: Tab[] = [
    {
      type: "item",
      id: "info",
      label: "ინფორმაცია",
      icon: Info,
      order: 1,
    },
    {
      type: "item",
      id: "standings",
      label: "პოზიციები",
      icon: BarChart3,
      order: 4,
    },
    {
      type: "item",
      id: "participants",
      label: "მონაწილეები",
      icon: Users,
      order: 5,
    },
    {
      type: "item",
      id: "maps",
      label: "რუკები",
      icon: MapIcon,
      order: 6,
    },
    {
      type: "divider",
      order: 7,
    },
    {
      type: "item",
      id: "settings",
      label: "პარამეტრები",
      icon: Settings,
      order: 8,
    },
  ];

  if (stages.length > 0) {
    tabItems.push({
      type: "item",
      id: "stage-1",
      label: "პირველი ეტაპი",
      icon: ChessPawn,
      order: 2,
    });
    tabItems.push({
      type: "item",
      id: "stage-2",
      label: "ფინალური ეტაპი",
      icon: ChessQueen,
      order: 3,
    });
  }

  const sortedTabItems = tabItems.sort((a, b) => a.order - b.order);

  return (
    <aside
      className={cn(
        "h-[calc(100vh-4rem)] border-r border-border bg-card transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex justify-end p-2 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sortedTabItems.map((item, index) => {
          if (item.type === "divider") {
            return (
              <div
                key={`divider-${index}`}
                className="my-2 border-t border-border"
              />
            );
          }

          const Icon = item.icon || Layers;
          const isActive = activeTab === item.id;
          const status = "status" in item ? item.status : undefined;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id!)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {status && (
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        status === "active" && "bg-green-500",
                        status === "completed" && "bg-blue-500",
                        status === "pending" && "bg-muted-foreground/50",
                      )}
                    />
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
