import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Play } from "lucide-react";
import type { Stream } from "@/lib/types";
import { useNavigate } from "react-router-dom";


interface LivePreviewSectionProps {
  liveStreams: Stream[];
  loading: boolean;
  onViewAll: () => void;
  onWatchStream: (stream: Stream) => void;
}

export default function LivePreviewSection({
  liveStreams,
  loading,
  onWatchStream,
}: LivePreviewSectionProps) {
  // Group streams by category
  const streamsByCategory: Record<string, Stream[]> = {};

  liveStreams.forEach((stream) => {
    if (!streamsByCategory[stream.category_name]) {
      streamsByCategory[stream.category_name] = [];
    }
    streamsByCategory[stream.category_name].push(stream);
  });

  // Get top stream from each category (max 4)
  const featuredStreams: Stream[] = [];
  const categories = Object.keys(streamsByCategory);

  // Ensure we have at least these categories if available
  const priorityCategories = [
    "Basketball",
    "MLB",
    "Ice Hockey",
    "24/7 Streams",
  ];

  priorityCategories.forEach((category) => {
    if (streamsByCategory[category] && streamsByCategory[category].length > 0) {
      featuredStreams.push(streamsByCategory[category][0]);
    }
  });

  // Fill remaining slots with other categories
  categories.forEach((category) => {
    if (!priorityCategories.includes(category) && featuredStreams.length < 4) {
      featuredStreams.push(streamsByCategory[category][0]);
    }
  });

  const navigate = useNavigate();

  const linkToLive = () => {
    navigate("/live");
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">Live Right Now</h2>
            <p className="text-muted-foreground">
              Don't miss these exciting games happening right now
            </p>
          </div>
          <Button onClick={linkToLive} className="mt-4 md:mt-0">
            View All Live Games
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            // Loading skeletons
            Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative h-48">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </Card>
              ))
          ) : featuredStreams.length > 0 ? (
            // Live streams
            featuredStreams.map((stream) => {
              // Determine category label
              let categoryLabel = stream.category_name;
              if (categoryLabel === "Basketball") categoryLabel = "NBA";
              else if (categoryLabel === "24/7 Streams")
                categoryLabel = "Entertainment";

              // Format stream title
              let title = stream.name;
              if (title.length > 30) {
                title = title.substring(0, 27) + "...";
              }

              return (
                <Card
                  key={stream.id}
                  className="overflow-hidden group cursor-pointer"
                  onClick={() => onWatchStream(stream)}
                >
                  <CardContent className="relative h-48 bg-muted p-0">
                    {/* Stream thumbnail */}
                    <div className="w-full h-full relative">
                      <img
                        src={stream.poster || "/placeholder.svg"}
                        alt={stream.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Category and LIVE badge */}
                    <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-sm font-medium px-2 py-1 rounded">
                      {categoryLabel}
                    </div>
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      LIVE
                    </div>

                    {/* Watch now overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Button variant="default" className="gap-2">
                        <Play className="h-4 w-4" /> Watch Now
                      </Button>
                    </div>
                  </CardContent>

                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1">{title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{stream.viewers || "0"} viewers</span>
                    </div>
                  </div>
                </Card>

              );
            })
          ) : (
            // No streams available
            <div className="col-span-4 text-center py-12">
              <p className="text-muted-foreground">
                No live streams available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
