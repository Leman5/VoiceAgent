import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { LazyMotion, domMax } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CookieNotice } from "@/components/ui/CookieNotice";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VoiceBot - Never Miss A Call Again | AI Receptionist for Small Business",
    template: "%s | VoiceBot - AI Phone Answering",
  },
  description: "AI phone answering service for small businesses. Sounds human, works 24/7, costs $49/month. Book appointments, take messages, answer FAQs. Try free for 14 days.",
  keywords: ["ai receptionist", "virtual receptionist", "phone answering service", "small business", "ai phone system"],
  authors: [{ name: "VoiceBot Team" }],
  creator: "VoiceBot",
  publisher: "VoiceBot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://voicebot.ai"), // Update with actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VoiceBot - Never Miss A Call Again | AI Receptionist for Small Business",
    description: "AI phone answering service for small businesses. Sounds human, works 24/7, costs $49/month.",
    url: "https://voicebot.ai",
    siteName: "VoiceBot",
    images: [
      {
        url: "/og-image.png", // Path to generated OG image
        width: 1200,
        height: 630,
        alt: "VoiceBot - Modern AI Phone Answering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceBot - Never Miss A Call Again | AI Receptionist for Small Business",
    description: "AI phone answering service for small businesses. Sounds human, works 24/7.",
    images: ["/twitter-image.png"], // Path to generated Twitter image
    creator: "@voicebot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased bg-black text-white`}
      >
        <LazyMotion features={domMax}>
          <JsonLd />
          <Navigation />
          {children}
          <CookieNotice />
          <Analytics />
        </LazyMotion>
      </body>
    </html>
  );
}
