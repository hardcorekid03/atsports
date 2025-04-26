import { useEffect, useState } from "react";
import { fetchStreams } from "@/lib/api";

export const useFetchPosters = () => {
  const [posters, setPosters] = useState<string[]>([]);

  useEffect(() => {
    const getPosters = async () => {
      try {
        const data = await fetchStreams();

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayTimestamp = Math.floor(today.setHours(0, 0, 0, 0) / 1000);
        const tomorrowTimestamp = Math.floor(tomorrow.setHours(0, 0, 0, 0) / 1000);

        const postersArray = data.streams.flatMap((category) =>
          category.streams
            .filter(
              (stream) =>
                stream.starts_at >= todayTimestamp &&
                stream.starts_at < tomorrowTimestamp + 86400 &&
                stream.poster
            )
            .map((stream) => stream.poster)
            .filter((poster): poster is string => poster !== undefined)
        );

        setPosters(postersArray);
      } catch (error) {
        console.error("Failed to fetch posters", error);
      }
    };

    getPosters();
  }, []);

  return posters;
};
