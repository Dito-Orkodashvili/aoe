import { SettingsHero } from "@/components/sections/page-heroes";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SettingsHero />
      {children}
    </>
  );
}
