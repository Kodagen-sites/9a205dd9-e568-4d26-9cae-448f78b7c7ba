import type { Metadata } from "next";
import { Outfit, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";
import { FilmGrain, Vignette, ScrollProgress } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import { buildMeta } from "@/lib/seo";

const display = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = buildMeta();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.seo.htmlLang}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ScrollProgress />
        <Header />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
        <FilmGrain opacity={0.04} />
        <Vignette color="rgba(58,61,69,0.18)" />
      </body>
    </html>
  );
}
