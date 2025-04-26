"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import type { Stream } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";

interface GameCardProps {
  stream: Stream;
  isLive: boolean;
  onWatch: (stream: Stream) => void;
}

export default function GameCard({ stream, isLive, onWatch }: GameCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group cursor-pointer">
      <div className="relative h-48 bg-muted">
        {stream.poster ? (
          <div className="w-full h-full overflow-hidden">
            <img
              src={stream.poster || "/placeholder.svg"}
              alt={stream.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}

        {isLive && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            LIVE
          </Badge>
        )}
        {stream.tag && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            {stream.tag}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex-grow">
        <h3 className="text-base font-bold mb-2 line-clamp-2">{stream.name}</h3>

        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatDate(stream.starts_at)}</span>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatTime(stream.starts_at)}</span>
          </div>

          {stream.viewers && Number.parseInt(stream.viewers) > 0 && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{stream.viewers} viewers</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          variant={isLive ? "default" : "outline"}
          onClick={() => isLive && onWatch(stream)}
          disabled={!isLive || !stream.iframe}
        >
          {isLive ? "Watch Now" : "Set Reminder"}
        </Button>
      </CardFooter>
    </Card>

  );
}
