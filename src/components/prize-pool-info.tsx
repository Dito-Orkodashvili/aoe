import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const prizePool = [
  { place: "1st Place", prize: "300 GEL" },
  { place: "2nd Place", prize: "150 GEL" },
  { place: "3rd-4th Place", prize: "50 GEL" },
];

export const PrizePoolInfo = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary" />
          Prize Pool Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Placement</TableHead>
              <TableHead className="text-right">Prize</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prizePool.map((prize, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{prize.place}</TableCell>
                <TableCell className="text-right font-bold text-secondary">
                  {prize.prize}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
