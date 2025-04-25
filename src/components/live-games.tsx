
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameCard from "./game-card";
import EmptyState from "./empty-state";
import { useFetchLiveStreams } from "@/hooks/useFetchLiveStreams";
import type { Stream } from "@/lib/types";

interface LiveGamesProps {
  onWatchStream: (stream: Stream) => void;
}

export default function LiveGames({ onWatchStream }: LiveGamesProps) {
  const {
    liveStreams: streams,
    loading,
    error,
    refetch,
  } = useFetchLiveStreams(); // Uses default (no limit)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-0">
              <Skeleton className="h-[200px] w-full rounded-t-lg" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-fit flex items-center gap-2"
            onClick={refetch}
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (streams.length === 0) {
    return <EmptyState message="No live games at the moment" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {streams.map((stream) => (
        <GameCard
          key={stream.id}
          stream={stream}
          isLive={true}
          onWatch={onWatchStream}
        />
      ))}
    </div>
  );
}
