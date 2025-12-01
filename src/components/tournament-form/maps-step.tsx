import { Button } from "@/components/ui/button";
import { ChevronsUpDown, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { TMap } from "@/lib/types/map.types";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { searchMaps } from "@/app/tournaments/actions";
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

interface MapsStepProps {
  maps: TMap[];
  setMaps: Dispatch<SetStateAction<TMap[]>>;
}

export const MapsStep = ({ maps, setMaps }: MapsStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: fetchedMaps = [], isFetching } = useQuery({
    queryKey: ["maps-search", debouncedQuery],
    queryFn: () => searchMaps(debouncedQuery),
    enabled: debouncedQuery.trim().length > 1,
  });

  const addMap = (map: TMap) => {
    const searchTerm = searchQuery.trim();

    if (!searchTerm) return;

    const foundMap = maps.find((m) => m.id === map.id);
    if (!foundMap) {
      setMaps([...maps, map]);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const removeMap = (index: number) => {
    setMaps(maps.filter((_, i) => i !== index));
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
              <CommandEmpty>
                {isFetching ? "Loading..." : "No map found."}
              </CommandEmpty>
              <CommandGroup>
                {fetchedMaps.map((map) => (
                  <CommandItem
                    key={map.id}
                    value={map.name}
                    onSelect={() => addMap(map)}
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
        {maps.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No map added yet
          </p>
        ) : (
          <div className="grid gap-2">
            {maps.map((map, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-card"
              >
                <span className="font-medium">{map.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMap(index)}
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
