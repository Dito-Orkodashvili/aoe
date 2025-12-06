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

export default async function Home() {
  return (
    <>
      <Hero>
        <div className="flex justify-center mb-6">
          <Image
            src="/aoe/monaspa.png"
            alt="Monaspa"
            width={80}
            height={88}
            className="animate-fade-in"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
          ქართული AoE II ქომუნითი
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          შემოგვიერთდი და გაიგე ნამდვილი RTS-ის გემო!
        </p>
        <div className="pt-12 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://discord.gg/VUXdpQZU"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-[#5865f2] border border-white/10 hover:border-[#5865f2] rounded-full text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              <FaDiscord className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">დისქორდი</span>
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            რატომ უნდა შემოგვიერთდე?
          </h2>
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
                <CardTitle>სისტემატიური ტურნირები</CardTitle>
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
              <p className="text-5xl font-bold text-primary">500+</p>
              <p className="text-xl text-muted-foreground">აქტიური წევრი</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-secondary">100+</p>
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

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6 text-center space-y-6">
              <h2 className="text-4xl font-bold text-foreground">
                მზად ხარ შემოგვიერთდე?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                დამწყებს თუ პროფესიონალს, ყველას შეუძლია ჩვენი ქომუნითის ნაწილი
                გახდეს.
              </p>
              <Button asChild size="lg" className="gap-2">
                <a
                  href="https://discord.gg/VUXdpQZU"
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
