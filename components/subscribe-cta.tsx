import { PODCAST_LINKS } from "@/lib/podcast"

/**
 * Subscription call-to-action shown at the bottom of every podcast episode
 * page. Intentionally understated to match a premium investment publication:
 * a hairline divider, restrained typography, and a primary/secondary button
 * pairing that leans on the site's existing gold accent rather than loud color.
 */
export function SubscribeCta() {
  return (
    <section
      aria-labelledby="subscribe-cta-heading"
      className="border-t border-border/40 py-14 text-center"
    >
      <h2
        id="subscribe-cta-heading"
        className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        Enjoyed this episode?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-pretty font-serif text-base leading-relaxed text-muted-foreground">
        Follow Markets Without Spin for weekly insights into the incentives that
        drive markets, corporations, and governments.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={PODCAST_LINKS.apple}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
        >
          <AppleIcon className="size-4" />
          Apple Podcasts
        </a>
        <a
          href={PODCAST_LINKS.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm border border-primary/45 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:bg-primary/5 sm:w-auto"
        >
          <SpotifyIcon className="size-4" />
          Spotify
        </a>
      </div>

      <p className="mt-9 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-primary">
        Follow the Incentives.
      </p>
    </section>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.114 2.99-.84.95-2.207 1.685-3.32 1.598a3.36 3.36 0 0 1-.024-.41c0-1.094.475-2.26 1.184-3.024.717-.78 1.943-1.37 2.96-1.41.02.155.314.155.314.256zM20.5 17.36c-.55 1.27-.815 1.84-1.524 2.96-.99 1.565-2.385 3.515-4.116 3.53-1.538.015-1.934-1.005-4.022-.993-2.088.012-2.523 1.012-4.06.997-1.73-.015-3.052-1.776-4.042-3.34-2.77-4.378-3.06-9.514-1.35-12.245 1.215-1.94 3.13-3.075 4.93-3.075 1.832 0 2.984 1.005 4.5 1.005 1.47 0 2.366-1.007 4.487-1.007 1.604 0 3.302.873 4.515 2.383-3.967 2.173-3.323 7.84.682 9.785z" />
    </svg>
  )
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.42.18.48.78.24 1.2zm.12-3.36C15.24 8.46 8.82 8.22 5.1 9.36c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.32-1.32 11.4-1.02 15.84 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.62.24z" />
    </svg>
  )
}
