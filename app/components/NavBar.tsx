// app/components/NavBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // ✅ 아이콘용

export default function NavBar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false); // ✅ 모바일 메뉴 상태
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false); // ✅ 메뉴 닫기
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      e.preventDefault();
      router.push(`/#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-14 z-50 
        ${solid ? "bg-black/90" : "bg-black/70"} 
        backdrop-blur-md border-b border-black text-white`}
    >
      <div className="h-full mx-auto max-w-[1500px] px-6 flex items-center justify-between">
        {/* ✅ 로고 */}
        <Link href="/" className="flex items-center">
          <Image
            src="/forvis_logo.png"
            alt="FORVIS"
            width={140}
            height={40}
            className="opacity-85 hover:opacity-100 transition object-contain"
            priority
          />
        </Link>

        {/* ✅ 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center gap-[60px]">
          <Link href={pathname === "/" ? "#products" : "/#products"} onClick={goSection("products")} className="hover:text-gray-300">
            제품소개
          </Link>
          <Link href={pathname === "/" ? "#quote" : "/#quote"} onClick={goSection("quote")} className="hover:text-gray-300">
            모의견적
          </Link>
          <Link href={pathname === "/" ? "#about" : "/#about"} onClick={goSection("about")} className="hover:text-gray-300">
            기업소개
          </Link>
          <Link href={pathname === "/" ? "#support" : "/#support"} onClick={goSection("support")} className="hover:text-gray-300">
            문의하기
          </Link>
        </div>

        {/* ✅ 모바일 햄버거 버튼 */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ✅ 모바일 메뉴 드롭다운 */}
        {open && (
          <div className="absolute top-14 left-0 w-full bg-black/95 flex flex-col items-center gap-6 py-8 md:hidden border-t border-white/10">
            <Link href={pathname === "/" ? "#products" : "/#products"} onClick={goSection("products")} className="text-lg hover:text-gray-300">
              제품소개
            </Link>
            <Link href={pathname === "/" ? "#quote" : "/#quote"} onClick={goSection("quote")} className="text-lg hover:text-gray-300">
              모의견적
            </Link>
            <Link href={pathname === "/" ? "#about" : "/#about"} onClick={goSection("about")} className="text-lg hover:text-gray-300">
              기업소개
            </Link>
            <Link href={pathname === "/" ? "#support" : "/#support"} onClick={goSection("support")} className="text-lg hover:text-gray-300">
              문의하기
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
