import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickySmsWidget } from "@/components/StickySmsWidget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Stop Losing Revenue to Missed Calls | Instant Quote 24/7",
  description: "Turn missed calls into instant quotes. We text you back within 3 minutes with a ballpark and next steps. Licensed, insured, 5-star rated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <StickySmsWidget />
        <Analytics />
      </body>
    </html>
  );
}
