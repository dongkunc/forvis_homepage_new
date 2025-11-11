"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ 페이지 이동용

type Item = { src: string; title: string; slug: string };

export default function ProductCarouselSection() {
  const images: Item[] = useMemo(
    () => [
      { src: "/froduct/product1.png", title: "얼라인 비전", slug: "align-vision" },
      { src: "/froduct/product2.png", title: "CIS 검사 비전", slug: "cis-vision" },
      { src: "/froduct/product3.png", title: "공초점 두께 측정기", slug: "confocal" },
      { src: "/froduct/product4.png", title: "시트검사 비전", slug: "sheet-vision" },
    ],
    []
  );

  const [current, setCurrent] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(id);
  }, [paused, images.length]);

  return (
    <section
      id="products"
      className={`scroll-mt-14 min-h-screen text-black flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        images[current] ? "bg-[#ffffff]" : "bg-white"
      }`}
    >
      {/* 제목 */}
        <div className="w-full max-w-7xl px-6 md:px-12 -mb-15">
            <h2
                className="font-semibold text-left pl-[30px] tracking-widest leading-[1.2]"
                style={{
                fontSize: "42px", // ✅ 제목 폰트 크기 (원하는 크기로 변경 가능)
                lineHeight: "2",
                }}
            >
                제품소개
            </h2>
            <p className="text-left pl-[30px] leading-2">
                <span
                    className="text-black tracking-normal"
                    style={{ fontSize: "25px" }}
                >
                    완성된 제품.
                </span>
                <span
                    className="text-neutral-400 font-semibold tracking-wide ml-[15px]" // ✅ 문장 사이 여백
                    style={{ fontSize: "22px" }}
                >
                    완벽한 검사 장비
                </span>
                </p>
            </div>
      {/* 슬라이드 */}
      <div
        className="relative flex items-center justify-center w-full max-w-7xl h-[900px] md:h-[1000px] select-none"
      >
        {images.map((item, i) => {
          const offset = i - current;
          const isCenter = offset === 0;
          const style: React.CSSProperties = {
            transform: `translateX(${offset * 500}px) scale(${isCenter ? 1 : 0.8})`,
            opacity: isCenter ? 1 : 0.3,
            zIndex: isCenter ? 20 : 0,
            transition: "transform .55s ease, opacity .55s ease",
          };

          return (
            <Link
              key={i}
              href={`/product/${item.slug}`} // ✅ 클릭 시 상세 페이지로 이동
              style={style}
              className="absolute"
              onMouseEnter={() => isCenter && setPaused(true)}
              onMouseLeave={() => isCenter && setPaused(false)}
            >
              <div className="bg-[#EAEAEA]/20 rounded-3xl p-1 md:p-1 backdrop-blur-sm hover:scale-105 transition-transform">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={900}
                  priority={isCenter}
                  className="rounded-xl object-contain w-[380px] md:w-[480px] h-[600px] md:h-[720px]"
                />
              </div>
              <p className="text-lg font-semibold mt-5 text-center">{item.title}</p>
            </Link>
          );
        })}
      </div>

      {/* 점 네비 */}
      <div className="flex gap-3 mt-10 translate-y-[-40px] -mb-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`go to slide ${i + 1}`}
            className={`h-3.5 w-3.5 rounded-full transition ${
              i === current ? "bg-black" : "bg-gray-400/50 hover:bg-gray-500/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
