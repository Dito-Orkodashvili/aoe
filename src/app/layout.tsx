import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { getUser } from "@/lib/supabase/get-user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AOE II ქართული ქომუნითი",
  openGraph: {
    title: "AOE II ქართული ქომუნითი",
    description: "Georgian Age of Empires II community website.",
    url: "https://aoe-nu.vercel.app/",
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
  children: React.ReactNode;
}>) {
  const authedUser = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background">
          <Providers>
            <Navigation authedUser={authedUser} />
            {children}
          </Providers>
        </div>
        <footer className="border-t border-border py-8 px-4">
          <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
            <p>© 2025 ქართული AoE II ქომუნითი.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
