import type { ReactNode } from "react"

/**
 * "Listen On" platform links.
 *
 * To update a link as a service goes live, simply replace the `href` value
 * below. Setting `href` to "#" (or leaving the placeholder) marks the platform
 * as "coming soon" — the button stays in place and keeps the layout identical,
 * it just becomes non-clickable until a real URL is added.
 */
type Platform = {
  name: string
  href: string
  icon: (props: { className?: string }) => ReactNode
}

const PLATFORMS: Platform[] = [
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/markets-without-spin/id6783024308",
    icon: AppleIcon,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/033EF1GNwUtff4G2vlauuh",
    icon: SpotifyIcon,
  },
  {
    // TODO: replace with the live YouTube Music URL when available.
    name: "YouTube Music",
    href: "#",
    icon: YouTubeMusicIcon,
  },
  {
    // TODO: replace with the live Amazon Music URL when available.
    name: "Amazon Music",
    href: "#",
    icon: AmazonMusicIcon,
  },
  {
    // TODO: replace with the live iHeartRadio URL when available.
    name: "iHeartRadio",
    href: "#",
    icon: IHeartRadioIcon,
  },
  {
    name: "RSS Feed",
    href: "https://feeds.libsyn.com/622775/rss",
    icon: RssIcon,
  },
]

export function ListenOn() {
  return (
    <section
      aria-labelledby="listen-on-heading"
      className="border-t border-border/40 pt-12"
    >
      <p
        id="listen-on-heading"
        className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary"
      >
        Listen On
      </p>
      <p className="mt-3 max-w-2xl text-pretty font-serif text-base leading-relaxed text-muted-foreground">
        Subscribe wherever you listen so new episodes arrive automatically.
      </p>

      <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon
          const isPlaceholder = platform.href === "#"
          return (
            <li key={platform.name}>
              <a
                href={platform.href}
                target={isPlaceholder ? undefined : "_blank"}
                rel={isPlaceholder ? undefined : "noopener noreferrer"}
                aria-disabled={isPlaceholder || undefined}
                className={
                  isPlaceholder
                    ? "group flex h-full items-center gap-3 rounded-sm border border-dashed border-border/70 bg-card px-4 py-3.5 text-muted-foreground"
                    : "group flex h-full items-center gap-3 rounded-sm border border-primary/40 bg-card px-4 py-3.5 transition-colors hover:border-primary hover:bg-primary/5"
                }
              >
                <span
                  className={
                    isPlaceholder
                      ? "flex size-9 shrink-0 items-center justify-center rounded-sm border border-border/60 bg-muted/30 text-muted-foreground"
                      : "flex size-9 shrink-0 items-center justify-center rounded-sm border border-primary/40 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  }
                >
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-heading text-sm font-bold text-foreground">
                    {platform.name}
                  </span>
                  {isPlaceholder && (
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Coming soon
                    </span>
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
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

function YouTubeMusicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zM9.6 8.4l6 3.6-6 3.6V8.4z" />
    </svg>
  )
}

function AmazonMusicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.4 2.4h19.2v19.2H2.4V2.4zm9.6 3.36a6.24 6.24 0 1 0 0 12.48 6.24 6.24 0 0 0 0-12.48zm-1.92 3.12l4.8 3.12-4.8 3.12V8.88z" />
      <path d="M4.08 18.72c4.704 2.64 11.136 2.64 15.84 0 .36-.192.708.24.36.552-2.04 1.86-5.4 2.808-8.28 2.808s-6.24-.948-8.28-2.808c-.348-.312 0-.744.36-.552z" />
    </svg>
  )
}

function IHeartRadioIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.6c-.36 0-.72-.12-1.02-.36C6.36 17.64 2.4 14.04 2.4 9.6 2.4 6.72 4.56 4.8 7.08 4.8c1.92 0 3.6 1.2 4.32 2.88h1.2C13.32 6 15 4.8 16.92 4.8c2.52 0 4.68 1.92 4.68 4.8 0 4.44-3.96 8.04-8.58 11.64-.3.24-.66.36-1.02.36z" />
    </svg>
  )
}

function RssIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.18 17.82a2.18 2.18 0 1 1-4.36 0 2.18 2.18 0 0 1 4.36 0zM2 8.42v3.05c5.27 0 9.54 4.27 9.54 9.53h3.05C14.59 13.83 9.17 8.42 2 8.42zm0-5.42v3.05c8.27 0 14.95 6.69 14.95 14.95H20C20 11.59 11.94 3 2 3z" />
    </svg>
  )
}
