import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const redirectUrl = new URL("/auth/login", request.url);
  const response = NextResponse.redirect(redirectUrl);

  const supabase = await createClient();

  await supabase.auth.signOut();

  return response;
}
