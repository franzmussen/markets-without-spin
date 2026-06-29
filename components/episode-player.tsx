"use client"

import { useRef, useState } from "react"
import { Play, Pause, Headphones } from "lucide-react"

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function EpisodePlayer({
  src,
  initialDuration = 0,
  appleUrl,
  spotifyUrl,
}: {
  src: string
  initialDuration?: number
  /** When provided, an "Apple Podcasts" subscribe button is shown. */
  appleUrl?: string
  /** When provided, a "Spotify" subscribe button is shown. */
  spotifyUrl?: string
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(initialDuration)

  const showActions = Boolean(appleUrl || spotifyUrl)

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio.play()
    } else {
      audio.pause()
    }
  }

  function handleListenNow() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play()
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current
    if (!audio) return
    const time = Number(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <>
      {showActions && (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={handleListenNow}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            <Headphones className="size-4" /> Listen Now
          </button>
          {appleUrl && (
            <a
              href={appleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/20 sm:w-auto"
            >
              <AppleIcon className="size-4" /> Apple Podcasts
            </a>
          )}
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border/70 bg-card px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/60 sm:w-auto"
            >
              <SpotifyIcon className="size-4" /> Spotify
            </a>
          )}
        </div>
      )}
      <div
        ref={playerRef}
        className="mt-6 flex items-center gap-4 rounded-sm border border-border/60 bg-background/60 p-4"
      >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause episode" : "Play episode"}
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
      >
        {isPlaying ? (
          <Pause className="size-5" fill="currentColor" />
        ) : (
          <Play className="size-5 translate-x-0.5" fill="currentColor" />
        )}
      </button>
      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Seek"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          style={{
            background: `linear-gradient(to right, var(--primary) ${progress}%, var(--secondary) ${progress}%)`,
          }}
        />
        <div className="mt-2 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{duration ? formatTime(duration) : "--:--"}</span>
        </div>
      </div>
      </div>
    </>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.114 2.99-.84.95-2.207 1.685-3.32 1.598a3.36 3.36 0 0 1-.024-.41c0-1.094.475-2.26 1.184-3.024.717-.78 1.943-1.37 2.96-1.41.02.155.314.155.314.256zM20.5 17.36c-.55 1.27-.815 1.84-1.524 2.96-.99 1.565-2.385 3.515-4.116 3.53-1.538.015-1.934-1.005-4.022-.993-2.088.012-2.523 1.012-4.06.997-1.73-.015-3.052-1.776-4.042-3.34-2.77-4.378-3.06-9.514-1.35-12.245 1.215-1.94 3.13-3.075 4.93-3.075 1.832 0 2.984 1.005 4.5 1.005 1.47 0 2.366-1.007 4.487-1.007 1.604 0 3.302.873 4.515 2.383-3.967 2.173-3.323 7.84.682 9.785z" />
    </svg>
  )
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.42.18.48.78.24 1.2zm.12-3.36C15.24 8.46 8.82 8.22 5.1 9.36c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.32-1.32 11.4-1.02 15.84 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.62.24z" />
    </svg>
  )
}
