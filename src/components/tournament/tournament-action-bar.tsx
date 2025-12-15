import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  StopCircle,
  Settings,
  Share2,
  RotateCcw,
} from "lucide-react";
import { TournamentType } from "@/lib/types/tournament.types";

interface TournamentActionBarProps {
  status: TournamentType["status"];
  currentStage?: string;
  onStartTournament?: () => void;
  onStartStage?: () => void;
  onEndStage?: () => void;
  onPauseTournament?: () => void;
  onResetTournament?: () => void;
  onShare?: () => void;
  onSettings?: () => void;
}

export const TournamentActionBar = ({
  status,
  currentStage,
  onStartTournament,
  onStartStage,
  onEndStage,
  onPauseTournament,
  onResetTournament,
  onShare,
  onSettings,
}: TournamentActionBarProps) => {
  return (
    <div className="bg-background/95 border-b border-border">
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {(status === "draft" || status === "upcoming") && (
              <Button onClick={onStartTournament} className="gap-2">
                <Play className="w-4 h-4" />
                Start Tournament
              </Button>
            )}

            {status === "active" && (
              <>
                {currentStage && (
                  <Button
                    onClick={onEndStage}
                    variant="destructive"
                    className="gap-2"
                  >
                    <StopCircle className="w-4 h-4" />
                    End {currentStage}
                  </Button>
                )}
                <Button onClick={onStartStage} className="gap-2">
                  <Play className="w-4 h-4" />
                  Start Next Stage
                </Button>
                <Button
                  onClick={onPauseTournament}
                  variant="outline"
                  className="gap-2"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {status !== "completed" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onResetTournament}
                title="Reset Tournament"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onShare} title="Share">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettings}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
