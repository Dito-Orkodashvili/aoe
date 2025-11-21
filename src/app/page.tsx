import { Castle, Shield, Swords, Trophy, Users } from "lucide-react";
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

export default async function Home() {
  return (
    <>
      <Hero>
        <div className="flex justify-center mb-6">
          <Image
            src="/monaspa.png"
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
        <div className="flex gap-4 justify-center pt-4 animate-fade-in">
          <Button asChild size="lg" className="gap-2">
            <a
              href="https://discord.gg/mVQqsBwA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Users className="w-5 h-5" />
              დისქორდი
            </a>
          </Button>
          <Link href="/tournaments">
            <Button size="lg" variant="outline" className="gap-2">
              <Trophy className="w-5 h-5" />
              ტურნირები
            </Button>
          </Link>
        </div>
      </Hero>
      {/* Features Section */}
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

      {/* Stats Section */}
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
                  href="https://discord.gg/mVQqsBwA"
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
