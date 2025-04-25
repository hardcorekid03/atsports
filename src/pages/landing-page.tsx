import { useFetchLiveStreams } from "@/hooks/useFetchLiveStreams";
import type { Stream } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import LivePreviewSection from "../components/live-preview-section";
import Header from "@/components/header";
import HeroSection from "@/components/hero";
import FeaturedSection from "@/components/featured";
import Footer from "@/components/footer";
import CtaSection from "@/components/cta";
import HowitWorks from "@/components/how-it-works";
import FeaturedSports from "@/components/featuredSports";

export default function LandingPage() {
  const { liveStreams, loading } = useFetchLiveStreams(8);
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/live");
  const handleViewLiveGames = () => navigate("/live?tab=live");
  const handleWatchStream = (stream: Stream) =>
    navigate(`/live?tab=live&autoplay=${stream.id}`);

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Header />

      <section id="hero">
        <HeroSection onGetStarted={handleGetStarted} />
      </section>

      <section id="live">
        <LivePreviewSection
          liveStreams={liveStreams}
          loading={loading}
          onViewAll={handleViewLiveGames}
          onWatchStream={handleWatchStream}
        />
      </section>

      <section id="featured">
        <FeaturedSection onGetStarted={handleGetStarted} />
        <FeaturedSports />
      </section>

      <section id="how">
        <HowitWorks />
      </section>

      <section id="cta">
        <CtaSection onGetStarted={handleGetStarted} />
      </section>

      <Footer onGetStarted={handleGetStarted} />
    </div>
  );
}
