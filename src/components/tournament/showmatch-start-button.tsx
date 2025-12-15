"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { startShowmatch } from "@/app/tournaments/[slug]/actions";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ShowmatchStartButton = ({
  tournamentId,
}: {
  tournamentId: string;
}) => {
  const router = useRouter();

  const onStart = () => {
    startTransition(async () => {
      const res = await startShowmatch({ tournamentId });

      if (res.ok) {
        router.refresh();
      } else {
        console.error(res.error);
      }
    });
  };

  return (
    <Button onClick={onStart} size="sm" className="mt-2">
      <Play className="w-4 h-4 mr-2" />
      დაწყება
    </Button>
  );
};
