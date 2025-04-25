import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

function ctaSection({ onGetStarted }: LandingPageProps) {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Watching?
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Join thousands of sports fans who are already enjoying our premium
          streaming service.
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={onGetStarted}
          className="gap-2"
        >
          <Play className="h-4 w-4" /> Launch Streaming App
        </Button>
      </div>
    </section>
  );
}

export default ctaSection;
