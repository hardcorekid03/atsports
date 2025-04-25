"use client"

import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchStreams } from "@/lib/api"
import type { Category, Stream } from "@/lib/types"
import GameCard from "./game-card"
import EmptyState from "./empty-state"

interface CategoryBrowserProps {
  onWatchStream: (stream: Stream) => void
}

export default function CategoryBrowser({ onWatchStream }: CategoryBrowserProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchStreams()

      if (!data.success || !data.streams || data.streams.length === 0) {
        setError("Failed to load categories. Please try again.")
        setCategories([])
        return
      }

      // Sort categories by name
      const sortedCategories = data.streams.sort((a, b) => a.category.localeCompare(b.category))

      setCategories(sortedCategories)
    } catch (err) {
      console.error("Error fetching categories:", err)
      setError("Failed to load categories. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
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

  if (categories.length === 0) {
    return <EmptyState message="No categories available" />
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {categories.map((category) => (
        <AccordionItem key={category.id} value={category.category}>
          <AccordionTrigger className="text-lg font-medium">{category.category}</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
              {category.streams.map((stream) => (
                <GameCard
                  key={stream.id}
                  stream={stream}
                  isLive={
                    stream.always_live === 1 ||
                    (stream.starts_at <= Math.floor(Date.now() / 1000) &&
                      stream.ends_at >= Math.floor(Date.now() / 1000))
                  }
                  onWatch={onWatchStream}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
