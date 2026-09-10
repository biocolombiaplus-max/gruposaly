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

export const dynamic = "force-dynamic";

export default async function Home() {
  const [serviceImages, properties] = await Promise.all([
    getAllServiceImages(),
    getAllProperties(),
  ]);

  const ventasCover = properties.find((p) => p.images[0])?.images[0] ?? null;

  const workImages = [
    ...Object.values(serviceImages).flat(),
    ...properties.flatMap((p) => p.images),
  ].slice(0, 16);

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid
        serviceImages={serviceImages}
        ventasCover={ventasCover}
        ventasCount={properties.length}
      />
      <StatsSection />
      <AboutSection />
      <WorkShowcase images={workImages} />
      <FeaturedProperties properties={properties} />
      <ProcessSection />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
