import { XMLParser } from "fast-xml-parser"
import { EPISODE_ARCHIVE } from "@/lib/episodes"

export const PODCAST_RSS_URL = "https://feeds.libsyn.com/622775/rss"

export type PodcastEpisode = {
  id: string
  slug: string
  title: string
  description: string
  audioUrl: string | null
  pageUrl: string | null
  pubDate: string | null
  durationSeconds: number | null
  episodeNumber: number | null
}

export type EpisodeReference = { label: string; url?: string }

/** A titled section of long-form article body copy. */
export type ArticleSection = { heading: string; paragraphs: string[] }

export type EpisodeExtras = {
  /** Long-form written article (Executive Summary, Historical Background, etc.). */
  article: ArticleSection[]
  keyTakeaways: string[]
  references: EpisodeReference[]
  transcript: string | null
}

/**
 * Supplemental, editorially-curated content keyed by episode slug.
 * The RSS feed does not provide key takeaways, references, or transcripts,
 * so add them here as episodes are produced. Any episode without an entry
 * renders only the sections that have real content on its article page.
 *
 * Note: the pilot episode is rendered as a bespoke flagship article
 * (see components/pilot-flagship-article.tsx) and does not use this map.
 */
export const EPISODE_EXTRAS: Record<string, Partial<EpisodeExtras>> = {}

export function getEpisodeExtras(slug: string): EpisodeExtras {
  const extras = EPISODE_EXTRAS[slug] ?? {}
  return {
    article: extras.article ?? [],
    keyTakeaways: extras.keyTakeaways ?? [],
    references: extras.references ?? [],
    transcript: extras.transcript ?? null,
  }
}

/** Builds a URL-safe slug from an episode title. */
export function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "")
  return slug || "episode"
}

function toText(value: unknown): string {
  if (value == null) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") return String(value)
  if (typeof value === "object" && "#text" in (value as Record<string, unknown>)) {
    return String((value as Record<string, unknown>)["#text"] ?? "")
  }
  return ""
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
}

function parseDuration(raw: string): number | null {
  if (!raw) return null
  // itunes:duration may be seconds ("3482") or "HH:MM:SS" / "MM:SS"
  if (/^\d+$/.test(raw)) return Number(raw)
  const parts = raw.split(":").map((p) => Number(p))
  if (parts.some((n) => Number.isNaN(n))) return null
  return parts.reduce((acc, n) => acc * 60 + n, 0)
}

export function formatDuration(seconds: number | null): string {
  if (!seconds || !Number.isFinite(seconds)) return ""
  const m = Math.round(seconds / 60)
  return `${m} min`
}

export function formatPubDate(pubDate: string | null): string {
  if (!pubDate) return ""
  const date = new Date(pubDate)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

/** Live metadata parsed from a single RSS <item>. */
type FeedMetadata = {
  guid: string | null
  episodeNumber: number | null
  title: string
  description: string
  audioUrl: string | null
  pageUrl: string | null
  pubDate: string | null
  durationSeconds: number | null
}

/**
 * Fetches and parses the RSS feed into live metadata. Returns `null` when the
 * feed cannot be reached or parsed, so callers can fall back to the archive's
 * baked-in values. The feed is NEVER used to decide which episodes exist —
 * only to refresh metadata on episodes defined in the permanent archive.
 */
async function fetchFeedMetadata(): Promise<FeedMetadata[] | null> {
  try {
    const res = await fetch(PODCAST_RSS_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "MarketsWithoutSpin/1.0" },
    })
    if (!res.ok) throw new Error(`Feed responded ${res.status}`)
    const xml = await res.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    })
    const data = parser.parse(xml)
    const rawItems = data?.rss?.channel?.item
    if (!rawItems) return null

    const items = Array.isArray(rawItems) ? rawItems : [rawItems]

    return items.map((item) => {
      const audioUrl = item.enclosure?.["@_url"] ?? null
      const episodeNumberRaw = toText(item["itunes:episode"])
      return {
        guid: toText(item.guid) || null,
        episodeNumber: episodeNumberRaw ? Number(episodeNumberRaw) : null,
        title: stripHtml(toText(item.title)),
        description: stripHtml(
          toText(item.description) || toText(item["itunes:summary"]),
        ),
        audioUrl,
        pageUrl: toText(item.link) || null,
        pubDate: toText(item.pubDate) || null,
        durationSeconds: parseDuration(toText(item["itunes:duration"])),
      }
    })
  } catch {
    return null
  }
}

/** Sorts episodes newest-first: highest episode number first, Pilot last. */
function byNewest(a: PodcastEpisode, b: PodcastEpisode): number {
  const na = a.episodeNumber ?? 0
  const nb = b.episodeNumber ?? 0
  if (nb !== na) return nb - na
  const ta = a.pubDate ? Date.parse(a.pubDate) : 0
  const tb = b.pubDate ? Date.parse(b.pubDate) : 0
  return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta)
}

/**
 * Returns every episode on the site, newest-first.
 *
 * The permanent archive (`EPISODE_ARCHIVE`) is the source of truth for which
 * episodes exist. Live RSS metadata (publish date, duration, audio URL, and
 * Libsyn page link) is merged onto each archived episode when available, but
 * an episode is NEVER removed just because it drops out of the feed. Episodes
 * found in the feed but not yet in the archive are appended so future
 * episodes surface automatically (add them to the archive to make permanent).
 */
export async function getEpisodes(): Promise<PodcastEpisode[]> {
  const feed = await fetchFeedMetadata()
  const feedItems = feed ?? []
  const usedFeedIndexes = new Set<number>()

  const findFeedMatch = (
    entry: (typeof EPISODE_ARCHIVE)[number],
  ): FeedMetadata | null => {
    let idx = feedItems.findIndex(
      (f, i) => !usedFeedIndexes.has(i) && f.guid && f.guid === entry.id,
    )
    if (idx === -1 && entry.episodeNumber != null) {
      idx = feedItems.findIndex(
        (f, i) =>
          !usedFeedIndexes.has(i) && f.episodeNumber === entry.episodeNumber,
      )
    }
    if (idx === -1) return null
    usedFeedIndexes.add(idx)
    return feedItems[idx]
  }

  // 1. Canonical archive episodes, enriched with live metadata when present.
  const episodes: PodcastEpisode[] = EPISODE_ARCHIVE.map((entry) => {
    const live = findFeedMatch(entry)
    return {
      id: entry.id,
      slug: entry.slug,
      title: entry.title,
      description: entry.summary || live?.description || "",
      audioUrl: live?.audioUrl ?? entry.audioUrl,
      pageUrl: live?.pageUrl ?? entry.pageUrl,
      pubDate: live?.pubDate ?? entry.pubDate,
      durationSeconds: live?.durationSeconds ?? entry.durationSeconds,
      episodeNumber: entry.episodeNumber,
    }
  })

  // 2. Feed-only episodes not yet in the archive (e.g. brand-new releases).
  const takenSlugs = new Set(episodes.map((e) => e.slug))
  feedItems.forEach((f, i) => {
    if (usedFeedIndexes.has(i)) return
    let slug = slugify(f.title || `episode-${f.episodeNumber ?? i + 1}`)
    let n = 2
    while (takenSlugs.has(slug)) slug = `${slugify(f.title)}-${n++}`
    takenSlugs.add(slug)
    episodes.push({
      id: f.guid || f.audioUrl || `feed-episode-${i}`,
      slug,
      title: f.title,
      description: f.description,
      audioUrl: f.audioUrl,
      pageUrl: f.pageUrl,
      pubDate: f.pubDate,
      durationSeconds: f.durationSeconds,
      episodeNumber: f.episodeNumber,
    })
  })

  return episodes.sort(byNewest)
}

/**
 * Looks up a single episode by its slug and returns it alongside a few
 * related episodes (most recent others) for the article page. Returns
 * null when no episode matches the slug.
 */
export async function getEpisodeBySlug(
  slug: string,
): Promise<{ episode: PodcastEpisode; related: PodcastEpisode[] } | null> {
  const episodes = await getEpisodes()
  const index = episodes.findIndex((ep) => ep.slug === slug)
  if (index === -1) return null
  const episode = episodes[index]
  const related = episodes.filter((_, i) => i !== index).slice(0, 3)
  return { episode, related }
}
