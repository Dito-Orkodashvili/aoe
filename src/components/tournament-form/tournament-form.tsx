"use client";

import { Button } from "@/components/ui/button";
import { createTournament } from "@/app/tournaments/actions";

import { Progress } from "@/components/ui/progress";
import { Map, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, startTransition, useState } from "react";
import { DetailsStep } from "./details-step";
import { ParticipantsStep } from "./participants-step";
import { MapsStep } from "./maps-step";
import {
  TTournamentDetails,
  TDetailsErrors,
} from "@/lib/types/tournament.types";
import { TMap } from "@/lib/types/map.types";
import { TPlayer } from "@/lib/types/player.types";
import { TournamentDetailsSchema } from "@/lib/schemas/tournament.schema";
import { useRouter } from "next/navigation";

export const TournamentForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [participants, setParticipants] = useState<TPlayer[]>([]);
  const [errors, setErrors] = useState<TDetailsErrors | null>(null);
  const [maps, setMaps] = useState<TMap[]>([]);
  const [details, setDetails] = useState<TTournamentDetails>({
    name: "",
    description: "",
    max_participants: 2,
    best_of: 21,
    prize_pool: 0,
    type: "single_stage",
    format: "single_elim",
    visibility: "public",
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === 1) {
      const validatedDetails = TournamentDetailsSchema.safeParse(details);
      const isValid = validatedDetails.success;

      if (!isValid) {
        setErrors(validatedDetails.error.format());
      } else {
        setCurrentStep(2);
        setErrors(null);
      }
    } else if (currentStep === 2) {
      if (participants.length === 0) {
        toast({
          title: "No Participants",
          description: "Please add at least one participant.",
          variant: "destructive",
        });
      } else {
        setCurrentStep(3);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (maps.length === 0) {
      toast({
        title: "No Maps",
        description: "Please add at least one map.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const res = await createTournament({
        details,
        participants,
        maps,
      });

      if (res?.slug) {
        toast({
          title: "Tournament Created!",
          description: `Tournament has been successfully created.`,
          variant: "success",
        });
        router.push(`/tournaments/${res.slug}`);
      }
    });
  };

  const stepIcons = [
    { icon: Trophy, label: "Details" },
    { icon: Users, label: "Participants" },
    { icon: Map, label: "Maps" },
  ];

  return (
    <div className="">
      <div className="mb-4">
        <Progress value={(currentStep / 3) * 100} className="mb-4" />
        <div className="flex justify-between">
          {stepIcons.map((step, index) => {
            const StepIcon = step.icon;
            const stepNumber = index + 1;
            return (
              <div
                key={stepNumber}
                className={cn(
                  "flex flex-col items-center gap-2",
                  currentStep === stepNumber
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2",
                    currentStep === stepNumber
                      ? "bg-primary text-primary-foreground border-primary"
                      : currentStep > stepNumber
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
      </div>
      <div className="w-full h-[1px] bg-card border shadow-sm mb-4" />
      <div>
        <div className="mb-4">
          <div className="mb-1">
            {currentStep === 1 && "Tournament Details"}
            {currentStep === 2 && "Add Participants"}
            {currentStep === 3 && "Add Maps"}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentStep === 1 &&
              "Fill in the basic information for your tournament"}
            {currentStep === 2 && "Add players or teams that will participate"}
            {currentStep === 3 && "Add the maps that will be played"}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div hidden={currentStep !== 1}>
              <DetailsStep
                details={details}
                setDetails={setDetails}
                errors={errors}
              />
            </div>
            <div hidden={currentStep !== 2}>
              <ParticipantsStep
                participants={participants}
                setParticipants={setParticipants}
              />
            </div>
            <div hidden={currentStep !== 3}>
              <MapsStep maps={maps} setMaps={setMaps} />
            </div>

            <div className="flex gap-4 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNext();
                  }}
                  className="flex-1"
                >
                  Save and Continue
                </Button>
              ) : (
                <Button type="submit" className="flex-1">
                  Finish
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
