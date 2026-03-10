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
  title: {
    default: "OmniComm — Never Lose a Missed Call Again",
    template: "%s | OmniComm",
  },
  description: "AI-powered missed-call text-back and lead recovery for local businesses. Instant SMS, AI conversations, real-time dashboard. Start in 10 minutes.",
  openGraph: {
    title: "OmniComm — Never Lose a Missed Call Again",
    description: "AI-powered missed-call text-back and lead recovery for local businesses.",
    type: "website",
  },
};

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
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
    </ClerkProvider>
  );
}
