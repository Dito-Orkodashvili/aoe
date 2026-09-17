import { Info } from "lucide-react";

export function PlayersListInfo() {
  return (
    <p className="text-sm md:text-md text-muted-foreground flex gap-3 items-center">
      <span>
        <Info className="text-secondary" />
      </span>{" "}
      რენკირება ხდება ოფიციალური რეიტინგის მიხედვით!
    </p>
  );
}
