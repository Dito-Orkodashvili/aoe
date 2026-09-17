"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/auth-js";
import { createClient } from "@/lib/supabase/client";

export function useAuthedUser() {
  const [authedUser, setAuthedUser] = useState<User | null>(null);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthedUser(session?.user ?? null);
      setIsResolved(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { authedUser, isResolved };
}
