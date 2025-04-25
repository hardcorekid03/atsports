import { useEffect, useState, useCallback } from "react";
import { fetchStreams } from "@/lib/api";
import { isLiveNow } from "@/lib/utils";
import type { Stream } from "@/lib/types";

export function useFetchLiveStreams(limit = 8) {
  const [liveStreams, setLiveStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLive = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchStreams();

      if (data.success && data.streams) {
        const streams = data.streams
          .flatMap((category) =>
            category.streams
              .filter((stream) => isLiveNow(stream.starts_at, stream.ends_at))
              .map((stream) => ({
                ...stream,
                category_name: category.category,
              }))
          )
          .sort(
            (a, b) =>
              Number.parseInt(b.viewers || "0") -
              Number.parseInt(a.viewers || "0")
          );

        setLiveStreams(streams.slice(0, limit));
      } else {
        setError("Failed to fetch live streams.");
        setLiveStreams([]);
      }
    } catch (err) {
      console.error("Error fetching live streams:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  return {
    liveStreams,
    loading,
    error,
    refetch: fetchLive,
  };
}
