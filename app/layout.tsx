import type { Metadata } from "next";
import localFont from "next/font/local";
import BackgroundOrb from "./components/BackgroundOrb";
import "./globals.css";

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
  authors: [{ name: "Gaspar" }],
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
      className={`${sora.variable} ${dmSans.variable}`}
    >
      <body>
        <BackgroundOrb />
        {children}
      </body>
    </html>
  );
}
