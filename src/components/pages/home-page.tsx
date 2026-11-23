import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { HomeHero } from "@/components/sections/home/home-hero";

export function HomePage() {
  return (
    <>
      <PublicHeader cta={false} />
      <main>
        <HomeHero />
      </main>
      <Footer />
    </>
  );
}