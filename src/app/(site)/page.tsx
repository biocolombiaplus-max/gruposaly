import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ProcessSection from "@/components/home/ProcessSection";
import Testimonials from "@/components/home/Testimonials";
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

  return (
    <>
      <Hero />
      <ServicesGrid
        serviceImages={serviceImages}
        ventasCover={ventasCover}
        ventasCount={properties.length}
      />
      <StatsSection />
      <AboutSection />
      <FeaturedProperties properties={properties} />
      <ProcessSection />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
