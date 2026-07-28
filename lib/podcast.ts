import { XMLParser } from "fast-xml-parser"

export const PODCAST_RSS_URL = "https://feeds.libsyn.com/622775/rss"

// Fallback used only if the feed cannot be reached at request time.
export const PILOT_FALLBACK: PodcastEpisode = {
  id: "pilot-fallback",
  slug: "pilot-episode-introduction-to-markets-without-spin",
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
 * gracefully falls back to placeholder sections on its article page.
 */
export const EPISODE_EXTRAS: Record<string, Partial<EpisodeExtras>> = {
  "pilot-episode-introduction-to-markets-without-spin": {
    article: [
      {
        heading: "Executive Summary",
        paragraphs: [
          "Markets Without Spin begins with a deceptively simple premise: most of the disasters that wipe out investors are not caused by bad luck, black swans, or forces no one could have foreseen. They are caused by incentives. When the rewards inside a company, a bank, or a rating agency quietly drift away from the interests of the people who own the shares or hold the debt, the institution starts to rot from the inside long before the market notices. By the time the headlines arrive, the damage is already done.",
          "This pilot episode lays out the intellectual foundation for everything the show will examine in the seasons to come. It argues that financial storytelling — the polished narratives management teams tell about growth, efficiency, and shareholder value — is frequently a form of misdirection. Stock buybacks are presented as confidence. Rising debt is reframed as disciplined capital allocation. Executive pay packages are described as alignment. In reality, each of these tools can be turned into a mechanism for extracting value from the future and booking it as success today.",
          "The goal of the episode is not to preach doom or to argue that markets are rigged. It is to give listeners a durable mental model: follow the incentives, read the numbers management would rather you skim, and treat every confident narrative as a hypothesis to be tested rather than a fact to be trusted. Investors who internalize that discipline are far harder to fool — and far less likely to be the last ones holding a story after the spin runs out.",
          "Markets Without Spin is built around a simple editorial method. Each episode takes an idea that the financial world treats as settled — that buybacks return value to shareholders, that leverage is just efficient capital structure, that a rising stock price validates a strategy — and pressure-tests it against the historical record and the primary financial documents. The show is less interested in predicting the next crash than in teaching a way of seeing, so that listeners can recognize the same structures forming in real time and decide for themselves whether the story holds together.",
        ],
      },
      {
        heading: "Historical Background",
        paragraphs: [
          "The pattern the show tracks is not new. In 1970, the Penn Central Transportation Company collapsed into what was then the largest bankruptcy in American history. For years its management had projected stability and paid dividends it could not truly afford, borrowing heavily and using accounting maneuvers to obscure a deteriorating core business. Investors and creditors who trusted the reported numbers, rather than the underlying cash flows, were stunned when the railroad ran out of money. The lesson was available in the financials long before it appeared in the press.",
          "Three decades later, Enron told a more sophisticated version of the same story. Its incentives rewarded reported earnings and a rising share price above all else, and its executives built an elaborate architecture of off-balance-sheet entities to manufacture exactly those outcomes. The narrative was dazzling — Enron was celebrated as the most innovative company in America right up until it wasn't. When the incentives and the accounting finally diverged from economic reality, the collapse was sudden and total.",
          "The 2008 financial crisis generalized the problem to an entire system. Mortgage originators were paid to write loans, not to ensure they would be repaid. Banks were paid to package and sell those loans, not to hold the risk. Credit rating agencies were paid by the very issuers whose securities they were supposed to judge impartially. Every link in the chain faced an incentive to keep the machine running, and every link told a reassuring story about risk being diversified away. When house prices stopped rising, the stories collapsed in unison, because they had all been describing the same illusion.",
          "More recent episodes rhyme with the older ones. General Electric spent years buying back stock at elevated prices and financing its industrial ambitions with a sprawling, opaque finance arm, all while presenting itself as a model of managerial excellence; the reckoning erased hundreds of billions of dollars in value. WeWork wrapped a conventional and cash-hungry real estate business in the language of technology and community, and public investors balked only when the numbers were finally forced into the open. Different decades, different industries, identical mechanics: incentives pointed one way, the narrative pointed another, and the gap between them was the risk no one was pricing.",
          "The savings-and-loan crisis of the 1980s and the dot-com bubble of the late 1990s belong to the same lineage. Thrifts were handed incentives to chase yield with federally insured deposits, privatizing the gains while socializing the losses, and hundreds of them failed. A decade later, internet companies were valued on eyeballs and page views rather than profits, because the reigning narrative insisted that traditional measures of value no longer applied. In both cases a new story was used to justify why the old rules of cash flow and solvency had been suspended — and in both cases the old rules reasserted themselves with brutal precision once sentiment turned.",
          "What unites these cases is not fraud in the criminal sense — much of what happened was perfectly legal — but the slow, rational response of intelligent people to the rewards placed in front of them. Buybacks boost the per-share metrics that trigger executive bonuses. Leverage flatters returns on equity as long as conditions are calm. Optimistic accounting choices are defensible one quarter at a time. None of it requires a villain. It only requires incentives that are misaligned and a market willing to accept the story at face value.",
        ],
      },
      {
        heading: "Lessons for Investors",
        paragraphs: [
          "The first lesson is to read the financial statements management would prefer you to skim. Cash flow is harder to manufacture than earnings, so a company that reports rising profits while free cash flow stagnates deserves scrutiny rather than applause. Watch how growth is being funded: expansion paid for out of genuine operating cash is a very different thing from expansion financed by ever-larger piles of debt.",
          "The second lesson is to treat share buybacks as a question, not an answer. Repurchases can be a sensible way to return capital when a stock is genuinely cheap and the balance sheet is strong. But buybacks funded with borrowed money, executed at rich valuations, and timed to lift the per-share metrics that determine executive pay are a warning sign. Ask who benefits from the buyback and whether the same cash could have strengthened the business instead.",
          "The third lesson is to read the incentives before you read the pitch. Proxy statements reveal how executives are actually paid, and that structure predicts behavior far more reliably than any mission statement. If compensation is tied to short-term share price or to earnings-per-share targets that buybacks can engineer, expect decisions that serve those targets — sometimes at the expense of the long-term health of the company you own.",
          "The fourth lesson is to distrust unanimous confidence. When management, sell-side analysts, and the financial press are all telling the same reassuring story, the risk is not that they are wrong about the facts but that everyone is leaning on the same narrative and no one is testing it. The most dangerous moments in markets are not when people are fearful; they are when a comforting consensus has quietly become detached from the underlying numbers.",
          "The fifth lesson is to build a margin of safety into both the price you pay and the size of the position you take. Even a careful analyst will sometimes be wrong, because incentives can hide problems for years and management controls the flow of information. Paying a sensible price relative to conservative estimates of cash flow, and refusing to let any single conviction dominate a portfolio, means that being wrong becomes survivable rather than catastrophic. Great long-term records are built less on being right more often than on ensuring that the inevitable mistakes are not fatal.",
          "The final lesson is temperamental rather than technical. Skepticism is not cynicism. The point is not to assume every company is a fraud or to sit out of markets entirely, but to hold narratives loosely and evidence tightly. Investors who insist on understanding how a business actually makes money, who follow the incentives, and who are willing to be unfashionably patient tend to avoid the worst outcomes — and to be buying when the spin has finally worn off and prices reflect reality again.",
        ],
      },
    ],
    keyTakeaways: [
      "Most large financial failures are driven by misaligned incentives, not by unforeseeable shocks — the warning signs usually sit in plain view inside the numbers.",
      "Corporate narratives about growth, efficiency, and shareholder value are hypotheses to be tested, not facts to be trusted.",
      "Stock buybacks can signal confidence or conceal weakness; what matters is how they are funded, the price paid, and who is rewarded by them.",
      "Rising debt used to flatter returns and fund buybacks is one of the clearest signals that reported success may be borrowed from the future.",
      "Executive pay structures predict corporate behavior — read the proxy statement before you believe the pitch.",
      "Unanimous, comfortable consensus among management, analysts, and the press is a risk factor, not a reassurance.",
    ],
    references: [
      {
        label:
          "Penn Central Transportation Company bankruptcy (1970) — a foundational case of reported stability masking deteriorating cash flows.",
      },
      {
        label:
          "Enron Corporation collapse (2001) — incentives tied to reported earnings and share price, enabled by off-balance-sheet accounting.",
      },
      {
        label:
          "The 2008 financial crisis — misaligned incentives across mortgage originators, banks, and credit rating agencies.",
      },
      {
        label:
          "General Electric — buybacks at elevated prices and an opaque finance arm preceding a historic loss of shareholder value.",
      },
      {
        label:
          "WeWork — a cash-intensive real estate business reframed in the language of technology and growth.",
      },
    ],
  },
}

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
      const title = stripHtml(toText(item.title))
      const description = stripHtml(
        toText(item.description) || toText(item["itunes:summary"]),
      )

      return {
        id: toText(item.guid) || audioUrl || `episode-${index}`,
        slug: slugify(title || `episode-${index + 1}`),
        title,
        description,
        audioUrl,
        pageUrl: toText(item.link) || null,
        pubDate: toText(item.pubDate) || null,
        durationSeconds: parseDuration(durationRaw),
        episodeNumber: episodeNumberRaw ? Number(episodeNumberRaw) : null,
      }
    })

    // Ensure slugs are unique so every episode has a distinct URL.
    const seen = new Set<string>()
    for (const ep of episodes) {
      let candidate = ep.slug
      let n = 2
      while (seen.has(candidate)) {
        candidate = `${ep.slug}-${n++}`
      }
      ep.slug = candidate
      seen.add(candidate)
    }

    return episodes.length > 0 ? episodes : [PILOT_FALLBACK]
  } catch {
    return [PILOT_FALLBACK]
  }
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
