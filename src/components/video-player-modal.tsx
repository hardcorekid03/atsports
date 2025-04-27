import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Stream } from "@/lib/types"

interface VideoPlayerModalProps {
  stream: Stream | null
  isOpen: boolean
  onClose: () => void
}

export default function VideoPlayerModal({ stream, isOpen, onClose }: VideoPlayerModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Handle escape key to close the modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Handle fullscreen
  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen()
      }
    }
  }

  if (!stream) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden">
        <DialogHeader className="p-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">{stream.name}</DialogTitle>

        </DialogHeader>

        <div className="relative bg-black aspect-video w-full">
          {stream.iframe ? (
            <iframe
              ref={iframeRef}
              src={stream.iframe}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
              title={stream.name}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>Stream not available</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{stream.name}</p>
              {stream.tag && <p className="text-sm text-muted-foreground">{stream.tag}</p>}
            </div>
            <Button onClick={handleFullscreen}>Fullscreen</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
