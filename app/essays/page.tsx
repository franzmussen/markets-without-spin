import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { ESSAYS } from "@/lib/content"
import {
  getEpisodes,
  getEpisodeExtras,
  formatDuration,
  formatPubDate,
  formatReadingTime,
  type PodcastEpisode,
} from "@/lib/podcast"

export const metadata: Metadata = {
  title: "Essays — Markets Without Spin",
  description:
    "The written heart of Markets Without Spin. Long-form essays on the incentives that shape markets, corporations, and institutions — each paired with its podcast episode.",
}

export const revalidate = 3600

function episodeLabel(ep: PodcastEpisode) {
  if (ep.episodeNumber == null) return "Pilot Episode"
  return `Episode ${String(ep.episodeNumber).padStart(2, "0")}`
}

function readingTimeFor(slug: string, fallback: string): string {
  const extras = getEpisodeExtras(slug)
  const text = extras.article.flatMap((sec) => [sec.heading, ...sec.paragraphs])
  return formatReadingTime(...(text.length > 0 ? text : [fallback]))
}

export default async function EssaysPage() {
  const episodes = await getEpisodes()

  return (
    <PageShell
      eyebrow="Essays"
      title="The written heart of Markets Without Spin"
      description="Every episode begins as an essay — a single thread of incentive followed to its often uncomfortable conclusion. Read slowly; that is the point. Each piece pairs with its podcast episode."
    >
      {/* Episode essays — the canonical library */}
      <section>
        <div className="flex items-end justify-between gap-6 border-b border-border/60 pb-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            The Essays
          </p>
          <Link
            href="/podcast"
            className="group hidden shrink-0 items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary sm:flex"
          >
            Podcast Archive
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-2 divide-y divide-border/50">
          {episodes.map((ep) => {
            const date = formatPubDate(ep.pubDate)
            const listen = formatDuration(ep.durationSeconds)
            const reading = readingTimeFor(ep.slug, ep.description ?? "")
            return (
              <article key={ep.id} className="py-7">
                <Link href={`/essays/${ep.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="text-primary">{episodeLabel(ep)}</span>
                    {date && <span>{date}</span>}
                    {reading && <span>{reading}</span>}
                    {listen && <span>{listen} listen</span>}
                  </div>
                  <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {ep.title}
                  </h2>
                  {ep.description && (
                    <p className="mt-3 max-w-2xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
                      {ep.description}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary transition-opacity group-hover:opacity-80">
                    <FileText className="size-3.5" /> Read the essay
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* Selected Writing — editorial essays (teasers) */}
      <section className="mt-16 border-t border-border/40 pt-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Selected Writing
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-bold leading-tight text-foreground">
          Standalone essays beyond the podcast
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border/60 bg-border/40 sm:grid-cols-2">
          {ESSAYS.map((essay) => (
            <article key={essay.title} className="flex flex-col bg-card p-8">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
                {essay.category}
              </p>
              <h3 className="mt-3 text-balance font-heading text-2xl font-bold leading-tight text-foreground">
                {essay.title}
              </h3>
              <p className="mt-4 flex-1 text-pretty font-serif leading-relaxed text-muted-foreground">
                {essay.dek}
              </p>
              <div className="mt-6 flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                <span>{essay.date}</span>
                <span className="text-primary">{essay.readingTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
