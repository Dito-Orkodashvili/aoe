import { ThemeToggle } from "./theme-toggle";
import { Crown } from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const Navigation = () => {
    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Crown className="w-6 h-6" />
                        <span className="font-bold text-lg">Georgian AoE II</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/tournaments"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Tournaments
                        </Link>
                        <Link
                            href="/players"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Players
                        </Link>
                        <div className="fixed top-4 right-4 z-50">
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    შესვლა
                                </Button>
                            </Link>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};
