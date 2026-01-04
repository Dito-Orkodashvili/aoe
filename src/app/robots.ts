import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";
  console.log("isProd", isProd);
  return {
    rules: {
      userAgent: "*",
      allow: isProd ? "/" : undefined,
      disallow: isProd ? undefined : "/",
    },
    sitemap: isProd ? "https://aoe.ge/sitemap.xml" : undefined,
  };
}
