import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export const TournamentInfo = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-6 h-6 text-primary" />
          Tournament Format
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Format</TableCell>
              <TableCell className="text-right font-bold text-secondary">
                Single Elimination
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Game Type</TableCell>
              <TableCell className="text-right font-bold text-secondary">
                1v1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Best of</TableCell>
              <TableCell className="text-right font-bold text-secondary">
                Best of 3 (Finals: Bo5)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
