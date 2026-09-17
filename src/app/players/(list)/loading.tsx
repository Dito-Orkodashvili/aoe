import { PlayersListSkeleton } from "@/components/players-list-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      <PlayersListSkeleton />
    </div>
  );
}
