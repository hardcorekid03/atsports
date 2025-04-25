function HowitWorks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started with our sports streaming platform is quick and
            easy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Browse Categories",
              description:
                "Explore our wide range of sports categories and find your favorite games.",
            },
            {
              step: "2",
              title: "Select a Stream",
              description:
                "Choose from live games happening now or upcoming matches scheduled for later.",
            },
            {
              step: "3",
              title: "Enjoy Watching",
              description:
                "Click 'Watch Now' and enjoy the game in high definition without any interruptions.",
            },
          ].map((step) => (
            <div
              key={step.step}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowitWorks;
