import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, TicketX } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { COUNTRIES } from "@/lib/utils/countries";

interface CountriesFilterProps {
  value: string;
  onValueChange?(value: string): void;
}

export const CountriesFilter = ({
  value,
  onValueChange,
}: CountriesFilterProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full sm:w-[300px] h-12 bg-card border-border/50">
        <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
        <SelectValue placeholder="ქვეყნით ფილტრაცია" />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        <SelectItem value="all">ყველა ქვეყანა</SelectItem>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex gap-2 items-center">
              {country.code === "ru" ? (
                <span title="ოკუპანტი">
                  <TicketX className="text-xl text-red-600" />
                </span>
              ) : (
                <ReactCountryFlag
                  className="text-md"
                  countryCode={country.code}
                  aria-label={country.name}
                  title={country.name}
                  svg
                />
              )}
              <span>{country.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
