import { TournamentType } from "@/lib/types/tournament.types";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface TournamentStatusProps {
  status: TournamentType["status"];
}

export const TournamentStatus = ({ status }: TournamentStatusProps) => {
  if (status === "draft" || status === "upcoming") {
    return (
      <Badge variant="secondary" className="inline-flex gap-2 items-center">
        <Clock width={16} /> <span>ჯერ არ დაწყებულა</span>
      </Badge>
    );
  }

  if (status === "registration") {
    return <Badge variant="secondary">რეგისტრაცია დაწყებულია</Badge>;
  }

  if (status === "cancelled") {
    return <Badge variant="secondary">გაუქმებული</Badge>;
  }

  if (status === "completed") {
    return <Badge variant="secondary">დასრულებული</Badge>;
  }

  if (status === "active") {
    return (
      <Badge variant="destructive" className="animate-pulse">
        მიმდინარე
      </Badge>
    );
  }

  return null;
};
