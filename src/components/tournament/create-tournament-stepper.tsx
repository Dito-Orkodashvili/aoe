import { cn } from "@/lib/utils";
import { Map, Trophy, Users } from "lucide-react";

interface CreateTournamentStepperProps {
  currentStep: number;
}

export function CreateTournamentStepper({
  currentStep,
}: CreateTournamentStepperProps) {
  const steps = [
    { icon: Trophy, label: "Basic Information" },
    { icon: Trophy, label: "Stage Configuration" },
    { icon: Users, label: "Participants" },
    { icon: Map, label: "Maps" },
  ];

  return (
    <div className="flex justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const StepIcon = step.icon;

        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div
            key={stepNumber}
            className={cn(
              "flex flex-col items-center gap-2",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : isCompleted
                    ? "bg-primary/20 border-primary"
                    : "bg-background border-border",
              )}
            >
              <StepIcon className="w-5 h-5" />
            </div>

            <span className="text-sm font-medium">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
