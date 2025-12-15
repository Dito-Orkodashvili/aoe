"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, startTransition, useState } from "react";
import { PlayerType } from "@/lib/types/player.types";
import { ChevronsUpDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchPlayers } from "@/app/tournaments/actions";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { addParticipantsAction } from "@/app/tournaments/create/step-3/action";
import {
  TournamentParticipantsSchema,
  TournamentParticipantsSchemaErrorsType,
} from "@/lib/schemas/tournament/participants.schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ERROR_MESSAGES } from "@/lib/utils/error.constants";
import {
  TeamIdButton,
  TeamIdButtonValueType,
} from "@/components/tournament/team-id-button";
import { Input } from "@/components/ui/input";

interface ParticipantsFormProps {
  tournamentId: string;
}

export const ParticipantsForm = ({ tournamentId }: ParticipantsFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [participants, setParticipants] = useState<
    (PlayerType & { team_id: TeamIdButtonValueType; seed?: string })[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] =
    useState<TournamentParticipantsSchemaErrorsType | null>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: players = [], isFetching } = useQuery({
    queryKey: ["players-search", debouncedQuery],
    queryFn: () => searchPlayers(debouncedQuery),
    enabled: debouncedQuery.trim().length > 1,
  });

  const addParticipant = (player: PlayerType) => {
    const searchTerm = searchQuery.trim();

    if (!searchTerm) return;

    const participant = participants.find((p) => p.id === player.id);
    if (!participant) {
      setParticipants([...participants, { ...player, team_id: 1 }]);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleTeamUpdate = (
    teamId: TeamIdButtonValueType,
    participantId: string,
  ) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId ? { ...p, team_id: teamId! } : p,
      ),
    );
  };

  const handleSeedUpdate = (
    event: ChangeEvent<HTMLInputElement>,
    participantId: string,
  ) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId ? { ...p, seed: event.target.value } : p,
      ),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validatedParticipants = TournamentParticipantsSchema.safeParse({
      participants,
    });

    const isValid = validatedParticipants.success;

    if (!isValid) {
      setErrors(validatedParticipants.error.format());
    } else {
      setErrors(null);

      const res = await addParticipantsAction(participants, tournamentId);

      if (!res.ok) {
        toast({
          title: "შეცდომა!",
          description: res.error.message ?? ERROR_MESSAGES[res.error.code],
          variant: "destructive",
        });
      } else {
        router.push(`/tournaments/create/step-4?id=${tournamentId}`);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            აირჩიე მოთამაშეები...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="მოძებნე მოთამაშე..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                {isFetching ? "Loading..." : "No user found."}
              </CommandEmpty>
              <CommandGroup>
                {players.map((player) => (
                  <CommandItem
                    key={player.id}
                    value={player.nickname}
                    onSelect={() => addParticipant(player)}
                  >
                    {player.nickname}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="space-y-2">
        {participants.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No participants added yet
          </p>
        ) : (
          <div className="grid gap-2">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-card"
              >
                <span className="font-medium">{participant.nickname}</span>
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder="seed"
                    className="h-10 w-16 rounded-sm"
                    value={participant.seed ?? ""}
                    onChange={(event) =>
                      handleSeedUpdate(event, participant.id)
                    }
                  />
                  <TeamIdButton
                    value={participant.team_id ?? 1}
                    onClick={(value) =>
                      handleTeamUpdate(
                        value as TeamIdButtonValueType,
                        participant.id,
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeParticipant(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() =>
            router.push(`/tournaments/create/step-2?id=${tournamentId}`)
          }
        >
          უკან
        </Button>

        <Button type="submit" className="flex-1">
          შენახვა და გაგრძელება
        </Button>
      </div>
    </form>
  );
};
