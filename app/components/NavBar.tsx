// app/components/NavBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 홈이면 부드럽게 스크롤, 아니면 /#섹션 으로 이동
  const goSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // 다른 페이지 → 홈으로 이동 + 해시
      e.preventDefault();
      router.push(`/#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-14 z-50 
        ${solid ? "bg-black" : "bg-black"} 
        backdrop-blur-md border-b border-black`}
    >
      <div className="h-full mx-auto max-w-[1500px] px-8 flex items-center justify-center text-white">
        {/* ✅ 로고 + 메뉴 그룹 */}
        <div className="flex items-center gap-[60px]">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <Image
              src="/forvis_logo.png"
              alt="FORVIS"
              width={160}
              height={50}
              className="opacity-85 hover:opacity-100 transition object-contain"
              priority
            />
          </Link>

          {/* 메뉴 */}
          <div className="flex items-center gap-[80px]">
            <Link href={pathname === "/" ? "#products" : "/#products"} onClick={goSection("products")} className="text-sm text-white hover:text-white">
              제품소개
            </Link>
            <Link href={pathname === "/" ? "#quote" : "/#quote"} onClick={goSection("quote")} className="text-sm text-white hover:text-white">
              모의견적
            </Link>
            <Link href={pathname === "/" ? "#about" : "/#about"} onClick={goSection("about")} className="text-sm text-white hover:text-white">
              기업소개
            </Link>
            <Link href={pathname === "/" ? "#support" : "/#support"} onClick={goSection("support")} className="text-sm text-white hover:text-white">
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
