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

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href="https://podcasts.apple.com/us/podcast/markets-without-spin/id6783024308"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-sm border border-primary/40 bg-primary/5 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <AppleIcon className="size-4 text-primary" />
            Subscribe on Apple Podcasts
          </a>
        </div>
      </div>
    </section>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.114 2.99-.84.95-2.207 1.685-3.32 1.598a3.36 3.36 0 0 1-.024-.41c0-1.094.475-2.26 1.184-3.024.717-.78 1.943-1.37 2.96-1.41.02.155.314.155.314.256zM20.5 17.36c-.55 1.27-.815 1.84-1.524 2.96-.99 1.565-2.385 3.515-4.116 3.53-1.538.015-1.934-1.005-4.022-.993-2.088.012-2.523 1.012-4.06.997-1.73-.015-3.052-1.776-4.042-3.34-2.77-4.378-3.06-9.514-1.35-12.245 1.215-1.94 3.13-3.075 4.93-3.075 1.832 0 2.984 1.005 4.5 1.005 1.47 0 2.366-1.007 4.487-1.007 1.604 0 3.302.873 4.515 2.383-3.967 2.173-3.323 7.84.682 9.785z" />
    </svg>
  )
}
