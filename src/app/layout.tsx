import Cartdrawer from "@/app/components/CartDrawer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import JsonLd from "./JsonLd";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Натуральний мед з Полтавщини | Сімейна пасіка",
  description: "Без домішок, без посередників. Чистий мед від сім'ї з Полтавської області. Квітковий мед, прополіс, пилок. Понад 20 років досвіду.",
  keywords: "мед натуральний, мед з Полтавщини, квітковий мед, прополіс, бджолиний пилок, мед з пасіки, натуральний мед України",
  authors: [{ name: "Сімейна пасіка" }],
  creator: "Сімейна пасіка",
  publisher: "Сімейна пасіка",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://family-apiary-website.vercel.app/",
    title: "Натуральний мед з Полтавщини | Сімейна пасіка",
    description: "Без домішок, без посередників. Чистий мед від сім'ї з Полтавської області.",
    siteName: "Сімейна пасіка",
    images: [
      {
        url: "https://family-apiary-website.vercel.app/hero-apiary.jpg",
        width: 1200,
        height: 630,
        alt: "Натуральний мед з Полтавщини",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Натуральний мед з Полтавщини",
    description: "Без домішок, без посередників. Чистий мед від сім'ї з Полтавської області.",
  },
  alternates: {
    canonical: "https://family-apiary-website.vercel.app/",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="canonical" href="https://family-apiary-website.vercel.app/" />
        <meta name="theme-color" content="#f59e0b" />
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <Cartdrawer />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
