import { Card, CardContent } from "@/components/ui/card";
interface LandingPageProps {
    onGetStarted: () => void;
  }
  

function FeaturedSection({ onGetStarted }: LandingPageProps) {
  return (
    <section className="py-16 bg-muted/30">
    {/* Content remains the same */}
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Featured Sports Categories
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore a wide range of sports from around the world, all
          available to stream in high definition.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { name: "Basketball", icon: "🏀" },
          { name: "Football", icon: "⚽" },
          { name: "Baseball", icon: "⚾" },
          { name: "Ice Hockey", icon: "🏒" },
          { name: "Combat Sports", icon: "🥊" },
          { name: "Wrestling", icon: "🤼" },
        ].map((category) => (
          <Card
            key={category.name}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={onGetStarted}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FeaturedSection