import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/home/SiteNav";
import { HeroVideo } from "@/components/home/HeroVideo";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { WelcomeNote } from "@/components/home/WelcomeNote";
import { StatStrip } from "@/components/home/StatStrip";
import { Pillars } from "@/components/home/Pillars";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { Curriculum } from "@/components/home/Curriculum";
import { LifeMosaic } from "@/components/home/LifeMosaic";
import { ExtraCurricular } from "@/components/home/ExtraCurricular";
import { Awards } from "@/components/home/Awards";
import { Testimonials } from "@/components/home/Testimonials";
import { Admissions } from "@/components/home/Admissions";
import { Newsletter } from "@/components/home/Newsletter";
import { VisitUs } from "@/components/home/VisitUs";
import { BrandStamp } from "@/components/home/BrandStamp";
import { SiteFooter } from "@/components/home/SiteFooter";
import { AdmissionsDrawer } from "@/components/home/AdmissionsDrawer";
import { CurriculumSheet } from "@/components/home/CurriculumSheet";
import { GalleryLightbox } from "@/components/home/GalleryLightbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Angels Specialist School International - Ghana's Best IGCSE School" },
      {
        name: "description",
        content:
          "A British-Council-recognised Cambridge International School in Tema, Ghana. From Pre-School to A Level, Angels prepares scholars from over 10 nationalities for the world ahead.",
      },
      { property: "og:title", content: "Angels Specialist School International" },
      {
        property: "og:description",
        content:
          "Ghana's Best IGCSE School (British Council 2022/23). A premium Cambridge education in Tema - for each child, at a time.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://www.angelsschool.com/images/building.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://www.angelsschool.com/images/building.jpg",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="bg-[var(--ivory)] text-[var(--ink)] overflow-x-hidden">
      <SiteNav />
      <HeroVideo />
      <TrustMarquee />
      <WelcomeNote />
      <StatStrip />
      <Pillars />
      <JourneyTimeline />
      <Curriculum />
      <LifeMosaic />
      <ExtraCurricular />
      <Awards />
      <Testimonials />
      <Admissions />
      <Newsletter />
      <VisitUs />
      <SiteFooter />
      <BrandStamp />

      <AdmissionsDrawer />
      <CurriculumSheet />
      <GalleryLightbox />
    </main>
  );
}
