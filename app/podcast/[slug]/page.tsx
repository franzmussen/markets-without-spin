import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EpisodePlayer } from "@/components/episode-player"
import { EpisodeArticle } from "@/components/episode-article"
import { ListenOn } from "@/components/listen-on"
import {
  getEpisodes,
  getEpisodeBySlug,
  parseDescriptionBlocks,
  formatDuration,
  formatPubDate,
  PODCAST_LINKS,
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
  const blocks = parseDescriptionBlocks(episode.descriptionHtml)
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
              appleUrl={PODCAST_LINKS.apple}
              spotifyUrl={PODCAST_LINKS.spotify}
            />
          )}

          <EpisodeArticle blocks={blocks} />
        </article>

        <section
          aria-labelledby="enjoyed-heading"
          className="mt-12 rounded-sm border border-primary/30 bg-card px-6 py-8 sm:px-8"
        >
          <h2
            id="enjoyed-heading"
            className="font-heading text-2xl font-bold text-foreground"
          >
            Enjoyed this episode?
          </h2>
          <p className="mt-3 text-pretty font-serif text-base leading-relaxed text-muted-foreground">
            Subscribe on{" "}
            <a
              href={PODCAST_LINKS.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
            >
              Apple Podcasts
            </a>{" "}
            or{" "}
            <a
              href={PODCAST_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
            >
              Spotify
            </a>{" "}
            to receive every new episode automatically.
          </p>
        </section>

        <div className="py-12">
          <ListenOn />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
