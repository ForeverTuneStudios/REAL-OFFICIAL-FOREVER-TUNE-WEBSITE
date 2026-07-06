import HeroSection from "@/components/HeroSection";
import YouTubeVideosSection from "@/components/YouTubeVideosSection";
import AllPlatformsSection from "@/components/AllPlatformsSection";
import AboutPreview from "@/components/AboutPreview";
import SocialSection from "@/components/SocialSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <YouTubeVideosSection />
      <AllPlatformsSection />
      <AboutPreview />
      <SocialSection />
    </>
  );
}
