import CreateTournamentLayout from "@/components/tournament/create-tournament-layout";
import { BasicInfoForm } from "@/components/tournament/tournament-form/basic-info-form";

export default function Step1() {
  return (
    <CreateTournamentLayout currentStep={1}>
      <BasicInfoForm />
    </CreateTournamentLayout>
  );
}
