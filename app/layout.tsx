import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
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
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
