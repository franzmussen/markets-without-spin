import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Gauge,
  Headphones,
  Calendar,
  Clock,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { SectionHeading } from "@/components/section-heading"
import { OBSERVATIONS } from "@/lib/content"
import { getEpisodes, formatPubDate, formatDuration } from "@/lib/podcast"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Markets Without Spin — Follow the Incentives",
  description:
    "A self-paced library of essays and audio explaining the incentives that drive markets, businesses, and investors. Start with the Pilot Essay.",
}

const PILOT_SLUG = "pilot-episode-introduction-to-markets-without-spin"

export default async function HomePage() {
  const episodes = await getEpisodes()
  const pilot =
    episodes.find((e) => e.slug === PILOT_SLUG) ?? episodes[episodes.length - 1]
  const pilotHref = `/essays/${pilot.slug}`
  const pilotDate = formatPubDate(pilot.pubDate)
  const pilotDuration = formatDuration(pilot.durationSeconds)

  const pillars = [
    {
      icon: BookOpen,
      label: "Essays",
      title: "Read the thesis",
      description:
        "Evergreen articles explaining the incentives that drive markets, businesses, and investors. Written to be read in any order, and to hold up years from now.",
      href: "/essays",
      cta: "Browse the essays",
      note: "Read at your own pace",
    },
    {
      icon: Headphones,
      label: "Podcast",
      title: "Listen to the archive",
      description:
        "Audio versions of the essays, collected in a permanent Podcast Archive. Every episode keeps its home here, even as the feed rolls forward.",
      href: "/podcast",
      cta: "Open the archive",
      note: `${episodes.length} episodes, permanently archived`,
    },
    {
      icon: Gauge,
      label: "Incentives Index",
      title: "Measure the alignment",
      description:
        "An upcoming research platform that measures how well corporate management incentives align with the interests of long-term shareholders.",
      href: "/research",
      cta: "Preview the research",
      note: "In development",
    },
  ]

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />

      <main className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Start Here — the recommended first read/listen */}
        <section id="start-here" className="scroll-mt-24 py-16 lg:py-20">
          <SectionHeading
            eyebrow="Start Here"
            title="Begin with the Pilot Essay"
          />
          <div className="mt-8 overflow-hidden rounded-sm border border-primary/40 bg-card">
            <div className="grid lg:grid-cols-[1.5fr_1fr]">
              <div className="p-8 sm:p-10">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-primary">
                  Recommended first read &amp; listen
                </p>
                <h3 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  <Link
                    href={pilotHref}
                    className="transition-colors hover:text-primary"
                  >
                    {pilot.title}
                  </Link>
                </h3>
                <p className="mt-5 text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
                  {pilot.description}
                </p>
                <p className="mt-4 text-pretty leading-relaxed text-foreground/80">
                  New here? This is the essay that lays out the entire
                  thesis&mdash;read it, or press play and listen. Everything
                  else builds on the ideas introduced here.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={pilotHref}
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <BookOpen className="size-4" /> Read the Pilot Essay
                  </Link>
                  <Link
                    href={pilotHref}
                    className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
                  >
                    <Headphones className="size-4" /> Listen
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5 border-t border-border/60 bg-secondary/30 p-8 sm:p-10 lg:border-l lg:border-t-0">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  <Headphones className="size-5" /> Pilot Episode
                </div>
                <dl className="space-y-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {pilotDate && (
                    <div className="flex items-center gap-2.5">
                      <Calendar className="size-4 text-primary/70" />
                      <dt className="sr-only">Published</dt>
                      <dd>{pilotDate}</dd>
                    </div>
                  )}
                  {pilotDuration && (
                    <div className="flex items-center gap-2.5">
                      <Clock className="size-4 text-primary/70" />
                      <dt className="sr-only">Listening time</dt>
                      <dd>{pilotDuration} listen</dd>
                    </div>
                  )}
                </dl>
                <p className="border-t border-border/50 pt-5 text-pretty font-serif text-lg italic leading-relaxed text-foreground/85">
                  &ldquo;Most people focus on what happened. We focus on why it
                  happened.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars — what this publication is */}
        <section className="border-t border-border/40 py-16 lg:py-20">
          <SectionHeading
            eyebrow="Three Pillars"
            title="One idea, explored three ways"
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <article
                  key={pillar.label}
                  className="flex flex-col rounded-sm border border-border/60 bg-card p-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-primary">
                    {pillar.label}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/50 pt-5">
                    <Link
                      href={pillar.href}
                      className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary transition-opacity hover:opacity-80"
                    >
                      {pillar.cta}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {pillar.note}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* From the Notebook — a taste of the recurring ideas */}
        <section className="border-t border-border/40 py-16 lg:py-20">
          <SectionHeading
            eyebrow="From the Notebook"
            title="Ideas that recur"
            href="/observations"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {OBSERVATIONS.slice(0, 3).map((o) => (
              <blockquote
                key={o.title}
                className="flex flex-col rounded-sm border border-border/60 bg-card p-6"
              >
                <span
                  className="font-heading text-4xl leading-none text-primary/70"
                  aria-hidden
                >
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

        {/* Why trust this — the person behind the work */}
        <section className="border-t border-border/40 py-16 lg:py-20">
          <SectionHeading eyebrow="Who Writes This" title="A lifetime of context" />
          <div className="mt-8 grid gap-8 rounded-sm border border-border/60 bg-card p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
            <figure className="mx-auto w-full max-w-[200px] lg:mx-0">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-border/60">
                <Image
                  src="/franz-portrait.jpg"
                  alt="Portrait of Franz Amussen, founder of Markets Without Spin"
                  fill
                  sizes="200px"
                  className="object-cover object-[center_18%] grayscale"
                />
              </div>
            </figure>
            <div className="flex flex-col justify-center">
              <p className="text-pretty font-serif text-xl leading-relaxed text-foreground/85">
                Markets Without Spin is written by Franz Amussen, who began
                investing in 1969 and has worked professionally in the field
                since 1985. He passed the CPA examination, earned a
                Master&apos;s in Geography from the University of Utah, and
                co-founded an investment advisory firm&mdash;a lifetime spent
                studying the incentives that move markets and institutions.
              </p>
              <Link
                href="/about"
                className="group mt-7 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary transition-opacity hover:opacity-80"
              >
                Read the full story
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Subscribe — self-paced, not a feed to keep up with */}
        <section className="border-t border-border/40 py-16 lg:py-20">
          <div className="rounded-sm border border-primary/40 bg-card p-10 text-center sm:p-14">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
              Subscribe
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              No feed to keep up with
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Subscribe and we&apos;ll let you know when a new essay is
              published. Nothing to keep up with, no noise&mdash;just a growing
              library you can explore whenever you like.
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
