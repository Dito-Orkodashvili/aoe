import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function PlayerDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/players"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        მეომრების სია
      </Link>

      {children}
    </main>
  );
}
