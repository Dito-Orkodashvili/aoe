"use client";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown, X } from "lucide-react";
import { FormEvent, startTransition, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  TournamentMapsSchema,
  TournamentMapsSchemaErrorsType,
} from "@/lib/schemas/tournament/maps.schema";
import { addMapsAction } from "@/app/tournaments/create/step-4/action";
import { getMapById, MAPS } from "@/lib/utils/map.utils";
import Image from "next/image";
import { ERROR_MESSAGES } from "@/lib/utils/error.constants";

interface MapsStepProps {
  tournamentId: string;
}

export const MapsForm = ({ tournamentId }: MapsStepProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [mapIds, setMapIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<TournamentMapsSchemaErrorsType | null>(
    null,
  );

  const addMap = (mapId: number) => {
    const foundMap = mapIds.includes(mapId);

    if (!foundMap) {
      setMapIds([...mapIds, mapId]);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const removeMap = (index: number) => {
    setMapIds(mapIds.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validatedParticipants = TournamentMapsSchema.safeParse({
      maps: mapIds.map((m) => ({ map_id: m })),
    });

    const isValid = validatedParticipants.success;

    if (!isValid) {
      setErrors(validatedParticipants.error.format());
    } else {
      setErrors(null);
      startTransition(async () => {
        const res = await addMapsAction(mapIds, tournamentId);

        if (!res.ok) {
          toast({
            title: "შეცდომა!",
            description: res.error.message ?? ERROR_MESSAGES[res.error.code],
            variant: "destructive",
          });
        } else {
          toast({
            title: "რუკები წარმატებით დაემატა",
            description: "",
            variant: "success",
          });
          router.push(`/tournaments/${res.data?.slug}`);
        }
      });
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
            Select map...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search maps..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No map found</CommandEmpty>
              <CommandGroup>
                {MAPS.map((map) => (
                  <CommandItem
                    key={map.id}
                    value={map.name}
                    onSelect={() => addMap(map.id)}
                  >
                    {map.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="space-y-2">
        {mapIds.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No map added yet
          </p>
        ) : (
          <div className="grid gap-2">
            {mapIds.map((mapId, index) => {
              const map = getMapById(mapId);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-lg bg-card"
                >
                  <div className="flex gap-4 items-center">
                    {map && (
                      <Image
                        src={`/aoe/maps/${map.icon}`}
                        width={40}
                        height={40}
                        alt={map.name}
                      />
                    )}
                    <span className="font-medium">{map?.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMap(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() =>
            router.push(`/tournaments/create/step-3?id=${tournamentId}`)
          }
        >
          უკან
        </Button>

        <Button type="submit" className="flex-1">
          შენახვა
        </Button>
      </div>
    </form>
  );
};
