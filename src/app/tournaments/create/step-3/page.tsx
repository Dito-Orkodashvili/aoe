import CreateTournamentLayout from "@/components/tournament/create-tournament-layout";
import { ParticipantsForm } from "@/components/tournament/tournament-form/participants-form";

export default async function Step3({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  return (
    <CreateTournamentLayout currentStep={3}>
      <ParticipantsForm tournamentId={id} />
    </CreateTournamentLayout>
  );
}
