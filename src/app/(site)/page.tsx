import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import WorkShowcase from "@/components/home/WorkShowcase";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ProcessSection from "@/components/home/ProcessSection";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getAllServiceImages } from "@/lib/serviceImages";
import { getAllProperties } from "@/lib/properties";
import { getAllSiteImages } from "@/lib/siteImages";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [serviceImages, properties, siteImages] = await Promise.all([
    getAllServiceImages(),
    getAllProperties(),
    getAllSiteImages(),
  ]);

  const ventasCover = properties.find((p) => p.images[0])?.images[0] ?? null;

  const workImages = [
    ...Object.values(serviceImages).flat(),
    ...properties.flatMap((p) => p.images),
  ].slice(0, 16);

  return (
    <>
      <Hero backgroundImage={siteImages.hero} cardImage={siteImages.heroCard} />
      <TrustBar />
      <ServicesGrid
        serviceImages={serviceImages}
        ventasCover={ventasCover}
        ventasCount={properties.length}
      />
      <StatsSection />
      <AboutSection backgroundImage={siteImages.about} />
      <WorkShowcase images={workImages} />
      <FeaturedProperties properties={properties} />
      <ProcessSection />
      <Testimonials />
      <FAQSection />
      <FinalCTA backgroundImage={siteImages.cta} />
    </>
  );
}
