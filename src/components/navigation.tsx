"use client"

import { ThemeToggle } from "@/components/theme-toggle";
import { Crown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";

export const Navigation = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Crown className="w-6 h-6" />
                        <span className="font-bold text-lg">Georgian AoE II</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
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
                        <Button variant="default" size="sm">
                            Log In
                        </Button>
                        <ThemeToggle />
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <div className="flex flex-col gap-4 mt-8">
                                    <Link
                                        href="/"
                                        className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                                        onClick={() => setOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/tournaments"
                                        className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                                        onClick={() => setOpen(false)}
                                    >
                                        Tournaments
                                    </Link>
                                    <Link
                                        href="/players"
                                        className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                                        onClick={() => setOpen(false)}
                                    >
                                        Players
                                    </Link>
                                    <Button variant="default" className="w-full mt-4">
                                        Log In
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};
