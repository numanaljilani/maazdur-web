import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/components/ReduxWrapper";
import Script from "next/script";

const inter = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "Mazdur Web - Find Laborers and Contractors",
  description: "Web version of Mazdur app for service finding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <head>
      <meta name="google-adsense-account" content="ca-pub-1293944120824070"></meta>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1293944120824070"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ReduxWrapper>{children}</ReduxWrapper>
      </body>
    </html>
  );
}
