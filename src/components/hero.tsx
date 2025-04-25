import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

function HeroSection({ onGetStarted }: LandingPageProps) {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Watch Live Sports{" "}
              <span className="text-primary">Anytime, Anywhere</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Stream your favorite games, matches, and tournaments from around
              the world with our premium sports streaming platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onGetStarted} className="gap-2">
                <Play className="h-4 w-4" /> Watch Now
              </Button>
              <Button size="lg" variant="outline" onClick={onGetStarted}>
                Explore Categories
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>HD Quality</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No Registration</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Multiple Sports</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl border">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10 flex items-center justify-center">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-background/20 backdrop-blur-sm border-white/20 text-white hover:bg-background/30"
                onClick={onGetStarted}
              >
                <Play className="h-5 w-5 fill-current" /> Watch Live
              </Button>
            </div>
            <img
              src="https://helios-i.mashable.com/imagery/articles/00g25aEcur2kjg9jd7L05SO/hero-image.fill.size_1248x702.v1727862489.jpg"
              alt="Sports streaming preview"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
