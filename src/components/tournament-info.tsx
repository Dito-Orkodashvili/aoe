import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TTournamentInfo } from "@/lib/supabase/tournament/get-tournament-details";

interface TournamentInfoProps {
  tournament: TTournamentInfo;
}

export const TournamentInfo = ({ tournament }: TournamentInfoProps) => {
  const isShowMatch = tournament.participants.length === 2;
  return (
    <Card className="flex-1 mb-0">
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
                {isShowMatch ? "Showmatch" : "Single Elimination"}
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
                {isShowMatch ? tournament.matches[0].best_of : "TBD"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
