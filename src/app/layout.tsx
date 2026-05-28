import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Intro } from "@/components/Intro";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FloatingJoin } from "@/components/FloatingJoin";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farias Soccer Academy — Nova Scotia",
  description:
    "Farias Soccer Academy develops the next generation of footballers in Nova Scotia. Our passion is the beautiful game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-fsa-black text-fsa-bone grain">
        <Intro />
        <SmoothScroll>
          <Nav />
          <main className="relative">{children}</main>
        </SmoothScroll>
        <ScrollToTop />
        <FloatingJoin />
      </body>
    </html>
  );
}
