"use client"

import { useState } from "react"
import Link from "next/link"
import { Headphones, FileText } from "lucide-react"
import { EpisodePlayer } from "@/components/episode-player"

/**
 * Index-card actions for a single episode. Renders a "Listen Now" button that
 * reveals an inline audio player on demand (keeping the listing clean) and a
 * "Read Episode" link that navigates to the episode's own slug-based route.
 */
export function EpisodeListen({
  slug,
  audioUrl,
  durationSeconds,
}: {
  slug: string
  audioUrl: string | null
  durationSeconds: number | null
}) {
  const [showPlayer, setShowPlayer] = useState(false)

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {audioUrl && (
          <button
            type="button"
            onClick={() => setShowPlayer(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            <Headphones className="size-4" /> Listen Now
          </button>
        )}
        <Link
          href={`/podcast/${slug}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-primary/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10 sm:w-auto"
        >
          <FileText className="size-4" /> Read Episode
        </Link>
      </div>

      {audioUrl && showPlayer && (
        <EpisodePlayer src={audioUrl} initialDuration={durationSeconds ?? 0} />
      )}
    </div>
  )
}
