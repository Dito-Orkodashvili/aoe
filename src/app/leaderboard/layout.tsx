import { LeaderboardHero } from "@/components/sections/page-heroes";
import { ReactNode } from "react";

export default function LeaderboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <LeaderboardHero />
      {children}
    </>
  );
}
