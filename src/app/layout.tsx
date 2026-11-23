import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = "Plan, register, run and measure every event in one platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Eigen Event: every event, one platform", template: "%s | Eigen Event" },
  description,
  applicationName: "Eigen Event",
  keywords: ["event management", "event registration", "conference software", "attendee check-in", "event analytics"],
  openGraph: {
    type: "website",
    siteName: "Eigen Event",
    title: "Eigen Event: every event, one platform",
    description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: "Eigen Event: every event, one platform", description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#262a32", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
