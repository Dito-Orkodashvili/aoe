import type { Metadata } from "next";
import { Macondo, Noto_Sans_Georgian } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { getAuthedUser } from "@/lib/supabase/user/get-authed-user";
import { Footer } from "@/components/footer";
import "./globals.css";
import { ThemeAudio } from "@/components/theme-audio";
import { Snowfall } from "@/components/christmas-decorations";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

const macondoCursive = Macondo({
  subsets: ["latin"],
  variable: "--font-macondo",
  weight: "400",
});

const notoSerif = Noto_Sans_Georgian({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["300", "400", "600", "800"],
  display: "swap",
});

const isProd = process.env.NODE_ENV !== "production";

export const metadata: Metadata = {
  metadataBase: new URL(isProd ? "https://aoe.ge/" : "https://dev.aoe.ge/"),
  title: "AOE II ქართული ქომუნითი",
  openGraph: {
    title: "AOE II ქართული ქომუნითი",
    description: "Georgian Age of Empires II community website.",
    url: isProd ? "https://aoe.ge/" : "https://dev.aoe.ge/",
    siteName: "AOE II Georgia",
    images: [
      {
        url: "/og/aoe2.png",
        width: 1200,
        height: 630,
        alt: "AOE2 Georgia Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const authedUser = await getAuthedUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${macondoCursive.variable} ${notoSerif.variable} antialiased`}
    >
      <body className="font-main">
        <div className="min-h-screen bg-background">
          <Analytics />
          <ThemeAudio />
          <Snowfall />

          <Providers>
            <Navigation authedUser={authedUser} />
            {children}
          </Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}
