import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveGames from "@/components/live-games";
import UpcomingGames from "@/components/upcoming-games";
import TomorrowGames from "@/components/tomorrow-games";
import CategoryBrowser from "@/components/category-browser";
import VideoPlayerModal from "@/components/video-player-modal";
import type { Stream } from "@/lib/types";
import Header from "@/components/header";

export default function Live() {
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "live";

  const handleWatchStream = (stream: Stream) => {
    setCurrentStream(stream);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-6 px-4">
        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={(value) => setSearchParams({ tab: value })}
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <LiveGames onWatchStream={handleWatchStream} />
          </TabsContent>

          <TabsContent value="today">
            <UpcomingGames onWatchStream={handleWatchStream} />
          </TabsContent>

          <TabsContent value="tomorrow">
            <TomorrowGames onWatchStream={handleWatchStream} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryBrowser onWatchStream={handleWatchStream} />
          </TabsContent>
        </Tabs>
      </main>

      <VideoPlayerModal
        stream={currentStream}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
      />
    </div>
  );
}
