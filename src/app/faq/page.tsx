import { FAQ as FAQComp } from "@/components/faq";
import { PageHero } from "@/components/sections/hero";
import { ShieldQuestion } from "lucide-react";

export default function FAQ() {
  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <ShieldQuestion className="w-16 h-16 text-primary mx-auto drop-shadow-lg animate-fade-in" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
            ხშირად დასმული კითხვები
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
            იპოვე პასუხები ხშირად დასმულ კითხვებზე AoE II-ის შესახებ.
          </p>
        </div>
      </PageHero>
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <FAQComp />
        </div>
      </div>
    </>
  );
}
