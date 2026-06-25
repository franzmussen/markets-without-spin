import Link from "next/link"
import { SITE } from "@/lib/content"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* subtle compass-rule top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-primary">
          {SITE.name}
        </p>
        <h1 className="mt-6 max-w-4xl text-balance font-heading text-5xl font-black leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {SITE.tagline}
        </h1>
        <p className="mt-7 max-w-2xl text-pretty font-serif text-xl leading-relaxed text-foreground/85 sm:text-2xl">
          {SITE.intro}
        </p>
        <p className="mt-5 max-w-2xl text-pretty font-serif text-lg italic leading-relaxed text-muted-foreground">
          {SITE.thesis}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/essays"
            className="rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Read the Essays
          </Link>
          <Link
            href="/podcast"
            className="rounded-sm border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Listen to the Podcast
          </Link>
        </div>
      </div>
    </section>
  )
}
