import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Subscribe to Markets Without Spin",
  description:
    "Choose your favorite podcast platform and subscribe so you never miss a new episode.",
}

type Platform = {
  name: string
  description: string
  href: string
  icon: (props: { className?: string }) => React.ReactNode
}

const PLATFORMS: Platform[] = [
  {
    name: "Apple Podcasts",
    description: "Listen and subscribe on iPhone, iPad, and Mac.",
    href: "https://podcasts.apple.com/us/podcast/markets-without-spin/id6783024308",
    icon: AppleIcon,
  },
  {
    name: "Spotify",
    description: "Follow the show and stream every episode.",
    href: "https://open.spotify.com/",
    icon: SpotifyIcon,
  },
  {
    name: "RSS Feed",
    description: "Add the feed to any podcast app you prefer.",
    href: "#",
    icon: RssIcon,
  },
]

export default function FollowPage() {
  return (
    <PageShell
      eyebrow="Subscribe"
      title="Subscribe to Markets Without Spin"
      description="Choose your favorite podcast platform and subscribe so you never miss a new episode."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon
          const isPlaceholder = platform.href === "#"
          return (
            <a
              key={platform.name}
              href={platform.href}
              target={isPlaceholder ? undefined : "_blank"}
              rel={isPlaceholder ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-5 rounded-sm border border-primary/40 bg-card p-6 transition-colors hover:border-primary hover:bg-primary/5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-primary/40 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-lg font-bold text-foreground">
                  {platform.name}
                </span>
                <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted-foreground">
                  {platform.description}
                </span>
              </span>
            </a>
          )
        })}

        <div className="flex items-center justify-center rounded-sm border border-dashed border-border/70 p-6 text-center sm:col-span-2">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            More platforms coming soon
          </p>
        </div>
      </div>
    </PageShell>
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
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.46 8.82 8.22 5.1 9.36c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.32-1.32 11.4-1.02 15.84 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.62.24z" />
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
