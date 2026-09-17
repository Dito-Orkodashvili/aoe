import { TournamentsHero } from "@/components/sections/page-heroes";
import { ReactNode } from "react";

export default function TournamentsListLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <TournamentsHero />
      {children}
    </>
  );
}
