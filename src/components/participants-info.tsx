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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { TTournamentInfo } from "@/lib/supabase/tournament/get-tournament-details";

interface ParticipantsInfoProps {
  participants: TTournamentInfo["participants"];
}

export const ParticipantsInfo = ({ participants }: ParticipantsInfoProps) => {
  console.log("participants", participants);
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
              <TableHead>Photo</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>Favorite Civ</TableHead>
              <TableHead className="text-right">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Avatar>
                    <AvatarImage
                      src={participant.player.picture_url ?? ""}
                      alt={
                        participant.player.name || participant.player.nickname
                      }
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(
                        participant.player.name || participant.player.nickname,
                      )}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {participant.player.nickname}
                </TableCell>
                <TableCell>{participant.player.fav_civ}</TableCell>
                <TableCell className="text-right">
                  <Badge>TBD</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
