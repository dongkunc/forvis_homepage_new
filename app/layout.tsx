import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FORVIS · For Your Vision",
  description: "머신비전 · 검사 자동화 솔루션",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <NavBar />
        {/* 고정 네비 높이만큼 여백 */}
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
