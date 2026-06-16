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
  metadataBase: new URL("https://gasparstudio.hu"),
  title: {
    default: "GasparStudio – Gáspár Bálint | Brand Designer & Logó tervezés",
    template: "%s | GasparStudio",
  },
  description:
    "Brand designer Magyarországon: logó tervezés, arculattervezés és vizuális identitás vállalkozásoknak. Olyan brandeket építek, amelyek előbb hatnak, mint ahogy megszólalnak.",
  keywords: [
    "logó tervezés",
    "arculattervezés",
    "brand designer",
    "brand identity",
    "vizuális identitás",
    "logó készítés",
    "céges arculat",
    "grafikus",
    "Magyarország",
    "Budapest",
    "GasparStudio",
    "Gáspár Bálint",
  ],
  authors: [{ name: "Gáspár Bálint" }],
  creator: "Gáspár Bálint",
  alternates: {
    canonical: "https://gasparstudio.hu",
  },
  icons: {
    icon: '/gaspar_logo_v1-01.png',
    apple: '/gaspar_logo_v1-01.png',
  },
  openGraph: {
    title: "GasparStudio – Gáspár Bálint | Brand Designer",
    description:
      "Logó tervezés, arculattervezés és vizuális identitás vállalkozásoknak. Brandek, amelyek előbb hatnak, mint ahogy megszólalnak.",
    type: "website",
    locale: "hu_HU",
    url: "https://gasparstudio.hu",
    siteName: "GasparStudio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GasparStudio – Gáspár Bálint | Brand Designer",
    description:
      "Logó tervezés, arculattervezés és vizuális identitás vállalkozásoknak.",
    images: ["/opengraph-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://gasparstudio.hu",
  name: "GasparStudio – Gáspár Bálint",
  image: "https://gasparstudio.hu/opengraph-image.png",
  url: "https://gasparstudio.hu",
  description:
    "Brand designer Magyarországon: logó tervezés, arculattervezés és vizuális identitás vállalkozásoknak.",
  areaServed: { "@type": "Country", name: "Hungary" },
  founder: {
    "@type": "Person",
    name: "Gáspár Bálint",
    jobTitle: "Brand Designer",
  },
  knowsAbout: [
    "Brand identity",
    "Logó tervezés",
    "Arculattervezés",
    "Vizuális identitás",
  ],
  sameAs: [
    "https://www.linkedin.com/in/gáspár-bálint-042721195/",
    "https://www.behance.net/gasparbalint",
    "https://www.instagram.com/gaspar_design",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
