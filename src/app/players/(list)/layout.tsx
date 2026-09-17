import { PlayersHero } from "@/components/sections/page-heroes";
import { ReactNode } from "react";

export default function PlayersListLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PlayersHero />
      {children}
    </>
  );
}
