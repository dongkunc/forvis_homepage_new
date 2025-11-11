"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductKey } from "../../products";
import { PRODUCTS } from "../../products";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductData = (typeof PRODUCTS)[ProductKey];
type Folder = "align" | "cis" | "sheet" | "measur";
type Props = { slug: ProductKey; page: 1 | 2 | 3 | number; product: ProductData; folder: Folder };

// 여러 줄 본문
type Tab = { key: string; title: string; body: string | string[] };

// 카피 (키 전부 소문자 통일)
const COPY: Record<
  Folder,
  {
    p1: { title: string; bullets: string[] };
    p2: { title: string; subs: string[] };
    tabs: Tab[];
  }
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
      {
        key: "method",
        title: "검사방식",
        body: ["이미지 필터링(Filter, Blurring, Sharpening)", "서브픽셀 에지/코너", "ROI(Region of Interest) 설정 및 추출"],
      },
      {
        key: "speed",
        title: "검사속도",
        body: ["원하는 속도에 맞춰", "최대 속도에 맞추어 카메라 선정 및 알고리즘 최적화"],
      },
      {
        key: "result",
        title: "불량크기",
        body: ["작은 부품까지", "um크기의 작은 부품에서 롤투롤 제품의 얼라인까지"],
      },
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
        body: [
          "정지상태에서. 한 장의 이미지로 간단하지만 정확한 불량 검출",
          "이동중에. 길이 제한이 없는 고해상도 이미지로 정확한 불량 검출",
          "1MP~50MP Area 카메라",
          "2K ~ 8K Line 카메라",
        ],
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
      { key: "camera", title: "센서", body: ["검사할 대상체에 따른 센서 결정", "공초점 변위 센서 (상/하)", "Spot Size: 300um", "측정 공차:      1um"] },
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
          "검사 Data 저장(원하는 양식에 맞게 modify 가능)및 Excel 출력 가능",
          "측정기 로그 저장으로 문제 발생시 원인 추척 가능",
          "설정 횟수만큼 반복 측정 가능",
          "Air Blow설치하여 자동 클리닉 기능 추가 가능",
          "UI에 표기된 데이터 선택하여 저장 가능",
          "Calibration Module 탑제",
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

  // refs
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [panelTop, setPanelTop] = useState(12);

  // 위치 재계산 + 컨테이너 내부로 클램프
  useEffect(() => {
    const recalc = () => {
      const el = btnRefs.current[active];
      const rightEl = rightRef.current;
      if (!el || !rightEl) return;

      const btnTop = el.getBoundingClientRect().top;
      const rightBox = rightEl.getBoundingClientRect();

      // 우측 컨테이너 기준 Y
      let nextTop = btnTop - rightBox.top;

      // 패널/컨테이너 높이로 넘침 방지
      const panelH = panelRef.current?.getBoundingClientRect().height ?? 0;
      const rightH = rightBox.height;
      const maxTop = Math.max(12, rightH - panelH - 12);
      nextTop = Math.max(12, Math.min(nextTop, maxTop));

      setPanelTop(nextTop);
    };

    recalc();
    const handler = () => recalc();
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [active]);

  // 5초 자동 이동
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => router.push(`/product/${slug}/${next}`), 5000);
    return () => clearTimeout(t);
  }, [paused, slug, next, router]);

  const detailImg = (n: 1 | 2) => `/detailpage/${folder}/image${n}.png`;
  const copy = COPY[folder];

  return (
    <main
      className="relative min-h-screen bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 상단 타이틀 */}
      <section className="max-w-[1500px] mx-auto px-8 pt-24 pb-6">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>페이지 {p} / 3</span>
          </div>
        </div>
      </section>

      {/* 페이지 1 */}
      {p === 1 && (
        <section className="max-w-[1500px] mx-auto px-8 pb-16">
          <div className="rounded-3xl bg-black text-white overflow-hidden border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <h2 className="text-[28px] font-bold mb-6">{copy.p1.title}</h2>
                <ul className="space-y-3 text-[20px] leading-relaxed">
                  {copy.p1.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[620px]">
                <Image
                  src={detailImg(1)}
                  alt={`${product.title} 상세1`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 페이지 2 */}
      {p === 2 && (
        <section className="max-w-[1500px] mx-auto px-8 pb-24">
          <div className="bg-[#f2f2f2] rounded-3xl overflow-hidden border border-black/5">
            <div className="px-10 md:px-14 pt-12 text-center">
              <div className="translate-y-[25px] space-y-3">
                <h2 className="text-[26px] md:text-[30px] font-semibold mb-6">{copy.p2.title}</h2>
                {copy.p2.subs.map((line, i) => (
                  <p key={i} className="text-[18px] md:text-[20px] font-semibold text-neutral-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative min-h-[420px] mt-1">
              <Image src={detailImg(2)} alt={`${product.title} 상세2`} fill className="object-contain translate-y-20" sizes="100vw" />
            </div>
          </div>
        </section>
      )}

      {/* 페이지 3 — 옆으로 뜨는 카드 */}
      {p === 3 && (
        <section className="max-w-[1500px] mx-auto px-8 pb-24">
          <div className="relative grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-10">
            {/* 왼쪽 리스트 */}
            <div ref={listRef} className="relative rounded-3xl bg-[#efefef] border border-black/10 p-4 md:p-6">
              <ul className="space-y-3">
                {copy.tabs.map((t) => (
                  <li key={t.key} className="relative">
                    <button
                      ref={(el) => {
                        btnRefs.current[t.key] = el;
                      }}
                      onClick={() => setActive(t.key)}
                      className={`w-full flex items-center justify-between rounded-2xl px-5 py-4 text-left transition ${
                        active === t.key ? "bg-white shadow-sm" : "bg-[#e2e2e2] hover:bg-[#dbdbdb]"
                      }`}
                    >
                      <span className="text-[18px] font-semibold">＋ {t.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 우측 제품 이미지 + 패널 */}
            <div ref={rightRef} className="relative rounded-3xl overflow-hidden bg-white border border-black/10 min-h-[540px]">
              <Image src={product.image} alt={`${product.title} 제품`} fill className="object-contain" sizes="(max-width:1024px) 100vw, 50vw" priority />

              {/* 우측에 뜨는 디테일 패널 (덮지 않음, 투명X, 오버플로우 방지) */}
              <div
                ref={panelRef}
                className="absolute z-10 rounded-2xl bg-white border border-black/10 shadow-sm"
                style={{ top: panelTop, left: 12, right: 12 }}
              >
                <div className="px-6 py-5">
                  <h3 className="text-[16px] font-bold mb-2">{copy.tabs.find((x) => x.key === active)?.title}</h3>
                  {(() => {
                    const body = copy.tabs.find((x) => x.key === active)?.body;
                    if (Array.isArray(body)) {
                      return (
                        <ul className="list-disc pl-5 text-[15px] leading-relaxed text-neutral-700 space-y-1">
                          {body.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p className="text-[15px] leading-relaxed text-neutral-700">{body}</p>;
                  })()}
                </div>
              </div>
            </div>

            {/* 모바일/태블릿: 버튼 아래로 접힘 */}
            <div className="lg:hidden -mt-6">
              {copy.tabs.map((t) =>
                active === t.key ? (
                  <div key={t.key} className="mt-3 rounded-2xl bg-white border border-black/5 px-6 py-5">
                    <h3 className="text-[16px] font-bold mb-2">{t.title}</h3>
                    {Array.isArray(t.body) ? (
                      <ul className="list-disc pl-5 text-[15px] leading-relaxed text-neutral-700 space-y-1">
                        {t.body.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[15px] leading-relaxed text-neutral-700">{t.body}</p>
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
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-white text-black rounded-full p-3 shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={36} strokeWidth={2.5} />
      </button>

      <button
        onClick={() => router.push(`/product/${slug}/${next}`)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-white text-black rounded-full p-3 shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95"
        aria-label="다음 페이지"
      >
        <ChevronRight size={36} strokeWidth={2.5} />
      </button>
    </main>
  );
}
