import type { Metadata } from "next";
import { Roboto, Caveat } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from '@/redux/provider';
import Navigation from "@/components/Navigation/Navigation";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${caveat.variable} antialiased bg-primary-light-gray`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
