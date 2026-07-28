import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Headphones,
  ListChecks,
  BookMarked,
  ScrollText,
} from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { EpisodePlayer } from "@/components/episode-player"
import { PilotFlagshipArticle } from "@/components/pilot-flagship-article"

// The pilot episode has a bespoke, long-form flagship layout.
const FLAGSHIP_SLUG = "pilot-episode-introduction-to-markets-without-spin"
import {
  getEpisodes,
  getEpisodeBySlug,
  getEpisodeExtras,
  formatDuration,
  formatPubDate,
  type PodcastEpisode,
} from "@/lib/podcast"

// Rebuild article pages hourly so new episodes and edits appear automatically.
export const revalidate = 3600

// Pre-render an article page for every episode currently in the feed.
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
  const result = await getEpisodeBySlug(slug)
  if (!result) {
    return { title: "Episode Not Found — Markets Without Spin" }
  }
  const { episode } = result
  if (slug === FLAGSHIP_SLUG) {
    const title =
      "Markets Are Not About Numbers. They Are About Incentives."
    const description =
      "The inaugural essay of Markets Without Spin. From the 1970 collapse of Penn Central to the unraveling of General Electric, Franz Amussen makes the case for reading markets through incentives, not numbers."
    return {
      title: `${title} — Markets Without Spin`,
      description,
      openGraph: { title, description, type: "article" },
    }
  }
  const description =
    episode.description?.slice(0, 155) ||
    "An episode of the Markets Without Spin podcast."
  return {
    title: `${episode.title} — Markets Without Spin`,
    description,
    openGraph: {
      title: episode.title,
      description,
      type: "article",
    },
  }
}

function episodeLabel(ep: PodcastEpisode) {
  if (ep.episodeNumber == null) return "Episode"
  return `Episode ${String(ep.episodeNumber).padStart(3, "0")}`
}

export default async function EpisodeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getEpisodeBySlug(slug)
  if (!result) notFound()

  const { episode, related } = result

  // The pilot episode renders as the site's flagship long-form article.
  if (slug === FLAGSHIP_SLUG) {
    return (
      <PageShell
        eyebrow="Pilot Episode · Flagship Essay"
        title="Markets Are Not About Numbers. They Are About Incentives."
        description="The inaugural essay of Markets Without Spin — how the incentives acting on the people behind a company, not the numbers on its statements, ultimately decide whether shareholders prosper or suffer."
      >
        <PilotFlagshipArticle episode={episode} />
      </PageShell>
    )
  }

  const extras = getEpisodeExtras(slug)
  const date = formatPubDate(episode.pubDate)
  const duration = formatDuration(episode.durationSeconds)

  return (
    <PageShell
      eyebrow={episodeLabel(episode)}
      title={episode.title}
      description={episode.description || "Listen to this episode of Markets Without Spin."}
    >
      {/* Back link */}
      <Link
        href="/podcast"
        className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        All Episodes
      </Link>

      {/* Meta row */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
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

      {/* Embedded Libsyn player (streams directly from the feed) */}
      {episode.audioUrl && (
        <EpisodePlayer
          src={episode.audioUrl}
          initialDuration={episode.durationSeconds ?? 0}
        />
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
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
            <ExternalLink className="size-4" /> Listen on Libsyn
          </a>
        )}
      </div>

      {/* Long-form article (Executive Summary, Historical Background, etc.) */}
      {extras.article.length > 0 ? (
        extras.article.map((sec, i) => (
          <section
            key={sec.heading}
            className={`border-t border-border/40 pt-10 ${i === 0 ? "mt-14" : "mt-12"}`}
          >
            <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
              <FileText className="size-3.5" /> {sec.heading}
            </p>
            <div className="mt-5 max-w-2xl space-y-5 text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
              {sec.paragraphs.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="mt-14 border-t border-border/40 pt-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <FileText className="size-3.5" /> Episode Summary
          </p>
          <div className="mt-5 max-w-2xl space-y-4 text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
            {episode.description ? (
              <p>{episode.description}</p>
            ) : (
              <p>
                A full written summary for this episode is on the way. In the
                meantime, press play above to listen to the conversation.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Key takeaways */}
      {extras.keyTakeaways.length > 0 && (
        <section className="mt-14 border-t border-border/40 pt-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <ListChecks className="size-3.5" /> Key Takeaways
          </p>
          <ul className="mt-6 max-w-2xl space-y-4">
            {extras.keyTakeaways.map((point, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-1 font-mono text-sm text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty leading-relaxed text-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* References */}
      {extras.references.length > 0 && (
        <section className="mt-14 border-t border-border/40 pt-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <BookMarked className="size-3.5" /> References
          </p>
          <ul className="mt-6 max-w-2xl space-y-3">
            {extras.references.map((ref, i) => (
              <li key={i}>
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 text-pretty leading-relaxed text-primary underline-offset-2 hover:underline"
                  >
                    {ref.label}
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="text-pretty leading-relaxed text-foreground">
                    {ref.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Transcript — only rendered when a transcript is available */}
      {extras.transcript && (
        <section className="mt-14 border-t border-border/40 pt-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <ScrollText className="size-3.5" /> Transcript
          </p>
          <div className="mt-6 max-w-2xl whitespace-pre-line text-pretty font-serif leading-relaxed text-muted-foreground">
            {extras.transcript}
          </div>
        </section>
      )}

      {/* Related episodes */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border/40 pt-12">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            Related Episodes
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((ep) => {
              const relDate = formatPubDate(ep.pubDate)
              const relDuration = formatDuration(ep.durationSeconds)
              return (
                <Link
                  key={ep.id}
                  href={`/podcast/${ep.slug}`}
                  className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-card/60"
                >
                  <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <Headphones className="size-3.5 text-primary" />
                    <span className="text-primary">{episodeLabel(ep)}</span>
                  </div>
                  <h3 className="text-balance font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {ep.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {relDate && <span>{relDate}</span>}
                    {relDuration && <span>{relDuration}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </PageShell>
  )
}
