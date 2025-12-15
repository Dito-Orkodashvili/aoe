import CreateTournamentLayout from "@/components/tournament/create-tournament-layout";
import { StagesConfigForm } from "@/components/tournament/tournament-form/stages-config-form";

export default async function Step2({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  return (
    <CreateTournamentLayout currentStep={2}>
      <StagesConfigForm tournamentId={id} />
    </CreateTournamentLayout>
  );
}
