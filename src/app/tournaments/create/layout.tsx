import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/supabase/auth/is-admin";
import { ReactNode } from "react";

export default async function CreateTournamentLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isAdmin())) {
    redirect("/forbidden");
  }

  return <>{children}</>;
}
