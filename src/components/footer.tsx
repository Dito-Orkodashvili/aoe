import Link from "next/link";
import { Heart, MessageCircle, Twitch, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigate
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/tournaments"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Tournaments
              </Link>
              <Link
                href="/players"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Players
              </Link>
              <Link
                href="/donations"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Support Tournaments
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Community
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="https://discord.gg/VUXdpQZU"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Discord
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                YouTube
              </a>
              <a
                href="https://twitch.tv/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Twitch
              </a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Tournament Rules
              </a>
              <a
                href="#"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Getting Started
              </a>
              <a
                href="#"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                FAQ
              </a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://discord.gg/VUXdpQZU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@teamgeorgia-aoe2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://www.twitch.tv/team_georgia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                aria-label="Twitch"
              >
                <Twitch className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 container mx-auto px-4 py-4">
          <p className="text-xs text-muted-foreground">
            Made with <Heart className="inline h-3 w-3 text-red-500" /> for the
            community. &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
