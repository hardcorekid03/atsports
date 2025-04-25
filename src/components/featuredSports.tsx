import { Card, CardContent } from "@/components/ui/card";
import { Tv, Globe, Shield, Zap } from "lucide-react";

function FeaturedSports() {
  return (
    <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We offer the best streaming experience for sports fans around the
          world.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Live Streaming",
            description:
              "Watch games as they happen with our high-quality live streams",
            icon: <Tv className="h-10 w-10 text-primary" />,
          },
          {
            title: "Global Coverage",
            description:
              "Access sports events from leagues and tournaments worldwide",
            icon: <Globe className="h-10 w-10 text-primary" />,
          },
          {
            title: "HD Quality",
            description:
              "Enjoy crystal clear streams with multiple quality options",
            icon: <Zap className="h-10 w-10 text-primary" />,
          },
          {
            title: "Reliable Service",
            description:
              "Count on our platform for uninterrupted sports entertainment",
            icon: <Shield className="h-10 w-10 text-primary" />,
          },
        ].map((feature) => (
          <Card
            key={feature.title}
            className="border-none shadow-none bg-transparent"
          >
            <CardContent className="p-6">
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FeaturedSports