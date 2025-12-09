export async function getPlayerCivStats(profileId: string | null) {
  if (!profileId) return null;

  const url = `https://data.aoe2companion.com/api/profiles/${profileId}?language=en&extend=stats,profiles.avatar_medium_url,profiles.avatar_full_url&page=1`;

  try {
    // const res = await fetch(url, {
    //   next: {
    //     revalidate: 300,
    //   },
    //   cache: "force-cache",
    // });
    // if (!res.ok) {
    //   console.error("API failed:", await res.text());
    //   return null;
    // }
    //
    // return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}
