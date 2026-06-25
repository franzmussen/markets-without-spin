import { XMLParser } from "fast-xml-parser"

export const PODCAST_RSS_URL = "https://feeds.libsyn.com/622775/rss"

// Fallback used only if the feed cannot be reached at request time.
export const PILOT_FALLBACK: PodcastEpisode = {
  id: "pilot-fallback",
  title: "Pilot Episode: Introduction to Markets Without Spin",
  description:
    "A dramatic exploration of how institutions fail when incentives become distorted—and why stock buybacks, debt, and executive incentives often accelerate decline.",
  audioUrl:
    "https://traffic.libsyn.com/05234931-0d38-4811-b9c0-220ce4913f8b/Markets_Without_Spin_Pilot_Final_01.mp3",
  pageUrl:
    "https://sites.libsyn.com/622775/pilot-episode-introduction-to-markets-without-spin",
  pubDate: null,
  durationSeconds: null,
  episodeNumber: 1,
}

export type PodcastEpisode = {
  id: string
  title: string
  description: string
  audioUrl: string | null
  pageUrl: string | null
  pubDate: string | null
  durationSeconds: number | null
  episodeNumber: number | null
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

/**
 * Fetches and parses episodes from the Markets Without Spin RSS feed.
 * Episodes are returned newest-first. Revalidates hourly so newly
 * published episodes appear automatically without code changes.
 */
export async function getEpisodes(): Promise<PodcastEpisode[]> {
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
    if (!rawItems) return [PILOT_FALLBACK]

    const items = Array.isArray(rawItems) ? rawItems : [rawItems]

    const episodes: PodcastEpisode[] = items.map((item, index) => {
      const enclosure = item.enclosure
      const audioUrl = enclosure?.["@_url"] ?? null
      const durationRaw = toText(item["itunes:duration"])
      const episodeNumberRaw = toText(item["itunes:episode"])
      const description = stripHtml(
        toText(item.description) || toText(item["itunes:summary"]),
      )

      return {
        id: toText(item.guid) || audioUrl || `episode-${index}`,
        title: stripHtml(toText(item.title)),
        description,
        audioUrl,
        pageUrl: toText(item.link) || null,
        pubDate: toText(item.pubDate) || null,
        durationSeconds: parseDuration(durationRaw),
        episodeNumber: episodeNumberRaw ? Number(episodeNumberRaw) : null,
      }
    })

    return episodes.length > 0 ? episodes : [PILOT_FALLBACK]
  } catch {
    return [PILOT_FALLBACK]
  }
}
