import { LobbiesHero } from "@/components/sections/page-heroes";
import { ReactNode } from "react";

export default function LobbiesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LobbiesHero />
      {children}
    </>
  );
}
