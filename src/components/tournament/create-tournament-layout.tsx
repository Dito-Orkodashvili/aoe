import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CreateTournamentStepper } from "./create-tournament-stepper";
import { ReactNode } from "react";

interface CreateTournamentLayoutProps {
  children: ReactNode;
  currentStep: number;
}

export default function CreateTournamentLayout({
  children,
  currentStep,
}: CreateTournamentLayoutProps) {
  const totalSteps = 4;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          შექმენი ტურნირი
        </h1>
        <p className="text-muted-foreground">შეავსე ტურნირის დეტალები</p>
      </div>

      <Card className="border-2">
        <CardContent>
          <div className="mb-4">
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="mb-4"
            />
            <CreateTournamentStepper currentStep={currentStep} />
          </div>
          <div className="w-full h-[1px] bg-card border shadow-sm my-4" />
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
