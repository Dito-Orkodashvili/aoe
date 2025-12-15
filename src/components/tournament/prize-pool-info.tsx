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
import { distributePrizePool } from "@/lib/utils";

interface PrizePoolInfoProps {
  prize: number;
  participantsCount: number;
}

export const PrizePoolInfo = ({
  prize,
  participantsCount,
}: PrizePoolInfoProps) => {
  const distribution = distributePrizePool(prize, participantsCount);

  const label = (place: number) => {
    if (place === 1) return "1st Place";
    if (place === 2) return "2nd Place";
    if (place === 3) return "3rd Place";
    if (place === 4) return "4th Place";
    return `${place}th Place`;
  };

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
            {distribution.map((item) => (
              <TableRow key={item.place}>
                <TableCell className="font-medium">
                  {label(item.place)}
                </TableCell>
                <TableCell className="text-right font-bold text-secondary">
                  {item.amount} GEL
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
