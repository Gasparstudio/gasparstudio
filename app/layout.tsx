import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import PageTransition from "./components/PageTransition";
import LangPill from "./components/LangPill";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = localFont({
  src: "../public/fonts/Sora/Sora-VariableFont_wght.ttf",
  variable: "--font-sora",
  display: "swap",
});

const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GASPAR · Brand Designer",
  description: "Brand designer creating visual identities that feel before they speak. Budapest-based, globally thinking.",
  keywords: ["brand designer", "visual identity", "logo design", "Budapest", "graphic design"],
  authors: [{ name: "Gáspár Bálint" }],
  openGraph: {
    title: "GASPAR · Brand Designer",
    description: "Brands that feel before they speak.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${sora.variable} ${dmSans.variable} ${inter.variable}`}
    >
      <body>
        <LanguageProvider>
          <LangPill />
          <PageTransition>
            {children}
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}
