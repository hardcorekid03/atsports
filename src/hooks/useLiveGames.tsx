// hooks/useLiveGames.ts
import { useEffect, useState } from "react"
import { fetchStreams } from "@/lib/api"
import { isLiveNow } from "@/lib/utils"
import type { Stream } from "@/lib/types"

export function useLiveGames() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchStreams()

      if (!data.success || !data.streams || data.streams.length === 0) {
        setError("Failed to load live games. Please try again.")
        setStreams([])
        return
      }

      const liveStreams = data.streams
        .flatMap((category) =>
          category.streams.filter((stream) =>
            isLiveNow(stream.starts_at, stream.ends_at)
          )
        )
        .sort((a, b) =>
          b.viewers
            ? Number.parseInt(b.viewers) - Number.parseInt(a.viewers || "0")
            : 0
        )

      setStreams(liveStreams)
    } catch (err) {
      console.error("Error fetching live games:", err)
      setError("Failed to load live games. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { streams, loading, error, refetch: fetchData }
}