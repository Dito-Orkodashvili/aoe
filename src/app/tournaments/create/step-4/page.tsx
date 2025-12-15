import CreateTournamentLayout from "@/components/tournament/create-tournament-layout";
import { MapsForm } from "@/components/tournament/tournament-form/maps-form";

export default async function Step4({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  return (
    <CreateTournamentLayout currentStep={4}>
      <MapsForm tournamentId={id} />
    </CreateTournamentLayout>
  );
}
