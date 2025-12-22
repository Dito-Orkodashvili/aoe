import { ReactNode } from "react";
import { ThemeAudio } from "@/components/theme-audio";

export function PageHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden py-12 px-4 flex items-center bg-hero bg-[url(/aoe/aoe_page_hero_bg.jpeg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6">{children}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

export function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden py-8 sm:py-14 lg:py-20 px-4 min-h-[50vh] lg:min-h-[70vh] flex items-center bg-hero bg-[url(/aoe/aoe_hero_bg.jpeg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      <ThemeAudio />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6">{children}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
