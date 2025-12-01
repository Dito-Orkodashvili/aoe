import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { TournamentForm } from "@/components/tournament-form/tournament-form";

const TournamentCreate = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Create Tournament
        </h1>
        <p className="text-muted-foreground">
          Set up a new tournament for the community
        </p>
      </div>

      <Card className="border-2">
        <CardContent>
          <TournamentForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentCreate;
