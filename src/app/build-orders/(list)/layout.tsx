import { BuildOrdersHero } from "@/components/sections/page-heroes";
import { ReactNode } from "react";

export default function BuildOrdersListLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <BuildOrdersHero />
      {children}
    </>
  );
}
