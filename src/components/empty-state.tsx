import { CalendarX } from "lucide-react"

interface EmptyStateProps {
  message: string
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CalendarX className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-sm text-muted-foreground mt-2">Check back later for updates or browse other categories</p>
    </div>
  )
}
