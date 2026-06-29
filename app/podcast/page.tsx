import type { Metadata } from "next"
import { Headphones, Calendar, Clock } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { ListenOn } from "@/components/listen-on"
import { EpisodeListen } from "@/components/episode-listen"
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

  return (
    <PageShell
      eyebrow="Podcast Episodes"
      title="Conversations on the forces beneath the surface"
      description="Long-form discussions exploring the incentives that shape markets, corporations, governments, and investor behavior."
    >
      {/* Listen On — platform links directly below the hero */}
      <ListenOn />

      {/* Episode index — summaries only; the full article lives on each episode page */}
      <section className="mt-16 border-t border-border/40 pt-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          All Episodes
        </p>
        <div className="mt-8 grid gap-6">
          {episodes.map((ep, i) => {
            const date = formatPubDate(ep.pubDate)
            const duration = formatDuration(ep.durationSeconds)
            return (
              <article
                key={ep.id}
                className="grid gap-4 rounded-sm border border-border/60 bg-card p-6 sm:p-8 md:grid-cols-[auto_1fr] md:gap-8"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-primary/40 text-primary">
                  <Headphones className="size-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-primary">
                      {episodeLabel(ep, episodes.length - i)}
                    </span>
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

                  <h2 className="mt-3 text-balance font-heading text-2xl font-bold leading-snug text-foreground">
                    {ep.title}
                  </h2>

                  {ep.excerpt && (
                    <p className="mt-3 max-w-2xl text-pretty font-serif leading-relaxed text-muted-foreground">
                      {ep.excerpt}
                    </p>
                  )}

                  <EpisodeListen
                    slug={ep.slug}
                    audioUrl={ep.audioUrl}
                    durationSeconds={ep.durationSeconds}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </section>

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
