import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { TPlayer } from "@/lib/types/player.types";
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

interface ParticipantsStepProps {
  participants: TPlayer[];
  setParticipants: Dispatch<SetStateAction<TPlayer[]>>;
}

export const ParticipantsStep = ({
  participants,
  setParticipants,
}: ParticipantsStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: players = [], isFetching } = useQuery({
    queryKey: ["players-search", debouncedQuery],
    queryFn: () => searchPlayers(debouncedQuery),
    enabled: debouncedQuery.trim().length > 1,
  });

  const addParticipant = (player: TPlayer) => {
    const searchTerm = searchQuery.trim();

    if (!searchTerm) return;

    const participant = participants.find((p) => p.id === player.id);
    if (!participant) {
      setParticipants([...participants, player]);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select participant...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search users..."
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
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeParticipant(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
