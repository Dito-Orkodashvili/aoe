import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calculator,
  Calendar,
  CircleDollarSign,
  Info,
  Swords,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrizePoolInfo } from "@/components/tournament/prize-pool-info";
import { TournamentInfo } from "@/components/tournament/tournament-info";
import { ParticipantsInfo } from "@/components/tournament/participants-info";
import { notFound } from "next/navigation";
import { getTournamentBySlug } from "@/lib/supabase/tournament/get-tournament-details";
import { formatDate } from "@/lib/utils";
import { MatchCard } from "@/components/tournament/match-card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/hero";
import { TournamentStatus } from "@/components/tournament/tournament-status";
import { TournamentActionBar } from "@/components/tournament/tournament-action-bar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TournamentSidebar } from "@/components/tournament/tournament-sidebar";
import { TournamentDetailsHeader } from "@/components/tournament/tournament-details-header";
import { TournamentDetailsTabs } from "@/components/tournament/tournament-details-tabs";

const TournamentDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await getTournamentBySlug(slug);

  if (!res.ok || !res.data) {
    notFound();
  }

  const tournament = res.data;

  return (
    <>
      <TournamentDetailsTabs tournament={tournament} />

      {/* Tournament Stats */}
      {/*<section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Tournament Statistics
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {tournament.participants.length}
                </p>
                <p className="text-muted-foreground">Total Players</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-secondary mb-2">
                  {tournament.matches.length}
                </p>
                <p className="text-muted-foreground">Matches Played</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-accent mb-2">
                  {tournament.prize_pool} GEL
                </p>
                <p className="text-muted-foreground">Prize Pool</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>*/}
    </>
  );
};

export default TournamentDetails;
