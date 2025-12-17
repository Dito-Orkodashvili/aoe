"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useSearchParams } from "next/navigation";

interface FAQItem {
  id: string;
  question: string;
  answer: ReactNode;
}

const faqItems: FAQItem[] = [
  {
    id: "how-to-install",
    question: "როგორ დავაინსტალირო (ჩავიწერო) თამაში?",
    answer: (
      <ol className="list-decimal flex flex-col gap-2">
        <li>
          თამაშის ჩასაწერად დაგჭირდება{"  "}
          <a
            href="https://store.steampowered.com/login/?redir=&redir_ssl=1"
            target="_blank"
            className="underline text-blue-400"
          >
            Steam
          </a>
          -ის ანგარიში.
        </li>
        <li>
          ანგარიშის შექმნის შემდეგ გადმოწერე და დააინსტალირე{" "}
          <a
            href="https://store.steampowered.com/about/?snr=1_60_4__global-header"
            target="_blank"
            className="underline text-blue-400"
          >
            Steam
          </a>
          , გახსენი და გაიარე ავტორიზაცია პირველ საფეხურზე შექმნილი ანგარიშით.
        </li>
        <li>
          იყიდე{" "}
          <a
            href="https://store.steampowered.com/app/813780/Age_of_Empires_II_Definitive_Edition/"
            target="_blank"
            className="underline text-blue-400"
          >
            Age of Empires II: Definitive Edition
          </a>
          .
        </li>
        <li>
          Steam-ის პროგრამაში გადადი &#34;LIBRARY&#34; ტაბზე და მენიუში აირჩიე
          Age of Empires II: Definitive Edition
        </li>
        <li>
          დააჭირე მწვანე ღილაკს &#34;Install game&#34; და დაელოდე თამაშის
          გადმოწერას და ინსტალაციას.
        </li>
        <li>ისიამოვნეთ თამაშით!</li>
      </ol>
    ),
  },
  {
    id: "find-profile-id",
    question: "როგორ ვიპოვო ჩემი ოფიციალური პროფილის ID?",
    answer: (
      <ol className="list-decimal flex flex-col gap-2">
        <li>
          გახსენი{" "}
          <a
            href="https://www.ageofempires.com/stats/ageiide/"
            target="_blank"
            className="underline text-blue-400"
          >
            ოფიციალური ვებგვერდი
          </a>{" "}
        </li>
        <li>ძებნის ველში ჩაწერე შენი თამაშის ნიქნეიმი და დააჭირე ძებნას.</li>
        <li>მოძებნილ შედეგებში დააჭირე შენს სახელს.</li>
        <li>
          URL-ში დაგხვდება შენი ID. მაგ:
          <p className="mt-2 italic">
            https://www.ageofempires.com/stats/?profileId=
            <span className="text-primary">2654497</span>&game=age2&matchType=3
          </p>
        </li>
      </ol>
    ),
  },
  {
    id: "how-to-contact",
    question: "როგორ დაგიკავშირდეთ?",
    answer: (
      <div>
        ჩვენს ოფიციალურ{" "}
        <a
          href="https://discord.gg/vcd8bGmcFN"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          Discord
        </a>{" "}
        სერვერზე შეგიძლიათ დასვათ კითხვები, მოძებნოთ მოთამაშეები ან მიიღოთ
        მხარდაჭერა.
      </div>
    ),
  },
];

export const FAQ = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openItem, setOpenItem] = useState<string>("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenItem(hash);

      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [pathname, searchParams]);

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/faq#${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="space-y-4"
      >
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            value={item.id}
            className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/30"
          >
            <AccordionTrigger className="hover:no-underline group">
              <div className="flex items-center gap-3 text-left">
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyLink(item.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      copyLink(item.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded cursor-pointer"
                  title="Copy link to this question"
                >
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                </span>
                <span>{item.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pl-8">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
        <h2 className="text-lg font-semibold mb-2">კიდევ გაქვს კითხვები?</h2>
        <a
          href="https://discord.gg/vcd8bGmcFN"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          შემოგვიერთდი დისქორდზე
        </a>
      </div>
    </div>
  );
};
