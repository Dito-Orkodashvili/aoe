import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const allParticipants = [
  { name: "Lucipher", elo: 2100, civ: "Mongols", status: "Champion" },
  { name: "Archer", elo: 2050, civ: "Britons", status: "Runner-up" },
  { name: "Sandriko", elo: 2000, civ: "Franks", status: "Semi-Finalist" },
  { name: "Valchoka", elo: 1780, civ: "Celts", status: "Quarter-Finalist" },
  { name: "Purple", elo: 1880, civ: "Koreans", status: "Round of 16" },
  { name: "guramata", elo: 1800, civ: "Ethiopians", status: "Round of 16" },
  { name: "zv", elo: 1850, civ: "Spanish", status: "Round of 16" },
  { name: "Dito", elo: 1820, civ: "Huns", status: "Round of 16" },
];

export const ParticipantsInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          All Participants
        </CardTitle>
        <CardDescription>Complete list of tournament players</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>ELO</TableHead>
              <TableHead>Favorite Civ</TableHead>
              <TableHead className="text-right">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allParticipants.map((player, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>{player.elo}</TableCell>
                <TableCell>{player.civ}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      player.status === "Champion" ? "default" : "outline"
                    }
                  >
                    {player.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
