"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import GameCard from "./game-card"
import { fetchStreams } from "@/lib/api"
import type { Stream } from "@/lib/types"
import { isTomorrow } from "@/lib/utils"
import EmptyState from "./empty-state"

interface TomorrowGamesProps {
  onWatchStream: (stream: Stream) => void
}

export default function TomorrowGames({ onWatchStream }: TomorrowGamesProps) {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchStreams()

      if (!data.success || !data.streams || data.streams.length === 0) {
        setError("Failed to load tomorrow's games. Please try again.")
        setStreams([])
        return
      }

      // Filter for tomorrow's games
      const tomorrowStreams = data.streams
        .flatMap((category) => category.streams.filter((stream) => isTomorrow(stream.starts_at)))
        .sort((a, b) => a.starts_at - b.starts_at)

      setStreams(tomorrowStreams)
    } catch (err) {
      console.error("Error fetching tomorrow's games:", err)
      setError("Failed to load tomorrow's games. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>{error}</p>
          <Button variant="outline" size="sm" className="w-fit flex items-center gap-2" onClick={fetchData}>
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (streams.length === 0) {
    return <EmptyState message="No games scheduled for tomorrow" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {streams.map((stream) => (
        <GameCard key={stream.id} stream={stream} isLive={false} onWatch={onWatchStream} />
      ))}
    </div>
  )
}
