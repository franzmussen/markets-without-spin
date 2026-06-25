export const SITE = {
  name: "Markets Without Spin",
  tagline: "Follow the Incentives",
  intro:
    "Understanding the hidden forces that drive markets, governments, and human behavior.",
  thesis: "Most people focus on what happened. We focus on why it happened.",
}

export type NavItem = { label: string; href: string }

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Podcast Episodes", href: "/podcast" },
  { label: "Essays", href: "/essays" },
  { label: "Observations", href: "/observations" },
  { label: "Research Notes", href: "/research-notes" },
  { label: "Research Reports", href: "/research-reports" },
  { label: "Ideas in Progress", href: "/ideas-in-progress" },
  { label: "About Franz", href: "/about" },
  { label: "Subscribe", href: "/subscribe" },
]

export type Essay = {
  title: string
  dek: string
  category: string
  readingTime: string
  date: string
}

export const ESSAYS: Essay[] = [
  {
    title: "When the Trains Stopped Running",
    dek: "The night Penn Central collapsed and what its downfall reveals about incentives, debt, and the slow decay of institutions.",
    category: "Corporate History",
    readingTime: "16 min read",
    date: "June 20, 1970",
  },
  {
    title: "When Everyone Is Rational and the Outcome Is Absurd",
    dek: "Collective irrationality rarely requires irrational people. It requires a structure in which sensible individual choices compound into a result no one wanted.",
    category: "Markets",
    readingTime: "9 min read",
    date: "May 20, 2026",
  },
  {
    title: "The Tax That Wasn't About Revenue",
    dek: "Some taxes are designed to raise money. Others are designed to be seen raising money. Telling the two apart explains more politics than any manifesto.",
    category: "Public Finance",
    readingTime: "11 min read",
    date: "May 3, 2026",
  },
  {
    title: "Trust as Infrastructure",
    dek: "Institutions are expensive precisely because they let us stop checking. We examine what happens to an economy when the cost of trust quietly rises.",
    category: "Institutions",
    readingTime: "14 min read",
    date: "April 15, 2026",
  },
]

export type Observation = {
  title: string
  lines: string[]
  tag: string
}

export const OBSERVATIONS: Observation[] = [
  {
    title: "Buybacks return money to sellers — not shareholders.",
    lines: [
      "Dividends put cash in your pocket.",
      "Buybacks put hope in your portfolio.",
      "Hope is not a strategy.",
    ],
    tag: "Capital Allocation",
  },
  {
    title: "Intrinsic value is a story wrapped in math.",
    lines: [
      "Change the assumptions and the valuation changes with them.",
      "Models are often more persuasive than predictive.",
    ],
    tag: "Valuation",
  },
  {
    title: "People do what they are rewarded to do.",
    lines: [
      "If executive compensation rewards EPS growth above all else, financial engineering should surprise no one.",
    ],
    tag: "Incentives",
  },
]

export type ResearchNote = {
  title: string
  summary: string
}

export const RESEARCH_NOTES: ResearchNote[] = [
  {
    title: "The Rise of Financial Engineering",
    summary:
      "How executive compensation gradually shifted corporate priorities away from long-term investment and toward share-price optimization.",
  },
  {
    title: "Debt and the Illusion of Prosperity",
    summary:
      "Why borrowing can create the appearance of growth long before it creates lasting value.",
  },
  {
    title: "The Incentive Structure Behind Modern Markets",
    summary:
      "A framework for understanding why institutions behave the way they do.",
  },
]

export type ResearchReport = {
  title: string
  lede: string
  listLabel?: string
  items: string[]
  closing?: string
  status: string
}

export const RESEARCH_REPORTS: ResearchReport[] = [
  {
    title: "Insider Incentives",
    lede: "Follow what insiders do — not what they say.",
    listLabel: "Monthly analysis of:",
    items: [
      "Insider buying",
      "Insider selling",
      "Cluster purchases",
      "CEO transactions",
      "Conviction rankings",
      "Market implications",
    ],
    status: "Coming Soon",
  },
  {
    title: "Buyback Monitor",
    lede: "When buybacks create value — and when they destroy it.",
    listLabel: "Track:",
    items: [
      "Buyback announcements",
      "Debt-funded buybacks",
      "Insider sales during buybacks",
      "EPS engineering",
      "Capital allocation quality",
    ],
    status: "Coming Soon",
  },
  {
    title: "Follow the Incentives",
    lede: "A monthly essay and research report examining:",
    items: [
      "Governments",
      "Regulators",
      "Universities",
      "Corporations",
      "Financial institutions",
    ],
    closing: "Why they behave the way they do.",
    status: "Coming Soon",
  },
  {
    title: "The Dumb Money Theory",
    lede: "An ongoing investigation into:",
    items: [
      "Automatic retirement contributions",
      "Passive investing",
      "ETF concentration",
      "Baby boomer withdrawals",
      "Price discovery",
    ],
    closing: "And whether these forces are reshaping modern markets.",
    status: "Coming Soon",
  },
]

export type Idea = {
  title: string
  note: string
}

export const IDEAS: Idea[] = [
  {
    title: "The Dumb Money Theory",
    note: "How automatic retirement contributions may be reshaping market valuations.",
  },
  {
    title: "The Death of Price Discovery",
    note: "What happens when passive investing overwhelms active decision making.",
  },
  {
    title: "Follow the Incentives",
    note: "A general framework for analyzing governments, corporations, and institutions.",
  },
]
