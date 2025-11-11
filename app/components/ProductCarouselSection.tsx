// app/components/ProductCarouselSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [stepPx, setStepPx] = useState(420); // ✅ 화면 크기에 따라 이동 거리
  const prefersReducedMotion = useRef(false);
  const touchStartX = useRef<number | null>(null);

  // ✅ 반응형 간격 계산 (모바일/태블릿/데스크탑)
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = m.matches;

    const calc = () => {
      const w = window.innerWidth;
      if (w < 480) setStepPx(240);
      else if (w < 768) setStepPx(280);
      else if (w < 1024) setStepPx(380);
      else if (w < 1440) setStepPx(460);
      else setStepPx(520);
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);

  // ✅ 자동 슬라이드 (접근성 옵션/호버 시 일시정지)
  useEffect(() => {
    if (paused || images.length <= 1 || prefersReducedMotion.current) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [paused, images.length]);

  // ✅ 키보드 좌우 이동
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrent((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    setPaused(false);
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setCurrent((p) => (p + 1) % images.length);
      else setCurrent((p) => (p - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="products"
      className={`scroll-mt-14 min-h-[70vh] md:min-h-screen text-black flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        images[current] ? "bg-white" : "bg-white"
      }`}
      aria-label="제품 소개"
    >
      {/* 타이틀 */}
      <div className="w-full max-w-7xl px-5 md:px-12 -mb-2 md:-mb-4">
        <h2 className="font-semibold tracking-tight leading-snug pl-2 md:pl-3 text-[28px] sm:text-[34px] md:text-[42px]">
          제품소개
        </h2>
        <p className="pl-2 md:pl-3 mt-1">
          <span className="text-black text-[18px] sm:text-[22px] md:text-[24px]">
            완성된 제품.
          </span>
          <span className="text-neutral-500 font-semibold ml-2 md:ml-3 text-[16px] sm:text-[20px] md:text-[22px]">
            완벽한 검사 장비
          </span>
        </p>
      </div>

      {/* 슬라이드 영역 */}
      <div
        className="relative flex items-center justify-center w-full max-w-7xl h-[460px] sm:h-[560px] md:h-[660px] lg:h-[760px] select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* 좌우 그라데이션 마스킹(애플 느낌) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

        {images.map((item, i) => {
          const offset = i - current;
          const isCenter = offset === 0;

          const style: React.CSSProperties = {
            transform: `translateX(${offset * stepPx}px) scale(${isCenter ? 1 : 0.86})`,
            opacity: isCenter ? 1 : 0.35,
            zIndex: isCenter ? 20 : 1,
            transition: "transform .55s ease, opacity .55s ease",
            willChange: "transform, opacity",
          };

          return (
            <Link
              key={i}
              href={`/product/${item.slug}`}
              style={style}
              className="absolute"
              onMouseEnter={() => isCenter && setPaused(true)}
              onMouseLeave={() => isCenter && setPaused(false)}
              aria-label={`${item.title} 상세로 이동`}
            >
              <div className="rounded-3xl p-1 md:p-1.5 bg-black/5 backdrop-blur-sm hover:scale-[1.02] transition-transform">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={560}
                  height={760}
                  priority={isCenter}
                  className="
                    rounded-xl object-contain
                    w-[250px] h-[340px]
                    sm:w-[300px] sm:h-[400px]
                    md:w-[380px] md:h-[520px]
                    lg:w-[460px] lg:h-[640px]
                    xl:w-[520px] xl:h-[700px]
                  "
                />
              </div>
              <p className="text-center font-semibold mt-3 md:mt-4 text-[14px] sm:text-[15px] md:text-[16px]">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>

      {/* 점 네비 */}
      <div className="flex gap-2.5 mt-4 md:mt-6 mb-6 md:mb-2" role="tablist" aria-label="슬라이드 선택">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`슬라이드 ${i + 1}로 이동`}
            aria-selected={i === current}
            role="tab"
            className={`h-2.5 w-2.5 rounded-full transition
              ${i === current ? "bg-black" : "bg-gray-400/50 hover:bg-gray-600/70"}
            `}
          />
        ))}
      </div>
    </section>
  );
}
