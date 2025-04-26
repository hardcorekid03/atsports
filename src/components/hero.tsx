import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useFetchPosters } from "@/hooks/useFetchPosters";

interface LandingPageProps {
  onGetStarted: () => void;
}

function HeroSection({ onGetStarted }: LandingPageProps) {
  const posters = useFetchPosters();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      mode: "snap",
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    []
  );

  const backgroundImage =
    posters[currentSlide] ||
    "https://helios-i.mashable.com/imagery/articles/00g25aEcur2kjg9jd7L05SO/hero-image.fill.size_1248x702.v1727862489.jpg";

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next(); // Move to next slide
    }, 2500); // 1.5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [instanceRef]);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32 transition-all duration-700"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/70 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6 animate-fade-in text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Stream <span className="text-primary">Live Sports</span> Instantly
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Catch every match, race, and tournament live — anywhere, anytime. Your ultimate sports companion is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onGetStarted} className="gap-2">
                <Play className="h-5 w-5" /> Watch Now
              </Button>
              <Button size="lg" variant="outline" onClick={onGetStarted}>
                Explore Categories
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              {["HD Quality", "No Registration", "Multiple Sports"].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border animate-fade-in delay-200 md:block hidden">
          {posters.length > 0 ? (
              <div ref={sliderRef} className="keen-slider w-full h-full">
                {posters.map((poster, index) => (
                  <div key={index} className="keen-slider__slide relative">
                    <img
                      src={poster}
                      alt={`Poster ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10 flex items-center justify-center">
                      <Button
                        size="lg"
                        variant="outline"
                        className="gap-2 bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-background/30"
                        onClick={onGetStarted}
                      >
                        <Play className="h-6 w-6 fill-current" /> Watch Live
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
                Loading posters...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
