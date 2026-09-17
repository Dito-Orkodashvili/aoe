import { PageHero } from "@/components/sections/hero";
import { BowArrow, Settings, Swords, Trophy } from "lucide-react";

export function PlayersHero() {
  return (
    <PageHero>
      <div className="text-center space-y-3">
        <BowArrow className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
          ქართველი მებრძოლები
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
          გაიცანი ქართველი ტოპ მეომრები და შეუერთდი ბრძოლას!
        </p>
      </div>
    </PageHero>
  );
}

export function TournamentsHero() {
  return (
    <PageHero>
      <div className="text-center space-y-3">
        <Trophy className="w-16 h-16 text-primary mx-auto animate-fade-in" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
          ტურნირები
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
          შეერკინე საუკეთესო მოთამაშეებს და დაიმკვიდრე შენი ადგილი ისტორიაში!
        </p>
      </div>
    </PageHero>
  );
}

export function BuildOrdersHero() {
  return (
    <PageHero>
      <div className="text-center space-y-3">
        <Swords className="w-16 h-16 text-primary mx-auto animate-fade-in" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
          სტრატეგიები
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
          შეისწავლე ძირითადი სტრატეგიები და მნიშვნელოვნად გააუმჯობესე თამაში.
        </p>
      </div>
    </PageHero>
  );
}

export function LobbiesHero() {
  return (
    <PageHero>
      <div className="text-center space-y-3">
        <Swords className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
          ბრძოლის ველი
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
          უყურე ლაივ ბრძოლებს ან შეუერთდი აქტიურ ლობიებს
        </p>
      </div>
    </PageHero>
  );
}

export function LeaderboardHero() {
  return (
    <PageHero>
      <div className="text-center space-y-3">
        <Trophy className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
          გლობალური <span className="text-amber-400">ლიდერბორდი</span>
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
          თვალი ადევნე მსოფლიოს საუკეთესო მებრძოლებს
        </p>
      </div>
    </PageHero>
  );
}

export function SettingsHero() {
  return (
    <PageHero>
      <div className="text-center space-y-3">
        <Settings className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
          პარამეტრები
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
          მართე შენი პროფილის პარამეტრები და პერსონალური ინფორმაცია.
        </p>
      </div>
    </PageHero>
  );
}
