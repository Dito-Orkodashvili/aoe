import { Castle, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/sections/hero";
import { FaDiscord, FaTwitch, FaYoutube } from "react-icons/fa";
import { getTournamentsCount } from "@/lib/supabase/tournament/get-tournaments-count";
import { getPlayersCount } from "@/lib/supabase/player/get-players-count";
import ReactCountryFlag from "react-country-flag";

export default async function Home() {
  const playersCount = await getPlayersCount();
  const tournamentsCount = await getTournamentsCount();

  return (
    <>
      <Hero>
        <div className="flex justify-center mb-6">
          <Image
            src="/aoe/monaspa.png"
            alt="Monaspa"
            width={80}
            height={85}
            className="animate-fade-in"
          />
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground animate-fade-in">
          ქართული AoE II ქომუნითი
        </h1>
        <p className="text-l md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in mb-8">
          შემოგვიერთდი და გაიგე ნამდვილი RTS-ის გემო!
        </p>
        <div className="max-w-[52rem] mx-auto animate-fade-in">
          <div className="bg-background/60 backdrop-blur-sm border border-border rounded-xl p-5 text-left">
            <div className="text-gray-300 text-sm md:text-base leading-relaxed text-left">
              <p className="mb-2">
                თუ არასდროს გიცდია ერთი სვლით რამდენიმე სვლის წინასწარ გათვლა,
                მაშინ ეს თამაში შენთვის არ არის!
              </p>
              <p className="mb-2">
                ეს არის ლეგენდარული სტრატეგიული თამაში, რომელშიც მთავარია
                დაგეგმვა, ადაპტაცია და ზუსტი მანევრირება მტრის გასანადგურებლად.
              </p>
              <p className="mb-2">
                <span className="text-secondary font-bold">
                  Age Of Empires II
                </span>{" "}
                არის მათთვის, ვისთვისაც აზროვნება და გონებრივი უნარები უფრო
                მნიშვნელოვანია, ვიდრე მექანიკური სისწრაფე.
              </p>
              <p className="mb-2">
                აქ შეგიძლია მართო 50-ზე მეტი შუა საუკუნეების ცივილიზაცია, მათ
                შორის{" "}
                <span className="text-secondary font-bold whitespace-nowrap">
                  საქართველოც{" "}
                  <ReactCountryFlag
                    className="text-sm"
                    countryCode="ge"
                    aria-label="საქართველო"
                    svg
                  />
                </span>
              </p>
              <p className="mb-2">
                როგორც ჭადრაკში — აქაც არ არსებობს უმნიშვნელო გადაწყვეტილებები!
              </p>
              <p className="mb-2">
                როგორც ცხოვრებაში — აქაც მხოლოდ ჭკვიანურ სტრატეგიას მოაქვს
                გამარჯვება.
              </p>
              <p className="mb-2">
                თუ მიგაჩნია, რომ ლოგიკა და სწრაფი აზროვნება შენი ძლიერი მხარეა,
                მაშინ მოსინჯე ძალები ყველაზე რთულ სტრატეგიულ თამაშში!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-4 animate-fade-in">
          <Link href="/players">
            <Button
              size="lg"
              className="w-[14rem] gap-2 px-8 py-6 bg-primary hover:bg-primary text-white shadow-[0_0_30px_hsl(var(--primary)_/_0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)_/_0.5)] transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              მეომრები
            </Button>
          </Link>
          <Link href="/tournaments">
            <Button
              size="lg"
              variant="secondary"
              className="w-[14rem] gap-2 px-8 py-6 bg-secondary hover:bg-secondary text-white shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300"
            >
              <Trophy className="w-5 h-5" />
              ტურნირები
            </Button>
          </Link>
        </div>
        <div className="md:pt-6 lg:pt-8 animate-fade-in">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">
            გვიყურე ლაივში
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <a
              href="https://discord.gg/sgCBeedxDu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-[#5865f2] border border-white/10 hover:border-[#5865f2] rounded-full text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              <FaDiscord className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Discord</span>
            </a>
            <a
              href="https://www.youtube.com/@teamgeorgia-aoe2"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-red-600/90 border border-white/10 hover:border-red-500 rounded-full text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              <FaYoutube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">იუთუბი</span>
            </a>
            <a
              href="https://www.twitch.tv/team_georgia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-purple-600/90 border border-white/10 hover:border-purple-500 rounded-full text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              <FaTwitch className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">ტვიტჩი</span>
            </a>
          </div>
        </div>
      </Hero>
      <section className="py-10 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">
            რატომ უნდა შემოგვიერთდე?
          </h2>
          <Card className="border-2 hover:border-primary transition-all hover-scale mb-8 px-6">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center">
              <span className="text-secondary font-bold">
                Age of Empires II
              </span>{" "}
              გამოსვლიდან 27 წლის შემდეგაც კი რჩება სტრატეგიული ჟანრის
              მწვერვალზე. გაუმჯობესებული ინტერფეისი და მექანიკა, 50-ზე მეტი
              ისტორიული ცივილიზაცია — მათ შორის ქართველები — თამაშს უნიკალურ
              სიღრმესა და მრავალფეროვნებას სძენს. შეგიძლიათ, შემოგვიერთდეთ და
              ერთად ვითამაშოთ როგორც გუნდური, ასევე ინდივიდუალური (1 vs 1)
              მატჩები.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all hover-scale">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>
                  <Link href="/players" className="hover:underline">
                    აქტიური ქომუნითი
                  </Link>
                </CardTitle>
                <CardDescription>
                  ემეგობრე ქართველ მოთამაშეებს, გაუზიარე სტრატეგიები და
                  გააუმჯობესე შენი თამაში
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-secondary transition-all hover-scale">
              <CardHeader>
                <Trophy className="w-12 h-12 text-secondary mb-4" />
                <CardTitle>
                  <Link href="/tournaments" className="hover:underline">
                    სისტემატიური ტურნირები
                  </Link>
                </CardTitle>
                <CardDescription>
                  მიიღე მონაწილეობა ყოველკვირეულ ტურნირებში და იბრძოლე
                  ღირსებისთვის
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent transition-all hover-scale">
              <CardHeader>
                <Castle className="w-12 h-12 text-accent mb-4" />
                <CardTitle>გუნდური თამაშები</CardTitle>
                <CardDescription>
                  იპოვე თანაგუნდელები რეიტინგული და არარეიტინგული მატჩებისთვის
                  ნებისმიერ დროს
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-5xl font-bold text-primary">{playersCount}+</p>
              <p className="text-xl text-muted-foreground">აქტიური წევრი</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-secondary">
                {tournamentsCount}+
              </p>
              <p className="text-xl text-muted-foreground">
                ჩატარებული ტურნირი
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-accent">24/7</p>
              <p className="text-xl text-muted-foreground">
                აქტიური მოთამაშეები
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6 text-center space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                მზად ხარ შემოგვიერთდე?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                დამწყებს თუ პროფესიონალს, ყველას შეუძლია ჩვენი ქომუნითის ნაწილი
                გახდეს.
              </p>
              <Button asChild size="lg" className="gap-2">
                <a
                  href="https://discord.gg/sgCBeedxDu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Users className="w-5 h-5" />
                  შემოგვიერთდი დისქორდზე
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
