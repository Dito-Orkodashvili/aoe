"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";
import type { User as UserType } from "@supabase/auth-js";
import { Menu, User, LogOut, Swords, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";

interface NavigationProps {
  authedUser: UserType | null;
}

export const Navigation = ({ authedUser }: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.push("/");
  };

  const authedUserName = authedUser?.user_metadata?.full_name;
  const authedUserAvatar = authedUser?.user_metadata?.avatar;
  const authedUserEmail = authedUser?.user_metadata?.email;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Swords className="w-6 h-6" />
            <span className="font-bold text-lg">ქართული AoE II</span>
            <Heart className="inline h-5 w-5 text-red-500 animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/tournaments"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ტურნირები
            </Link>
            <Link
              href="/players"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              მეომრები
            </Link>
            <Link
              href="/lobbies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ბრძოლის ველი
            </Link>
            <div className="flex items-center gap-2">
              {authedUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={authedUserAvatar}
                          alt={authedUserName}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(authedUserName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {authedUserName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {authedUserEmail}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile/settings">
                        <User className="mr-2 h-4 w-4" />
                        <span>პარამეტრები</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} asChild>
                      <button onClick={logout} className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>გამოსვლა</span>
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button variant="default" className="w-full">
                    Log In
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild aria-label="Open Menu" aria-controls="menu">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent id="menu">
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                    onClick={() => setOpen(false)}
                  >
                    მთავარი
                  </Link>
                  <Link
                    href="/tournaments"
                    className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                    onClick={() => setOpen(false)}
                  >
                    ტურნირები
                  </Link>
                  <Link
                    href="/players"
                    className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                    onClick={() => setOpen(false)}
                  >
                    მეომრები
                  </Link>
                  {authedUser ? (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={authedUserAvatar}
                            alt={authedUserName}
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(authedUserName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">
                            {authedUserName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {authedUserEmail}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mb-2"
                        onClick={() => setOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </Button>
                    </div>
                  ) : (
                    <Link href="/auth/login">
                      <Button variant="default" className="w-full mt-4">
                        Log In
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
