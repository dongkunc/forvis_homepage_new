import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포비스 FORVIS | 비전 검사 솔루션 전문기업",
  description:
    "포비스(FORVIS)는 2차전지, 필름, 전극 등 산업용 머신비전 검사 및 자동화 솔루션을 제공하는 기업입니다.",
  keywords: [
  "포비스",
  "FORVIS",
  "머신비전",
  "머신비젼",
  "비전검사",
  "비전시스템",
  "자동광학검사",
  "AOI",
  "2차전지 검사",
  "필름검사",
  "전극검사",
  "R2R 검사",
  "롤투롤 검사",
  "공정 자동화",
  "산업용 카메라",
  "이미지 처리",
  "비전 솔루션",
  "검사 장비",
],
  openGraph: {
    title: "포비스 FORVIS | For Your Vision",
    description:
      "포비스(FORVIS)는 산업용 머신비전 검사 및 자동화 솔루션 전문기업입니다.",
    url: "https://forvis.io",
    siteName: "FORVIS",
    images: ["/og_image.png"],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <NavBar />
        {/* 고정 네비 높이만큼 여백 */}
        <main className="pt-3">{children}</main>

        {/* ✅ Footer 추가 */}
        <footer className="mt-8 border-t border-white/10 py-10 text-sm text-gray-400 text-center">
          <p>상호: (주)포비스 | FORVIS Inc.</p>
          <p>사업자등록번호: 289-81-03292</p>
          <p>주소: 충청남도 천안시 서북구 2공단 1로 1158호 (천안자이타워)</p>
          <p>이메일: admin@forvis.io | 전화: 070.8018.5517</p>
          <p className="mt-2 text-xs text-gray-500">
            © {new Date().getFullYear()} FORVIS. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
