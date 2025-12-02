import { ReactNode } from "react";

export function PageHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden py-12 px-4 flex items-center bg-hero bg-[url(/aoe_page_hero_bg.jpeg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6">{children}</div>
      </div>
    </section>
  );
}

export function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden py-28 px-4 min-h-[70vh] flex items-center bg-hero bg-[url(/aoe_hero_bg.jpeg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6">{children}</div>
      </div>
    </section>
  );
}
