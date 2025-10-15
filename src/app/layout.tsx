import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/components/ReduxWrapper";
import Script from "next/script";




const inter = Poppins({ subsets: ["latin"], weight: "500" });

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: {
    default: 'Mazdur+ - Home Services',
    template: '%s | Mazdur+'
  },
  description: 'Find trusted service providers for all your home needs',
  generator: 'Next.js',
  applicationName: 'Mazdur+',
  referrer: 'origin-when-cross-origin',
  keywords: ['services', 'home services', 'professionals', 'mazdur'],
  authors: [{ name: 'Mazdur+' }],
  creator: 'Mazdur+',
  publisher: 'Mazdur+',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mazdur+ - Home Services',
    description: 'Find trusted service providers for all your home needs',
    url: 'https://yourdomain.com',
    siteName: 'Mazdur+',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mazdur+ - Home Services',
    description: 'Find trusted service providers for all your home needs',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  appleWebApp: {
    title: 'Mazdur+',
    statusBarStyle: 'default',
    capable: true,
  },
}

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
