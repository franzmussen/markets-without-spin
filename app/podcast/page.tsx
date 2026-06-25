import type { Metadata } from "next"
import { Headphones, FileText, Calendar, Clock } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { EpisodePlayer } from "@/components/episode-player"
import {
  getEpisodes,
  formatDuration,
  formatPubDate,
  type PodcastEpisode,
} from "@/lib/podcast"

export const metadata: Metadata = {
  title: "Podcast Episodes — Markets Without Spin",
  description:
    "Long-form discussions exploring the incentives that shape markets, corporations, governments, and investor behavior.",
}

// Refresh the page from the RSS feed hourly so new episodes appear automatically.
export const revalidate = 3600

function episodeLabel(ep: PodcastEpisode, fallbackIndex: number) {
  const num = ep.episodeNumber ?? fallbackIndex
  return `Episode ${String(num).padStart(3, "0")}`
}

export default async function PodcastPage() {
  const episodes = await getEpisodes()
  const featured = episodes[0]
  const rest = episodes.slice(1)

  const featuredDate = formatPubDate(featured.pubDate)
  const featuredDuration = formatDuration(featured.durationSeconds)

  return (
    <PageShell
      eyebrow="Podcast Episodes"
      title="Conversations on the forces beneath the surface"
      description="Long-form discussions exploring the incentives that shape markets, corporations, governments, and investor behavior."
    >
      {/* Featured Episode */}
      <section className="border-t border-border/40 pt-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Featured Episode
        </p>
        <article className="mt-6 overflow-hidden rounded-sm border border-border/60 bg-card">
          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-primary">{episodeLabel(featured, 1)}</span>
              {featuredDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> {featuredDate}
                </span>
              )}
              {featuredDuration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {featuredDuration}
                </span>
              )}
            </div>

            <h2 className="mt-5 max-w-3xl text-balance font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {featured.title}
            </h2>
            {featured.description && (
              <p className="mt-5 max-w-2xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
            )}

            {/* Audio player streams directly from the Libsyn feed */}
            {featured.audioUrl && (
              <EpisodePlayer
                src={featured.audioUrl}
                initialDuration={featured.durationSeconds ?? 0}
              />
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {featured.audioUrl && (
                <a
                  href={featured.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Headphones className="size-4" /> Listen Now
                </a>
              )}
              {featured.pageUrl && (
                <a
                  href={featured.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
                >
                  <FileText className="size-4" /> Episode Page
                </a>
              )}
            </div>
          </div>
        </article>
      </section>

      {/* All Episodes */}
      {rest.length > 0 && (
        <section className="mt-16 border-t border-border/40 pt-12">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            All Episodes
          </p>
          <div className="mt-8 divide-y divide-border/50 border-y border-border/50">
            {rest.map((ep, i) => {
              const date = formatPubDate(ep.pubDate)
              const duration = formatDuration(ep.durationSeconds)
              return (
                <article
                  key={ep.id}
                  className="grid gap-4 py-7 md:grid-cols-[auto_1fr] md:gap-8"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-primary/40 text-primary">
                    <Headphones className="size-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                      <span className="text-primary">{episodeLabel(ep, episodes.length - i - 1)}</span>
                      {date && <span>{date}</span>}
                      {duration && <span>{duration}</span>}
                    </div>
                    <h3 className="mt-2 text-balance font-heading text-xl font-bold leading-snug text-foreground">
                      {ep.pageUrl ? (
                        <a
                          href={ep.pageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-primary"
                        >
                          {ep.title}
                        </a>
                      ) : (
                        ep.title
                      )}
                    </h3>
                    {ep.description && (
                      <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                        {ep.description}
                      </p>
                    )}
                    {ep.audioUrl && (
                      <EpisodePlayer
                        src={ep.audioUrl}
                        initialDuration={ep.durationSeconds ?? 0}
                      />
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      <p className="mt-12 border-t border-border/40 pt-8 font-serif text-sm leading-relaxed text-muted-foreground">
        New episodes are published to the{" "}
        <a
          href="https://feeds.libsyn.com/622775/rss"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          Markets Without Spin feed
        </a>{" "}
        and appear here automatically. Subscribe in your podcast app of choice to follow along.
      </p>
    </PageShell>
  )
}
