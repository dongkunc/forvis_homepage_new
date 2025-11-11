// app/product/[slug]/DetailStep.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductKey } from "../../products";
import { PRODUCTS } from "../../products";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductData = (typeof PRODUCTS)[ProductKey];
type Folder = "align" | "cis" | "sheet" | "measur";
type Props = { slug: ProductKey; page: 1 | 2 | 3 | number; product: ProductData; folder: Folder };

// 여러 줄 본문
type Tab = { key: string; title: string; body: string | string[] };

// ── 카피 데이터 (키 소문자 통일)
const COPY: Record<
  Folder,
  { p1: { title: string; bullets: string[] }; p2: { title: string; subs: string[] }; tabs: Tab[] }
> = {
  align: {
    p1: {
      title: "얼라인 비전",
      bullets: [
        "부품 조립/전극/필름 부착 위치 검증 최적화된 비전",
        "미세 부품조립부터 롤투롤 생산 보정까지",
        "이 모든 것을 구현해 드립니다.",
      ],
    },
    p2: {
      title: "정렬·검증 알고리즘",
      subs: ["제일 중요한 커스텀 프로그래밍", "디자인부터 기능까지", "모든 항목을 사용자 우선으로."],
    },
    tabs: [
      {
        key: "camera",
        title: "카메라",
        body: [
          "정지상태에서. 한 장의 이미지로 간단하지만 정교한 위치 확인",
          "이동중에. 길이 제한이 없는 고해상도 이미지로 정교한 위치 확인",
          "1MP~50MP Area 카메라",
          "2K ~ 8K Line 카메라",
        ],
      },
      {
        key: "light",
        title: "조명",
        body: ["불량의 시인성에 따라 선택", "반사조명. 빛의 반사를 통하여 불량검출", "투과조명. 빛의 투과량을 통하여 불량검출", "그외. 제품에 맞는 맞춤 조명 솔루션"],
      },
      {
        key: "pc",
        title: "PC/소프트웨어",
        body: ["SW. 레시피 관리, 통계/리포트, 트레이스 로그", "PC. 검사속도에 반영하여", "일반검사. CPU i5, RAM 16Gb, SSD 500Gb, Window 10", "고속/딥러닝 검사. 일반검사에 GPU 추가, CPU i9"],
      },
      { key: "method", title: "검사방식", body: ["이미지 필터링(Filter, Blurring, Sharpening)", "서브픽셀 에지/코너", "ROI(Region of Interest) 설정 및 추출"] },
      { key: "speed", title: "검사속도", body: ["원하는 속도에 맞춰", "최대 속도에 맞추어 카메라 선정 및 알고리즘 최적화"] },
      { key: "result", title: "불량크기", body: ["작은 부품까지", "um크기의 작은 부품에서 롤투롤 제품의 얼라인까지"] },
    ],
  },
  cis: {
    p1: {
      title: "롤투롤 전면 검사",
      bullets: ["CIS 카메라 기반 전면 스캔", "왜곡없는 이미지, 폭 측정·결함 검출 최적화", "설치공간 최소화로 공간 활용성 최대."],
    },
    p2: {
      title: "대면적 인라인 스캐닝",
      subs: ["제일 중요한 커스텀 프로그래밍", "디자인부터 기능까지", "모든 항목을 사용자 우선으로."],
    },
    tabs: [
      {
        key: "camera",
        title: "카메라",
        body: ["검사할 대상체에 따른 카메라 결정", "이동중에. 길이 제한이 없는 고해상도 이미지로 정교한 위치 확인", "600Dpi ~ 900Dpi. Line 카메라", "300mm ~ 1500mm. Line 카메라"],
      },
      {
        key: "light",
        title: "조명",
        body: ["불량의 시인성에 따라 선택", "반사조명. 빛의 반사를 통하여 불량검출", "투과조명. 빛의 투과량을 통하여 불량검출", "그외. 제품에 맞는 맞춤 조명 솔루션"],
      },
      {
        key: "pc",
        title: "PC/소프트웨어",
        body: ["SW. 레시피 관리, 통계/리포트, 트레이스 로그", "PC. 검사속도에 반영하여", "일반검사. CPU i5, RAM 16Gb, SSD 500Gb, Window 10", "고속/딥러닝 검사. 일반검사에 GPU 추가, CPU i9"],
      },
      {
        key: "method",
        title: "검사방식",
        body: [
          "이미지 필터링(Filter, Blurring, Sharpening)",
          "서브픽셀 에지/코너",
          "ROI(Region of Interest) 설정 및 추출",
          "이진화(Binarization) ",
          "형태학적 연산(Morphological Operations)",
          "객체 추적(Object Tracking)",
          "영상 정합(Image Registration) ",
        ],
      },
      { key: "speed", title: "검사속도", body: ["원하는 속도에 맞춰", "30kHz ~ 60kHz"] },
      { key: "result", title: "불량크기", body: ["작은 불량까지", "um크기의 작은 불량에서 mm크기의 불량까지 검출 가능"] },
    ],
  },
  sheet: {
    p1: {
      title: "시트 단위 검사",
      bullets: ["시트 단위 검사에 최적화", "공간, 검사속도, 검사제품, 찾아내고 싶은 불량의 크기", "에지 서브픽셀 추출로 μm 단위 급 반복 정밀도", "이 모든 것을 구현해 드립니다."],
    },
    p2: {
      title: "내가 원하는 것은.",
      subs: ["제일 중요한 커스텀 프로그래밍", "디자인부터 기능까지", "모든 항목을 사용자 우선으로."],
    },
    tabs: [
      {
        key: "camera",
        title: "카메라",
        body: ["정지상태에서. 한 장의 이미지로 간단하지만 정확한 불량 검출", "이동중에. 길이 제한이 없는 고해상도 이미지로 정확한 불량 검출", "1MP~50MP Area 카메라", "2K ~ 8K Line 카메라"],
      },
      { key: "light", title: "조명", body: ["불량의 시인성에 따라 선택", "반사조명. 빛의 반사를 통하여 불량검출", "투과조명. 빛의 투과량을 통하여 불량검출", "그외. 제품에 맞는 맞춤 조명 솔루션"] },
      { key: "pc", title: "PC/소프트웨어", body: ["SW. 레시피 관리, 통계/리포트, 트레이스 로그", "PC. 검사속도에 반영하여", "일반검사. CPU i5, RAM 16Gb, SSD 500Gb, Window 10", "고속/딥러닝 검사. 일반검사에 GPU 추가, CPU i9"] },
      {
        key: "method",
        title: "검사방식",
        body: [
          "이미지 필터링(Filter, Blurring, Sharpening)",
          "서브픽셀 에지/코너",
          "ROI(Region of Interest) 설정 및 추출",
          "이진화(Binarization) ",
          "형태학적 연산(Morphological Operations)",
          "객체 추적(Object Tracking)",
          "영상 정합(Image Registration) ",
        ],
      },
      { key: "speed", title: "검사속도", body: ["원하는 속도에 맞춰", "최대 속도에 맞추어 카메라 선정 및 알고리즘 최적화"] },
      { key: "result", title: "불량크기", body: ["작은 불량까지", "um크기의 작은 불량에서 mm크기의 불량까지 검출 가능"] },
    ],
  },
  measur: {
    p1: {
      title: "비접촉 두께/변위 측정",
      bullets: ["공초점/레이저 변위 센서, 제품과 직접 접촉 없음", "제품 손상 최소화", "μm 단위 정밀 측정 솔루션"],
    },
    p2: { title: "정밀 계측 알고리즘", subs: ["제일 중요한 커스텀 프로그래밍", "디자인부터 기능까지", "모든 항목을 사용자 우선으로."] },
    tabs: [
      { key: "camera", title: "센서", body: ["검사할 대상체에 따른 센서 결정", "공초점 변위 센서 (상/하)", "Spot Size: 300um", "측정 공차: 1um"] },
      {
        key: "motion",
        title: "구동방식",
        body: ["안정적인", "Belt Type 서보모터", "전면 커버 구성으로 안정성 확보", "석정반을 통한 정밀도 상승", "Needs에 맞는 맞춤 설계"],
      },
      { key: "pc", title: "PC/소프트웨어", body: ["SW. 레시피 관리, 통계/리포트, 트레이스 로그", "PC. 측정 속도에 반영하여", "표준 PC. CPU i5, RAM 16Gb, SSD 500Gb, Window 10"] },
      {
        key: "method",
        title: "각종기능",
        body: [
          "측정에 더한 편리한 기능",
          "검사 Data 저장(원하는 양식에 맞게 modify 가능) 및 Excel 출력 가능",
          "측정기 로그 저장으로 문제 발생시 원인 추적 가능",
          "설정 횟수만큼 반복 측정 가능",
          "Air Blow 설치하여 자동 클리닝 기능 추가 가능",
          "UI에 표기된 데이터 선택하여 저장 가능",
          "Calibration Module 탑재",
        ],
      },
    ],
  },
};

export default function DetailStep({ slug, page, product, folder }: Props) {
  const p = Math.max(1, Math.min(3, Number(page))) as 1 | 2 | 3;
  const prev = (p === 1 ? 3 : (p - 1)) as 1 | 2 | 3;
  const next = (p === 3 ? 1 : (p + 1)) as 1 | 2 | 3;

  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(COPY[folder].tabs[0].key);

  // 접근성(모션 최소화 시 자동 이동 중지)
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // refs
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [panelTop, setPanelTop] = useState(12);

  // 패널 위치 재계산(리사이즈/스크롤/탭 변경)
  useEffect(() => {
    const recalc = () => {
      const el = btnRefs.current[active];
      const rightEl = rightRef.current;
      if (!el || !rightEl) return;

      const btnTop = el.getBoundingClientRect().top;
      const rightBox = rightEl.getBoundingClientRect();

      let nextTop = btnTop - rightBox.top;

      const panelH = panelRef.current?.getBoundingClientRect().height ?? 0;
      const rightH = rightBox.height;
      const maxTop = Math.max(12, rightH - panelH - 12);
      nextTop = Math.max(12, Math.min(nextTop, maxTop));

      setPanelTop(nextTop);
    };

    recalc();
    const onScroll = () => recalc();
    const onResize = () => recalc();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [active]);

  // 5초 자동 이동(호버/포커스/모션설정 시 중지)
  useEffect(() => {
    if (paused || prefersReducedMotion.current) return;
    const t = setTimeout(() => router.push(`/product/${slug}/${next}`), 5000);
    return () => clearTimeout(t);
  }, [paused, slug, next, router]);

  // 모바일 스와이프(페이지 전환)
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX ?? null;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    setPaused(false);
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) {
      if (dx < 0) router.push(`/product/${slug}/${next}`);
      else router.push(`/product/${slug}/${prev}`);
    }
    touchStartX.current = null;
  };

  // 키보드 ←/→
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") router.push(`/product/${slug}/${next}`);
      if (e.key === "ArrowLeft") router.push(`/product/${slug}/${prev}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, slug, next, prev]);

  const detailImg = (n: 1 | 2) => `/detailpage/${folder}/image${n}.png`;
  const copy = useMemo(() => COPY[folder], [folder]);

  return (
    <main
      className="relative min-h-screen bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label={`${product.title} 상세 페이지`}
    >
      {/* 상단 타이틀 */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-8 pt-20 md:pt-24 pb-4 md:pb-6">
        <div className="flex items-end justify-between">
          {/* ✅ 모바일은 진한 검정, 데스크탑은 거의-검정 */}
          <h1 className="text-[22px] md:text-3xl font-semibold text-black md:text-neutral-900">
            {product.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>페이지 {p} / 3</span>
          </div>
        </div>
      </section>

      {/* 페이지 1 */}
      {p === 1 && (
        <section className="max-w-[1500px] mx-auto px-5 md:px-8 pb-14 md:pb-16">
          <div className="rounded-3xl bg-black text-white overflow-hidden border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center">
                <h2 className="text-[24px] md:text-[28px] font-bold mb-4 md:mb-6">{copy.p1.title}</h2>
                <ul className="space-y-2.5 md:space-y-3 text-[17px] md:text-[20px] leading-relaxed">
                  {copy.p1.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[360px] sm:min-h-[480px] md:min-h-[620px]">
                <Image
                  src={detailImg(1)}
                  alt={`${product.title} 상세1`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 700px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 페이지 2 */}
      {p === 2 && (
        <section className="max-w-[1500px] mx-auto px-5 md:px-8 pb-20 md:pb-24">
          <div className="bg-[#f2f2f2] rounded-3xl overflow-hidden border border-black/5">
            <div className="px-6 md:px-10 lg:px-14 pt-10 md:pt-12 text-center">
              <div className="translate-y-[16px] md:translate-y-[25px] space-y-2 md:space-y-3">
                {/* ✅ 모바일에서 title/문구 선명하게 */}
                <h2 className="text-[22px] md:text-[30px] font-semibold text-black md:text-neutral-900 mb-4 md:mb-6">
                  {copy.p2.title}
                </h2>
                {copy.p2.subs.map((line, i) => (
                  <p
                    key={i}
                    className="text-[16px] md:text-[20px] font-semibold text-black md:text-neutral-800 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative min-h-[300px] sm:min-h-[380px] md:min-h-[420px] mt-1">
              <Image
                src={detailImg(2)}
                alt={`${product.title} 상세2`}
                fill
                className="object-contain translate-y-10 md:translate-y-20"
                sizes="(max-width:768px) 100vw, 1000px"
                priority={false}
              />
            </div>
          </div>
        </section>
      )}

      {/* 페이지 3 — 옆으로 뜨는 카드 */}
      {p === 3 && (
        <section className="max-w-[1500px] mx-auto px-5 md:px-8 pb-20 md:pb-24">
          <div className="relative grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-6 md:gap-10">
            {/* 왼쪽 리스트 */}
            <div className="relative rounded-3xl bg-[#efefef] border border-black/10 p-4 md:p-6">
              <ul className="space-y-3" role="tablist" aria-label="상세 항목">
                {copy.tabs.map((t) => (
                  <li key={t.key} className="relative">
                    <button
                      ref={(el) => {
                        btnRefs.current[t.key] = el;
                      }}
                      onClick={() => setActive(t.key)}
                      role="tab"
                      aria-selected={active === t.key}
                      aria-controls={`panel-${t.key}`}
                      className={`w-full flex items-center justify-between rounded-2xl px-5 py-4 text-left transition
                        ${active === t.key ? "bg-white shadow-sm" : "bg-[#e2e2e2] hover:bg-[#dbdbdb]"}
                      `}
                    >
                      {/* ✅ 모바일/데스크탑 모두 텍스트 선명하게 */}
                      <span className="text-[16px] md:text-[18px] font-semibold text-black md:text-neutral-900">
                        ＋ {t.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 우측 패널 영역 (✅ 이미지 삭제) */}
            <div
              ref={rightRef}
              className="relative rounded-3xl overflow-hidden bg-white border border-black/10 min-h-[420px] sm:min-h-[480px] md:min-h-[540px]"
            >
              {/* 이미지 삭제 → 패널만 뜨게 유지 */}
              <div
                ref={panelRef}
                id={`panel-${active}`}
                role="tabpanel"
                aria-live="polite"
                className="absolute z-10 rounded-2xl bg-white/95 backdrop-blur-sm border border-black/10 shadow-sm left-3 right-3 md:left-4 md:right-4"
                style={{ top: panelTop }}
              >
                <div className="px-6 py-5">
                  <h3 className="text-[16px] font-bold text-black md:text-neutral-900 mb-2">
                    {copy.tabs.find((x) => x.key === active)?.title}
                  </h3>
                  {(() => {
                    const body = copy.tabs.find((x) => x.key === active)?.body;
                    if (Array.isArray(body)) {
                      return (
                        <ul className="list-disc pl-5 text-[15px] leading-relaxed text-black md:text-neutral-800 space-y-1">
                          {body.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p className="text-[15px] leading-relaxed text-black md:text-neutral-800">
                        {body}
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* 모바일/태블릿: 버튼 아래 아코디언 표시 */}
            <div className="lg:hidden -mt-2">
              {copy.tabs.map((t) =>
                active === t.key ? (
                  <div key={t.key} className="mt-3 rounded-2xl bg-white border border-black/5 px-5 py-4">
                    <h3 className="text-[15px] md:text-[16px] font-bold text-black md:text-neutral-900 mb-2">
                      {t.title}
                    </h3>
                    {Array.isArray(t.body) ? (
                      <ul className="list-disc pl-5 text-[14px] md:text-[15px] leading-relaxed text-black md:text-neutral-800 space-y-1">
                        {t.body.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[14px] md:text-[15px] leading-relaxed text-black md:text-neutral-800">
                        {t.body}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* 좌우 화살표 */}
      <button
        onClick={() => router.push(`/product/${slug}/${prev}`)}
        className="fixed left-3 sm:left-5 bottom-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 bg-white/95 text-black rounded-full p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all active:scale-95 backdrop-blur supports-[env(safe-area-inset-left)]:left-[max(0.75rem,env(safe-area-inset-left))]"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={28} className="sm:hidden" />
        <ChevronLeft size={36} className="hidden sm:block" />
      </button>

      <button
        onClick={() => router.push(`/product/${slug}/${next}`)}
        className="fixed right-3 sm:right-5 bottom-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 bg-white/95 text-black rounded-full p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all active:scale-95 backdrop-blur supports-[env(safe-area-inset-right)]:right-[max(0.75rem,env(safe-area-inset-right))]"
        aria-label="다음 페이지"
      >
        <ChevronRight size={28} className="sm:hidden" />
        <ChevronRight size={36} className="hidden sm:block" />
      </button>
    </main>
  );
}
