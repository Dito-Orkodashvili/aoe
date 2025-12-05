import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const profileIds = searchParams.get("profileIds");

  if (!profileIds) {
    return NextResponse.json({ error: "Missing profileIds" }, { status: 400 });
  }

  const url = `https://aoe-api.worldsedgelink.com/community/leaderboard/GetPersonalStat?title=age2&profile_ids=${profileIds}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch player stats" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
