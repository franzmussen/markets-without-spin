import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Headphones, ExternalLink, Calendar, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EpisodePlayer } from "@/components/episode-player"
import { ListenOn } from "@/components/listen-on"
import {
  getEpisodes,
  getEpisodeBySlug,
  formatDuration,
  formatPubDate,
} from "@/lib/podcast"

// Refresh from the RSS feed hourly so new episodes get their own page.
export const revalidate = 3600

// Pre-render a route for every episode currently in the feed.
export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map((ep) => ({ slug: ep.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const episode = await getEpisodeBySlug(slug)
  if (!episode) {
    return { title: "Episode Not Found — Markets Without Spin" }
  }
  return {
    title: `${episode.title} — Markets Without Spin`,
    description: episode.description || undefined,
  }
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const episode = await getEpisodeBySlug(slug)

  if (!episode) {
    notFound()
  }

  const date = formatPubDate(episode.pubDate)
  const duration = formatDuration(episode.durationSeconds)
  const label =
    episode.episodeNumber != null
      ? `Episode ${String(episode.episodeNumber).padStart(3, "0")}`
      : "Episode"

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 pt-14 lg:px-8">
        <Link
          href="/podcast"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3.5" /> All Episodes
        </Link>

        <article className="mt-8 border-b border-border/60 pb-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-primary">{label}</span>
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" /> {date}
              </span>
            )}
            {duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> {duration}
              </span>
            )}
          </div>

          <h1 className="mt-5 max-w-3xl text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            {episode.title}
          </h1>

          {episode.audioUrl && (
            <EpisodePlayer
              src={episode.audioUrl}
              initialDuration={episode.durationSeconds ?? 0}
            />
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {episode.audioUrl && (
              <a
                href={episode.audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Headphones className="size-4" /> Listen Now
              </a>
            )}
            {episode.pageUrl && (
              <a
                href={episode.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
              >
                <ExternalLink className="size-4" /> Open on Libsyn
              </a>
            )}
          </div>

          {episode.description && (
            <div className="mt-10">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
                About this episode
              </p>
              <p className="mt-4 max-w-2xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
                {episode.description}
              </p>
            </div>
          )}
        </article>

        <div className="py-12">
          <ListenOn />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
