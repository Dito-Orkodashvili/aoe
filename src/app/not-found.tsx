import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-2 animate-bounce" />
              <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                404
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          დაკარგული მიწა
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          შენ გასცდი ნაცნობ ტერიტორიას.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              სახლში დაბრუნება
            </Link>
          </Button>
        </div>

        <div className="mt-16 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
