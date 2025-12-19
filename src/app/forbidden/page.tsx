import { Home, ShieldX, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-background flex justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-background to-secondary/5" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-destructive/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-black text-foreground/5 leading-none select-none">
            403
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mx-auto mb-2 w-16 h-16">
                <ShieldX className="w-16 h-16 text-destructive/80" />
                <div className="absolute inset-0 w-16 h-16 bg-destructive/20 rounded-full blur-xl animate-pulse" />
              </div>
              <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-destructive to-destructive/60 bg-clip-text text-transparent">
                403
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          კარიბჭე ჩაკეტილია!
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          შეჩერდი, მოგზაურო. ამ კარიბჭის მიღმა შესვლა ნებადართულია მხოლოდ
          რჩეულთათვის.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              სახლში დაბრუნება
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/auth/login">
              <LogIn className="w-4 h-4" />
              ავტორიზაცია
            </Link>
          </Button>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-8 h-6 border-2 border-muted-foreground/30 rounded-t-full" />
            <div className="w-12 h-8 bg-muted-foreground/20 rounded-sm -mt-1 flex items-center justify-center">
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
