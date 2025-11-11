import HomeHeroOnly from "./components/HomeHeroOnly";
import ProductCarouselSection from "./components/ProductCarouselSection";
import CustomerRequestSection from "./components/CustomerRequestSection";
import MockQuoteSection from "./components/MockQuoteSection";
import AboutPage from "./components/AboutPage";
import SupportBoard from "./components/SupportBoard"; // ✅ 추가

export default function Page() {
  return (
    <>
      <HomeHeroOnly />
      <ProductCarouselSection />
      <CustomerRequestSection />
      <MockQuoteSection />
      <AboutPage />
      <SupportBoard /> {/* ✅ 고객지원 섹션 추가 */}
    </>
  );
}
