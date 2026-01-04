import type { Metadata } from "next";
import { Macondo, Noto_Sans_Georgian } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { getAuthedUser } from "@/lib/supabase/user/get-authed-user";
import { Footer } from "@/components/footer";
import "./globals.css";
import { ThemeAudio } from "@/components/theme-audio";
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

const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://aoe.ge/"),
  title: {
    default: "aoe.ge — ქართული Age of Empires II ქომუნითი",
    template: "%s — aoe.ge",
  },
  description:
    "aoe.ge — ქართული Age of Empires II ქომუნითი. ტურნირები, სტრიმები, მოთამაშეები და სიახლეები.",
  applicationName: "aoe.ge",
  keywords: [
    "Age of Empires II",
    "Age of Empires II: Definitive Edition",
    "AoE II",
    "Age of Empires Georgia",
    "ქართული AoE",
    "AoE II ტურნირები",
    "RTS თამაშები",
    "Age of Empires esports",
  ],
  authors: [{ name: "aoe.ge" }],
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: isProd ? "https://aoe.ge/" : "https://dev.aoe.ge/",
    siteName: "aoe.ge",
    title: "aoe.ge — ქართული Age of Empires II ქომუნითი",
    description:
      "aoe.ge — ქართული Age of Empires II ქომუნითი. ტურნირები, სტრიმები, მოთამაშეები და სიახლეები.",
    images: [
      {
        url: "/og/aoe2.png",
        width: 1200,
        height: 630,
        alt: "AOE2 Georgia Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "aoe.ge — ქართული Age of Empires II ქომუნითი",
    description:
      "aoe.ge — ქართული Age of Empires II ქომუნითი. ტურნირები, სტრიმები, მოთამაშეები და სიახლეები.",
    images: ["/og/aoe2.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://aoe.ge/",
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
      lang="ka"
      suppressHydrationWarning
      className={`${macondoCursive.variable} ${notoSerif.variable} antialiased`}
    >
      <body className="font-main">
        <div className="min-h-screen bg-background">
          <Analytics />
          <ThemeAudio />

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
