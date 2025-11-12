// app/requests/detail/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // ✅ 아이콘

export default function RequestDetailPage() {
  const TOTAL = 2;
  const [page, setPage] = useState<0 | 1>(0);

  // 키보드 좌우
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPage(1);
      if (e.key === "ArrowLeft") setPage(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 스와이프
  const sx = useRef(0), sy = useRef(0), ex = useRef(0), ey = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    sx.current = ex.current = t.clientX;
    sy.current = ey.current = t.clientY;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    ex.current = t.clientX; ey.current = t.clientY;
  };
  const onTouchEnd = () => {
    const dx = ex.current - sx.current, dy = ey.current - sy.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      setPage(dx < 0 ? 1 : 0);
    }
  };

  const nextPage = () => setPage(1);
  const prevPage = () => setPage(0);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* 상단 타이틀 + 우측 페이지 표시 */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-8 pt-20 md:pt-24 pb-4 md:pb-6">
        <div className="flex items-end justify-between">
          <h1 className="text-[22px] sm:text-3xl md:text-4xl font-semibold tracking-tight">
            고객 맞춤형 프로그램
          </h1>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>페이지 {page + 1} / {TOTAL}</span>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section
        id="program"
        className="mx-auto max-w-[1500px] px-5 sm:px-6 md:px-12 pb-10 md:pb-14 scroll-mt-20 md:scroll-mt-24"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative rounded-3xl overflow-hidden bg-black">
          {page === 0 ? <PageOneImmediate /> : <PageTwo />}
        </div>
      </section>

      {/* ✅ 좌/우 화살표: 화면 고정 + 높은 z-index */}
      <button
        onClick={prevPage}
        className="fixed left-3 sm:left-5 bottom-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 
                   bg-white/95 text-black rounded-full p-2.5 sm:p-3 shadow-md hover:shadow-lg 
                   transition-all active:scale-95 backdrop-blur 
                   supports-[env(safe-area-inset-left)]:left-[max(0.75rem,env(safe-area-inset-left))]
                   z-[80]"
        aria-label="이전"
      >
        <ChevronLeft size={28} className="sm:hidden" />
        <ChevronLeft size={36} className="hidden sm:block" />
      </button>
      <button
        onClick={nextPage}
        className="fixed right-3 sm:right-5 bottom-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 
                   bg-white/95 text-black rounded-full p-2.5 sm:p-3 shadow-md hover:shadow-lg 
                   transition-all active:scale-95 backdrop-blur 
                   supports-[env(safe-area-inset-right)]:right-[max(0.75rem,env(safe-area-inset-right))]
                   z-[80]"
        aria-label="다음"
      >
        <ChevronRight size={28} className="sm:hidden" />
        <ChevronRight size={36} className="hidden sm:block" />
      </button>
    </main>
  );
}

/* ---- 페이지1 ---- */
function PageOneImmediate() {
  const copy = [
    "고객의 고유한 요구와 목표를 반영한 Custom Program을 제공합니다.",
    "특별한 사항을 명확히 충족시키기 위해 유연하고 개인화된 접근으로 설계합니다.",
    "사업 환경·비즈니스 모델·시장 목표에 맞춰 최적화된 솔루션을 제안합니다.",
    "기대 그 이상을 위해 모든 제품과 서비스는 ‘완벽’을 목표로 설계됩니다.",
  ];

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 md:gap-10 items-center p-6 sm:p-8 md:p-12 lg:p-16 min-h-[520px] md:min-h-[560px] lg:min-h-[600px] text-white">
      <div className="space-y-4 md:space-y-5">
        <div className="space-y-2.5 md:space-y-3 text-white/85 leading-relaxed text-[15px] sm:text-[16px] md:text-[18px]">
          {copy.map((line, i) => (<p key={i} className="tracking-[-0.01em]">{line}</p>))}
        </div>
      </div>
      <div className="relative h-[380px] sm:h-[420px] md:h-[500px] lg:h-[520px]">
        <div className="absolute left-4 right-10 top-8 bottom-8 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-[30]">
          <MaskedImage src="/CustomerRequestSection/report.png" alt="report" />
        </div>
        <div className="absolute -top-2 right-0 w-[78%] h-[46%] sm:w-[76%] sm:h-[48%] rounded-2xl overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)] z-[40]">
          <MaskedImage src="/CustomerRequestSection/ui.png" alt="ui" />
        </div>
        <div className="absolute -bottom-2 right-2 w-[60%] h-[44%] sm:w-[56%] sm:h-[46%] rotate-[9deg] rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)] z-[50]">
          <MaskedImage src="/CustomerRequestSection/graph.png" alt="graph" />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/20 via-transparent to-black/10 z-[5]" />
      </div>
    </div>
  );
}

/* ---- 페이지2 ---- */
function PageTwo() {
  const items = [
    { title: "영상처리 기술", desc: ["이미지 필터링(Filter, Blurring, Sharpening)", "에지 검출(Edge Detection) – Canny, Sobel, 허프변환", "이진화(Binarization) – Normal, Otsu, Adaptive Threshold", "형태학적 연산 – Erosion, Dilation, Opening, Closing", "객체 추적 – Centroid Tracking, Kalman Filter", "영상 정합(Image Registration) – Pattern Matching", "ROI 설정 및 추출", "컬러 스페이스 변환 – RGB ↔ HSV, YCrCb"] },
    { title: "인공지능/딥러닝", desc: ["분류(Classification) – CNN 기반", "객체 탐지 – YOLO", "문자 인식(OCR)"] },
    { title: "소프트웨어 개발", desc: ["C++ / Python 개발", "멀티스레딩 / 비동기 처리 – OpenMP", "DB 연동 / MFC UI"] },
    { title: "하드웨어 연동", desc: ["GigE Vision / USB3 Vision / Camera Link", "GenICam / GenTL (표준 카메라 프로토콜)", "프레임 그래버 SDK", "디지털 I/O, Serial (RS232/RS485)", "PLC (Melsec, Siemens, OPC UA, EtherCAT)", "TCP/IP, UDP 통신", "광센서, 거리센서 등", "모션 제어"] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 p-6 sm:p-8 md:p-12 lg:p-16 min-h-[520px] md:min-h-[560px] lg:min-h-[600px] text-white">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 md:p-8 backdrop-blur-sm">
          <div className="text-xl sm:text-[22px] md:text-2xl font-semibold mb-3.5 md:mb-4 text-[#6cb8ff] border-b border-[#6cb8ff]/30 pb-2">
            {`${i + 1}. ${it.title}`}
          </div>
          <ul className="list-disc list-inside text-white/80 space-y-1.5 text-[14px] sm:text-[15px] md:text-[15px] leading-relaxed">
            {it.desc.map((line, idx) => (<li key={idx}>{line}</li>))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---- 공통: 이미지 ---- */
function MaskedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
