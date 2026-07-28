import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { SITE } from "@/lib/content"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* subtle compass-rule top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-primary">
          {SITE.name} &middot; Follow the Incentives
        </p>
        <h1 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          A library for understanding why markets, businesses, and institutions behave the way they do.
        </h1>
        <p className="mt-7 max-w-2xl text-pretty font-serif text-xl leading-relaxed text-foreground/85">
          Markets Without Spin is a self-paced collection of essays and audio
          about the incentives beneath the headlines. Most coverage tells you{" "}
          <span className="italic">what</span> happened. Here we explain{" "}
          <span className="italic text-primary">why</span>&mdash;and why it keeps
          happening.
        </p>

        {/* Trust signal — why this publication is worth your time */}
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-foreground/80">By Franz Amussen</span>
          <span className="text-border" aria-hidden>
            /
          </span>
          <span>Investing since 1969</span>
          <span className="text-border" aria-hidden>
            /
          </span>
          <span>Investor, educator &amp; advisory-firm co-founder</span>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="#start-here"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <BookOpen className="size-4" /> Start Here
          </Link>
          <Link
            href="/essays"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Browse the Essays <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
