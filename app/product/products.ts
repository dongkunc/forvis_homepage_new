// 제품 데이터 (키=슬러그)
export const PRODUCTS = {
  "align-vision": {
    title: "얼라인 비전",
    description: "±1㎛ 정렬 정확도의 얼라인 검사 장비.",
    image: "/froduct/product1.png",
    specs: ["정렬 오차 ±1㎛", "텔레센트릭 렌즈", "AI 패턴 분석"],
  },
  "cis-vision": {
    title: "CIS 검사 비전",
    description: "롤투롤 필름/시트 고속 검사 시스템.",
    image: "/froduct/product2.png",
    specs: ["8192 Line CIS", "최대 1200mm 폭", "실시간 불량 검출"],
  },
  "confocal": {
    title: "공초점 두께 측정기",
    description: "비접촉 공초점 방식 미세 두께 정밀 측정.",
    image: "/froduct/product3.png",
    specs: ["0~2000μm", "정확도 ±0.1μm", "다양 소재 지원"],
  },
  "sheet-vision": {
    title: "시트검사 비전",
    description: "시트 표면 결함 AI 자동 검출.",
    image: "/froduct/product4.png",
    specs: ["AI 분류", "적응형 조명", "실시간 통계"],
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
export const SLUGS: ProductKey[] = Object.keys(PRODUCTS) as ProductKey[];

// 상세 이미지 폴더 매핑 (D:\site\forvis_homepage_new\public\detailpage\...)
export const DETAIL_FOLDER: Record<ProductKey, "align" | "cis" | "sheet" | "measur"> = {
  "align-vision": "align",
  "cis-vision": "cis",
  "confocal": "measur",
  "sheet-vision": "sheet",
};
