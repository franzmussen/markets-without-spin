/**
 * PERMANENT EPISODE ARCHIVE — the canonical source of truth for which
 * episodes exist on the Markets Without Spin website.
 *
 * This archive, NOT the RSS feed, determines which episodes appear on the
 * site and which article pages exist. The Libsyn RSS feed is only used to
 * refresh volatile metadata (publication date, duration, audio URL, and the
 * external Libsyn page link) onto these entries at request time.
 *
 * As a result, every episode below has a permanent URL and remains visible
 * even if it is ever removed from the RSS feed.
 *
 * HOW TO ADD A NEW EPISODE
 * 1. Add a new entry to the top of `EPISODE_ARCHIVE` below.
 * 2. Give it a permanent, unique `slug` (this becomes its URL forever — do
 *    not change it later, or existing links will break).
 * 3. Set `id` to the episode's RSS <guid> when known so live metadata merges
 *    reliably. If you don't have it yet, matching falls back to
 *    `episodeNumber`, and the baked-in fallback metadata below is used until
 *    the feed is read.
 *
 * New episodes that appear in the feed but are not yet listed here will still
 * surface automatically, but adding them here is what makes them permanent.
 */

export type ArchiveEpisode = {
  /** Stable identifier — the RSS <guid>. Primary key for merging live metadata. */
  id: string
  /** Permanent URL slug. Never change once published. */
  slug: string
  /** Canonical episode number. `null` for the Pilot. */
  episodeNumber: number | null
  /** Canonical title (owned by the site, not the feed). */
  title: string
  /** Canonical summary shown in listings and as the article lead. */
  summary: string
  /** Last-known audio URL, used as a fallback when the feed is unavailable. */
  audioUrl: string | null
  /** Last-known external Libsyn page, used as a fallback. */
  pageUrl: string | null
  /** Last-known publish date (RFC 822), used as a fallback. */
  pubDate: string | null
  /** Last-known duration in seconds, used as a fallback. */
  durationSeconds: number | null
}

const LIBSYN_AUDIO_BASE =
  "https://traffic.libsyn.com/secure/05234931-0d38-4811-b9c0-220ce4913f8b"

export const EPISODE_ARCHIVE: ArchiveEpisode[] = [
  {
    id: "95cf6509-170b-41f0-b6b2-e721f0726f36",
    slug: "episode-7-the-anatomy-of-a-market-illusion",
    episodeNumber: 7,
    title:
      "Episode 7: The Anatomy of a Market Illusion — Why Smart People Believe Bad Stories",
    summary:
      "Why smart people believe bad stories — the three elements of every market illusion, from Bonneville Pacific and familiarity risk to Utah's penny-stock boom and unverifiable nuclear pitches, and the practical rules that keep investors out of narrative traps.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Episode_7_Final_01.mp3?dest-id=5479380`,
    pageUrl: null,
    pubDate: "Tue, 28 Jul 2026 07:01:00 +0000",
    durationSeconds: 551,
  },
  {
    id: "9ff252f8-c147-408c-9116-386f6cfee446",
    slug: "episode-6-corporate-boards-and-shareholder-risk",
    episodeNumber: 6,
    title:
      "Episode 6: Corporate Boards, Corporate Governance & Shareholder Risk — The Illusion of Oversight",
    summary:
      "Do corporate boards really protect shareholders, or do they simply create the appearance of accountability? Drawing on the collapse of Bonneville Pacific and lessons from Enron, Franz Amussen examines why so many boards struggle to challenge management and identify risk.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Episode_6_Final_01.mp3?dest-id=5479380`,
    pageUrl: null,
    pubDate: "Tue, 21 Jul 2026 10:00:00 +0000",
    durationSeconds: 807,
  },
  {
    id: "58a3cdff-cb27-4e38-af9d-dc907a045972",
    slug: "episode-5-the-liquidity-mirage",
    episodeNumber: 5,
    title:
      "Episode 5: Passive Investing, Money Printing & Stock Buybacks — The Liquidity Mirage",
    summary:
      "How passive investing, unprecedented monetary expansion, and corporate stock buybacks combined to create one of the longest bull markets in history — and why the market liquidity they produced may be far shallower than it appears.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Episode_5_Final_01.mp3?dest-id=5479380`,
    pageUrl: null,
    pubDate: "Tue, 14 Jul 2026 10:00:00 +0000",
    durationSeconds: 866,
  },
  {
    id: "e43c8fdd-6768-40ae-90a2-5c6663ebf7ec",
    slug: "episode-4-passive-investing-and-market-flows",
    episodeNumber: 4,
    title:
      "Episode 4: Passive Investing, Market Flows & the Hidden Machinery of the Stock Market",
    summary:
      "Why do stock prices move even when there is no news? Franz Amussen explores the hidden forces — index funds, ETFs, buybacks, target-date funds, and systematic rebalancing flows — that increasingly drive today's markets beneath the headlines.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Episode_4_Final_01.mp3?dest-id=5479380`,
    pageUrl: null,
    pubDate: "Tue, 07 Jul 2026 10:00:00 +0000",
    durationSeconds: 929,
  },
  {
    id: "6019dc72-8eec-4071-8670-02c54bf2842e",
    slug: "episode-3-the-incentive-mirage",
    episodeNumber: 3,
    title:
      "Episode 3: The Incentive Mirage — Executive Compensation, Buybacks & Insider Selling",
    summary:
      "Are executives truly aligned with shareholders? Using proxy statements, Form 4 filings, and SEC disclosures, Franz Amussen shows how executive compensation, buybacks, insider selling, and equity awards reward short-term value extraction over long-term ownership.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Episode_3_Final_01.mp3?dest-id=5479380`,
    pageUrl: null,
    pubDate: "Tue, 30 Jun 2026 10:00:00 +0000",
    durationSeconds: 811,
  },
  {
    id: "fc25674d-629b-4688-be25-d6f22bd48e2b",
    slug: "episode-2-the-buyback-machine",
    episodeNumber: 2,
    title:
      "Episode 2: The Buyback Machine — How Modern Incentives Drive Corporate Behavior",
    summary:
      "The real reason stock buybacks dominate corporate America: executive incentives. From EPS targets and TSR windows to dilution cycles and mega-grants, Franz Amussen breaks down the machinery — with case studies from IBM, Apple, Salesforce, and the airlines.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Episode_2_Final_01.mp3?dest-id=5479380`,
    pageUrl: null,
    pubDate: "Mon, 22 Jun 2026 17:57:00 +0000",
    durationSeconds: 1235,
  },
  {
    id: "a560f58e-9a77-4096-9c7e-47834ec04d44",
    slug: "episode-1-how-safe-companies-become-dangerous",
    episodeNumber: 1,
    title:
      'Episode 1: Credit Ratings, Incentives, and How "Safe Companies" Become Dangerous',
    summary:
      "Why companies with strong reputations — and even strong credit ratings — can collapse from the inside. Franz Amussen uses Montana Power, Boeing, and other cautionary tales to expose the incentives behind corporate failure.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Episode_1_Final_01.mp3?dest-id=5479380`,
    pageUrl: null,
    pubDate: "Mon, 22 Jun 2026 17:40:00 +0000",
    durationSeconds: 758,
  },
  {
    id: "1c5cb620-9e2c-4860-8ad3-044d3d2cc4ca",
    slug: "pilot-episode-introduction-to-markets-without-spin",
    episodeNumber: null,
    title: "Pilot Episode: Introduction to Markets Without Spin",
    summary:
      "The inaugural episode of Markets Without Spin — how distorted incentives, not bad luck, drive institutional failure, and why stock buybacks, debt, and executive pay so often accelerate the decline.",
    audioUrl: `${LIBSYN_AUDIO_BASE}/Markets_Without_Spin_Pilot_Final_01.mp3?dest-id=5479380`,
    pageUrl:
      "https://sites.libsyn.com/622775/pilot-episode-introduction-to-markets-without-spin",
    pubDate: "Thu, 18 Jun 2026 19:01:00 +0000",
    durationSeconds: 843,
  },
]
