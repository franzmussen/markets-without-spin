import Link from "next/link"
import { Headphones, ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { SectionHeading } from "@/components/section-heading"
import { OBSERVATIONS, RESEARCH_NOTES, IDEAS } from "@/lib/content"
import { getEpisodes, formatPubDate, formatDuration } from "@/lib/podcast"

export const revalidate = 3600

export default async function HomePage() {
  const episodes = await getEpisodes()
  const episode = episodes[0]
  const episodeNumber = episode.episodeNumber ?? 1
  const episodeDate = formatPubDate(episode.pubDate)
  const episodeDuration = formatDuration(episode.durationSeconds)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />

      <main className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Latest Podcast */}
        <section className="py-16">
          <SectionHeading eyebrow="Latest Podcast" title="The most recent conversation" href="/podcast" />
          <article className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col justify-center rounded-sm border border-border/60 bg-card p-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="flex items-center gap-2 text-primary">
                  <Headphones className="size-5" />
                  Episode {String(episodeNumber).padStart(3, "0")}
                </span>
                {episodeDate && <span>{episodeDate}</span>}
                {episodeDuration && <span>{episodeDuration}</span>}
              </div>
              <h3 className="mt-4 text-balance font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {episode.title}
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {episode.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/podcast"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Headphones className="size-4" /> Listen Now
                </Link>
                <Link
                  href="/essays"
                  className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
                >
                  Read the Essay <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-sm border border-border/60 bg-secondary/30 p-8">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                In this episode
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  "How Penn Central's debt and accounting masked a dying business",
                  "Why GE's financial engineering hollowed out a great institution",
                  "What stock buybacks really reward — and what they quietly destroy",
                ].map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        {/* Featured Essay */}
        <section className="border-t border-border/40 py-16">
          <div className="flex items-end justify-between gap-6 border-b border-border/60 pb-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
              Featured Essay
            </p>
            <Link
              href="/essays"
              className="group hidden shrink-0 items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary sm:flex"
            >
              View all
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <article className="mt-8 max-w-3xl">
            <h3 className="text-balance font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              <Link href="/essays" className="transition-colors hover:text-primary">
                When the Trains Stopped Running
              </Link>
            </h3>
            <p className="mt-5 text-pretty font-serif text-lg italic leading-relaxed text-muted-foreground">
              The night Penn Central collapsed and what its downfall reveals about incentives, debt,
              and the slow decay of institutions.
            </p>
            <div className="mt-7 space-y-4 font-serif text-lg leading-relaxed text-foreground/85">
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-primary">
                June 20, 1970.
              </p>
              <p>
                In a quiet boardroom in New York City, one of America&apos;s greatest corporations
                ran out of time.
              </p>
              <p>
                Penn Central was not simply a railroad. It was the industrial bloodstream of the
                Northeast. Yet years of hidden losses, debt, and distorted incentives brought it to
                collapse.
              </p>
              <p>
                This essay explores the night the trains stopped running&mdash;and why the same
                incentive failures continue to threaten institutions today.
              </p>
            </div>
            <Link
              href="/essays"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Read the Full Essay <ArrowRight className="size-4" />
            </Link>
          </article>
        </section>

        {/* Observations */}
        <section className="border-t border-border/40 py-16">
          <SectionHeading eyebrow="Observations" title="Short, sharp notes" href="/observations" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {OBSERVATIONS.slice(0, 3).map((o) => (
              <blockquote
                key={o.title}
                className="flex flex-col rounded-sm border border-border/60 bg-card p-6"
              >
                <span className="font-heading text-4xl leading-none text-primary/70" aria-hidden>
                  &ldquo;
                </span>
                <p className="mt-2 text-balance font-heading text-lg font-bold leading-snug text-foreground">
                  {o.title}
                </p>
                <div className="mt-3 space-y-1 font-serif leading-relaxed text-muted-foreground">
                  {o.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <footer className="mt-auto pt-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">
                  {o.tag}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Research Notes */}
        <section className="border-t border-border/40 py-16">
          <SectionHeading eyebrow="Research Notes" title="Work in the field" href="/research-notes" />
          <div className="mt-8 divide-y divide-border/50 border-y border-border/50">
            {RESEARCH_NOTES.map((note, i) => (
              <article key={note.title} className="grid gap-3 py-6 md:grid-cols-[0.5fr_2fr] md:gap-8">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary">
                  No. {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{note.title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{note.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ideas in Progress */}
        <section className="border-t border-border/40 py-16">
          <SectionHeading eyebrow="Ideas in Progress" title="The workshop floor" href="/ideas-in-progress" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {IDEAS.map((idea) => (
              <article key={idea.title} className="rounded-sm border border-dashed border-border/70 bg-secondary/20 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">{idea.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{idea.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Subscribe CTA */}
        <section className="border-t border-border/40 py-16">
          <div className="rounded-sm border border-primary/40 bg-card p-10 text-center sm:p-14">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">Subscribe</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Follow the incentives, every week
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Essays, observations, and new episodes delivered without spin. No noise, no hype — just the
              forces beneath the headlines.
            </p>
            <Link
              href="/subscribe"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Join the readers <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
