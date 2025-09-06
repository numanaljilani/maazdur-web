import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter,Poppins } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/components/ReduxWrapper";

const inter = Poppins({subsets:["latin"],weight:'500'});

export const metadata = {
  title: 'Mazdur Web - Find Laborers and Contractors',
  description: 'Web version of Mazdur app for service finding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
      <body className={inter.className}>
       <ReduxWrapper>
          {children}
 </ReduxWrapper>
    
      </body>
    </html>
  );
}
