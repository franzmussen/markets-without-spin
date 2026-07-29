/**
 * FLAGSHIP ESSAYS — the shared, data-driven content model for long-form
 * flagship essays (the Pilot and every numbered episode essay that follows).
 *
 * Both the Pilot and Episode 1 render through the SAME component
 * (components/flagship-article.tsx) using the SAME layout and styling. To add
 * a new flagship essay, add an entry here keyed by the episode's permanent
 * slug (see lib/episodes.ts) — no component or page changes required.
 */

/** A paragraph or a pull quote within a section. */
export type FlagshipBlock =
  | { type: "p"; text: string }
  | { type: "quote"; text: string; cite?: string }

/** A titled section of article body copy. */
export type FlagshipSection = { heading: string; blocks: FlagshipBlock[] }

/** A link in the closing "Related Reading" / "Next Episode" matter. */
export type FlagshipLink = {
  label: string
  description?: string
  /** Omit for a not-yet-published (placeholder) destination. */
  href?: string
  /** Small status tag, e.g. "Coming soon". */
  note?: string
}

export type FlagshipEssay = {
  // PageShell header
  eyebrow: string
  title: string
  description: string
  // Byline row
  metaLabel: string
  author: string
  // Body
  editorNote: string
  sections: FlagshipSection[]
  keyTakeaways: string[]
  /** Sections rendered after the Key Takeaways box (e.g. "Final Thoughts"). */
  closingSections?: FlagshipSection[]
  // Closing matter — a flagship uses either a plain reading list (Pilot)
  // or linked Related Reading + a Next Episode teaser (numbered episodes).
  furtherReading?: string[]
  relatedReading?: FlagshipLink[]
  nextEpisode?: FlagshipLink
  // "Listen to the Podcast" section copy
  listen: { title: string; description: string }
  // SEO / Open Graph
  seo: { title: string; description: string; ogDescription: string }
}

const PILOT_SLUG = "pilot-episode-introduction-to-markets-without-spin"
const EPISODE_1_SLUG = "episode-1-how-safe-companies-become-dangerous"

const PILOT: FlagshipEssay = {
  eyebrow: "Pilot Episode · Flagship Essay",
  title: "Markets Are Not About Numbers. They Are About Incentives.",
  description:
    "The inaugural essay of Markets Without Spin — how the incentives acting on the people behind a company, not the numbers on its statements, ultimately decide whether shareholders prosper or suffer.",
  metaLabel: "Pilot Essay",
  author: "By Franz Amussen",
  editorNote:
    "Markets Without Spin begins here. In this inaugural essay, Franz Amussen — an investor since 1969 — sets out the idea at the heart of everything that follows: that markets are governed less by numbers than by the incentives acting on the people behind them. Drawing a line from the 1970 collapse of Penn Central to the modern unraveling of General Electric, he makes the case for reading corporate behavior through the lens of reward and consequence. It is the philosophical foundation for the series.",
  sections: [
    {
      heading: "Executive Summary",
      blocks: [
        {
          type: "p",
          text: "Financial markets are often described as collections of numbers — earnings, valuations, interest rates, and economic statistics. Yet after more than four decades in the investment business, I have come to believe that markets are driven less by numbers than by incentives.",
        },
        {
          type: "p",
          text: "Every corporate decision begins with people. People respond to rewards, avoid penalties, and adapt to the systems in which they operate. When those incentives encourage long-term thinking, shareholders prosper. When they reward appearances instead of substance, even great companies can slowly destroy themselves.",
        },
        {
          type: "p",
          text: "The collapse of Penn Central in 1970 and the decline of General Electric decades later appear, at first glance, to be entirely different stories. One involved railroads, the other industrial manufacturing. One occurred before personal computers; the other unfolded in the age of sophisticated financial engineering.",
        },
        {
          type: "p",
          text: "Yet both reveal the same fundamental truth: when management becomes more focused on maintaining the narrative than improving the business, failure becomes a matter of time.",
        },
        {
          type: "quote",
          text: "This essay is not about trains or turbines. It is about incentives.",
        },
      ],
    },
    {
      heading: "The Night the Trains Stopped Running",
      blocks: [
        {
          type: "p",
          text: "On June 21, 1970, Penn Central Transportation Company filed for bankruptcy, marking the largest corporate bankruptcy in American history at that time. The event shocked the nation. Penn Central was not an obscure company. It was a critical part of the economic infrastructure of the northeastern United States, moving coal, steel, automobiles, grain, and countless other products that powered American industry.",
        },
        {
          type: "p",
          text: "To most Americans, the bankruptcy seemed impossible. How could a company so large, so essential, simply run out of money?",
        },
        {
          type: "p",
          text: "The answer wasn't found in a single bad quarter or one unfortunate business decision. Penn Central had spent years masking deeper problems. Losses were hidden, debt was continually rolled forward, unrealistic financial projections were accepted, and dividends continued despite deteriorating fundamentals. By the time reality became unavoidable, the outcome had already been determined.",
        },
        {
          type: "p",
          text: "Corporate failures rarely arrive without warning. They are usually preceded by years of rationalizations, optimistic assumptions, and decisions that postpone difficult choices rather than solving them.",
        },
      ],
    },
    {
      heading: "A Personal Lesson",
      blocks: [
        {
          type: "p",
          text: "Penn Central's collapse was not merely a chapter in financial history for me.",
        },
        {
          type: "p",
          text: "It happened during the summer before my senior year in high school, when I had already begun investing my own savings. Every dollar represented hours spent working after school. My broker was Jim Dettling at F. I. DuPont & Company, and my father gave him remarkably simple instructions:",
        },
        {
          type: "quote",
          text: "Do whatever he tells you. It's his money. And this is how he's going to learn.",
          cite: "— My father",
        },
        {
          type: "p",
          text: "Those words shaped my investment philosophy more than either of us realized at the time. My father understood that genuine investing requires personal responsibility. Mistakes are unavoidable, but they become invaluable teachers when the consequences belong to you.",
        },
        {
          type: "p",
          text: "Watching Penn Central collapse taught me another lesson that would repeat itself throughout my career: no company is too large to fail if management loses sight of economic reality.",
        },
      ],
    },
    {
      heading: "Markets Are Ultimately About Incentives",
      blocks: [
        {
          type: "p",
          text: "During more than forty years in the investment business, I lived through the crash of 1987, the technology bubble, the financial crisis of 2008, the era of near-zero interest rates, and many smaller booms and busts in between.",
        },
        {
          type: "p",
          text: "Each cycle had its own story. Each had its own villains. Each had its own explanations. But beneath those differences lay something remarkably consistent: people respond to incentives.",
        },
        { type: "p", text: "Charlie Munger expressed the idea memorably:" },
        {
          type: "quote",
          text: "People do what they are rewarded for.",
          cite: "— Charlie Munger",
        },
        {
          type: "p",
          text: "That observation explains far more about financial markets than most valuation models ever will.",
        },
        {
          type: "p",
          text: "Executives whose compensation depends on quarterly earnings per share naturally search for ways to increase earnings per share. Investment bankers benefit from transactions. Consultants benefit from supporting management. Boards frequently rely on the same assumptions that management provides.",
        },
        {
          type: "p",
          text: "None of these participants necessarily intend to create poor outcomes. Most are simply responding rationally to the incentives placed before them. The problem is that rational behavior at the individual level can produce destructive outcomes for shareholders.",
        },
      ],
    },
    {
      heading: "The Evolution of Stock Buybacks",
      blocks: [
        {
          type: "p",
          text: 'When I entered the investment profession, stock buybacks occupied a very different place in corporate finance. They were relatively uncommon and often viewed with suspicion. Today they are celebrated as evidence of "returning capital to shareholders." That phrase deserves closer examination.',
        },
        {
          type: "p",
          text: "Dividends distribute cash equally to every shareholder. Buybacks distribute cash only to shareholders who choose to sell their shares.",
        },
        {
          type: "p",
          text: "Those who continue holding receive no cash. Instead, they receive the hope that fewer outstanding shares will eventually increase earnings per share and support a higher stock price. Sometimes that happens. Sometimes it doesn't.",
        },
        {
          type: "p",
          text: "The critical question is not whether buybacks are inherently good or bad. The question is whether management is repurchasing shares because they represent exceptional value — or because reducing the share count conveniently improves executive compensation metrics.",
        },
      ],
    },
    {
      heading: "When Financial Engineering Replaces Business Engineering",
      blocks: [
        {
          type: "p",
          text: "General Electric illustrates the danger more clearly than almost any modern example. For generations, GE represented American industrial excellence. It traced its origins to Thomas Edison, maintained one of the strongest balance sheets in corporate America, and enjoyed the highest possible credit rating.",
        },
        {
          type: "p",
          text: "Then financial engineering gradually became as important as engineering itself.",
        },
        {
          type: "p",
          text: "Between 2010 and 2017, GE spent more than $40 billion repurchasing its own stock. Those repurchases occurred at prices that, in hindsight, proved disastrously optimistic. Internal valuation models supported the decisions. Outside advisors provided additional confidence. Management assured investors that the shares represented attractive value.",
        },
        {
          type: "p",
          text: "Reality eventually reached the spreadsheets. The share price collapsed. The debt remained. The dividend was cut almost to nothing. Businesses were sold. Thousands of employees lost their jobs. One of America's most admired companies was removed from the Dow Jones Industrial Average after more than a century.",
        },
        {
          type: "p",
          text: "The buybacks did not cause every one of GE's problems. But they demonstrated how easily sophisticated financial models can reinforce management's existing beliefs instead of challenging them.",
        },
      ],
    },
    {
      heading: "Looking Beyond the Numbers",
      blocks: [
        {
          type: "p",
          text: "Financial statements matter. Valuation matters. Interest rates matter. But investors who study only the numbers often miss the most important question: what incentives are driving the people making these decisions?",
        },
        {
          type: "p",
          text: "Are executives rewarded for building stronger businesses, or for producing stronger quarterly results? Are directors encouraging long-term capital allocation, or simply approving strategies that satisfy immediate market expectations?",
        },
        {
          type: "p",
          text: "Once you begin asking those questions, many corporate decisions become much easier to understand.",
        },
      ],
    },
    {
      heading: "Why Markets Without Spin Exists",
      blocks: [
        {
          type: "p",
          text: "This series is not intended to predict the next market correction or identify the next winning stock. There are already countless sources attempting to forecast tomorrow's prices. My goal is different.",
        },
        {
          type: "p",
          text: "I want to understand the incentives that shape corporate behavior, influence capital allocation, and ultimately determine whether long-term shareholders prosper or suffer.",
        },
        {
          type: "quote",
          text: "Markets are created by people. People respond to incentives.",
        },
        {
          type: "p",
          text: "If we understand those incentives, we gain a deeper understanding not only of markets, but of the institutions that shape our economy. That idea will guide every essay and every episode that follows.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Great companies rarely fail suddenly; deterioration usually begins years before collapse.",
    "Financial engineering cannot permanently replace sound business fundamentals.",
    "Stock buybacks should be evaluated by why they are undertaken, not simply by whether they occur.",
    "Executive compensation systems influence corporate behavior far more than many investors appreciate.",
    'The most valuable question an investor can ask is not, "What do the numbers say?" but, "What incentives produced those numbers?"',
  ],
  furtherReading: [
    "Penn Central Transportation bankruptcy",
    "General Electric annual reports (2010–2018)",
    "SEC filings related to stock repurchase programs",
    "Charlie Munger, Poor Charlie's Almanack",
    "Berkshire Hathaway shareholder letters on capital allocation",
  ],
  listen: {
    title: "Hear the pilot episode in Franz's own words",
    description:
      "Prefer to listen? Press play above, or open the episode on your favorite platform.",
  },
  seo: {
    title: "Markets Are Not About Numbers. They Are About Incentives.",
    description:
      "The inaugural essay of Markets Without Spin. From the 1970 collapse of Penn Central to the unraveling of General Electric, Franz Amussen makes the case for reading markets through incentives, not numbers.",
    ogDescription:
      "From the 1970 collapse of Penn Central to the unraveling of General Electric — why markets are governed by incentives, not numbers.",
  },
}

const EPISODE_1: FlagshipEssay = {
  eyebrow: "Episode 01 · Essay",
  title:
    'Credit Ratings, Incentives, and How "Safe Companies" Become Dangerous',
  description:
    "Why investors should look beyond earnings, credit ratings, and buybacks to understand what really drives corporate behavior.",
  metaLabel: "Episode 01 Essay",
  author: "By Franz Amussen",
  editorNote:
    "Investors spend an enormous amount of time analyzing financial statements, credit ratings, earnings reports, and analyst recommendations. Yet history is filled with companies that appeared financially sound — until they weren't. Why? Because the traditional metrics investors rely on often tell us where a company has been, not where it is going. The direction of a company is determined not by its balance sheet, but by the incentives of the people making decisions. This essay explores two remarkable corporate failures — Montana Power and Boeing — to show how changes in executive incentives can quietly hollow out even the strongest companies long before the market recognizes what is happening. My purpose isn't to criticize individual executives. It is to help investors understand the incentive structures that influence corporate behavior and, ultimately, shareholder outcomes.",
  sections: [
    {
      heading: "The Illusion of Safety",
      blocks: [
        {
          type: "p",
          text: "Most investors assume a company with an AA or AAA credit rating must have outstanding management.",
        },
        {
          type: "p",
          text: "That assumption is understandable — but it is wrong.",
        },
        {
          type: "quote",
          text: "A credit rating does not evaluate today's management team. It evaluates the financial legacy they inherited.",
        },
        {
          type: "p",
          text: "A company earns an exceptional credit rating through decades of conservative borrowing, disciplined capital allocation, careful risk management, and executives willing to sacrifice short-term gains for long-term stability. Those decisions are often made by leaders who retired years before today's executives arrived.",
        },
        {
          type: "p",
          text: "Think of it like inheriting a century-old family farm. The new owner didn't plant the orchards, build the irrigation system, or improve the soil. They simply inherited the results of generations of stewardship.",
        },
        { type: "p", text: "Corporate America works much the same way." },
        {
          type: "p",
          text: "A newly appointed CEO can inherit an extraordinary balance sheet built by predecessors who spent decades creating financial strength. That strength can hide poor decisions for years because the company has enough financial resilience to absorb mistakes before investors recognize the damage.",
        },
        {
          type: "p",
          text: "By the time the credit rating deteriorates, the destruction has often already occurred.",
        },
      ],
    },
    {
      heading: "Montana Power: Destroying a Century of Stewardship",
      blocks: [
        {
          type: "p",
          text: "For decades, Montana Power represented exactly the type of company conservative investors loved. It generated dependable cash flow. It paid reliable dividends. It carried little financial risk.",
        },
        {
          type: "p",
          text: "Many retirees — including my own parents — owned Montana Power because it appeared to be one of the safest investments available.",
        },
        { type: "p", text: "Then everything changed." },
        {
          type: "p",
          text: "New executives inherited an exceptionally strong company but pursued an entirely different vision. Rather than operating a stable regulated utility, management decided to chase the excitement of the late-1990s telecommunications boom.",
        },
        {
          type: "p",
          text: "The company sold the utility assets that had produced stable earnings for generations and reinvented itself as Touch America, a fiber-optic telecommunications company.",
        },
        {
          type: "p",
          text: "The timing could hardly have been worse. Within only a few years, the telecom bubble collapsed, revenues evaporated, debt mounted, and the company filed for bankruptcy.",
        },
        {
          type: "p",
          text: "What disappeared wasn't simply shareholder wealth. A century of disciplined capital allocation vanished because the incentive structure changed.",
        },
        {
          type: "p",
          text: "The executives who built Montana Power viewed themselves as stewards. The executives who followed viewed themselves as capital allocators pursuing rapid growth.",
        },
        {
          type: "quote",
          text: "The balance sheet did not fail first. The incentives did.",
        },
      ],
    },
    {
      heading: "Boeing: When Financial Engineering Replaced Engineering",
      blocks: [
        {
          type: "p",
          text: "If Montana Power demonstrates how financial strength can be squandered, Boeing demonstrates how corporate culture can change just as dramatically.",
        },
        {
          type: "p",
          text: "For generations Boeing was synonymous with engineering excellence. Its reputation wasn't built through clever accounting. It was built through extraordinary engineering.",
        },
        {
          type: "p",
          text: "Engineers occupied leadership positions. Product quality defined the company's identity. Safety wasn't simply another performance metric — it was the culture.",
        },
        {
          type: "p",
          text: "Following the merger with McDonnell Douglas, however, leadership priorities gradually shifted. Financial performance metrics assumed increasing importance, executive compensation became more closely tied to earnings per share and total shareholder return, and billions of dollars were directed toward stock repurchases.",
        },
        {
          type: "p",
          text: "The consequences were subtle at first. Research spending became less important. Engineering decisions increasingly competed with quarterly financial targets. Management attention shifted toward meeting performance metrics instead of strengthening engineering capability.",
        },
        {
          type: "p",
          text: "None of these changes produced immediate headlines. But together they fundamentally altered the organization's priorities.",
        },
        {
          type: "p",
          text: "The tragic 737 MAX accidents were not caused by a single bad decision. They reflected years of accumulated decisions influenced by changing incentives.",
        },
      ],
    },
    {
      heading: "Why I Oppose Stock Buybacks",
      blocks: [
        { type: "p", text: "My own view is straightforward." },
        {
          type: "p",
          text: "If a company truly has excess capital that it cannot reinvest at attractive rates, it should return that capital to its owners through dividends.",
        },
        {
          type: "p",
          text: "Every shareholder is treated equally. Every investor receives the same distribution. Each shareholder can then decide independently whether to reinvest those funds, purchase shares elsewhere, or simply spend the money.",
        },
        {
          type: "p",
          text: "Stock buybacks work differently. They reduce the number of shares outstanding, increasing earnings per share even if total earnings remain unchanged. Because executive compensation is frequently tied to earnings per share, total shareholder return, and stock price performance, buybacks often become more than a capital-allocation decision — they become part of the executive compensation system.",
        },
        {
          type: "quote",
          text: "When the same executives deciding whether to authorize buybacks also benefit from higher per-share metrics, that creates an inherent conflict of interest.",
        },
        {
          type: "p",
          text: "Shareholders should carefully examine whether the buyback primarily benefits the company — or management.",
        },
        {
          type: "p",
          text: "That doesn't mean every buyback is undertaken for improper reasons. It does mean investors should evaluate buyback programs with healthy skepticism and pay close attention to the incentives surrounding them.",
        },
      ],
    },
    {
      heading: "Follow the Incentives",
      blocks: [
        {
          type: "p",
          text: "One lesson emerges from both Montana Power and Boeing.",
        },
        {
          type: "quote",
          text: "Corporate decline rarely begins with deteriorating financial statements. It begins with changing incentives.",
        },
        {
          type: "p",
          text: "Credit ratings measure yesterday's discipline. Annual reports tell management's preferred story. Quarterly earnings describe recent performance.",
        },
        {
          type: "p",
          text: "But incentive structures reveal where the company is likely to go next.",
        },
        {
          type: "p",
          text: "Whenever you evaluate a company, ask questions that most investors never ask. How is management compensated? Which performance metrics determine bonuses? Does executive wealth depend upon long-term value creation — or short-term stock performance? Are buybacks increasing shareholder wealth — or simply increasing executive compensation?",
        },
        {
          type: "p",
          text: "Those questions often reveal far more than another spreadsheet ever will.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Credit ratings primarily reflect the financial discipline of previous management teams.",
    "Strong balance sheets can conceal years of poor capital allocation.",
    "Montana Power and Boeing demonstrate how changing incentives can destroy exceptional businesses.",
    "Executive compensation increasingly rewards financial engineering rather than operational excellence.",
    "Investors should evaluate buybacks in the context of management incentives — not corporate press releases.",
    "Understanding incentives provides a clearer picture of a company's future than traditional financial metrics alone.",
  ],
  closingSections: [
    {
      heading: "Final Thoughts",
      blocks: [
        {
          type: "p",
          text: "Markets are ultimately shaped by human behavior. Human behavior is shaped by incentives.",
        },
        {
          type: "p",
          text: "If we want to understand why corporations succeed, fail, innovate, or stagnate, we need to look beyond earnings releases and analyst ratings.",
        },
        { type: "p", text: "We need to ask a much simpler question:" },
        { type: "quote", text: "Who benefits from the decisions being made?" },
        {
          type: "p",
          text: "When you consistently follow the incentives, corporate behavior begins to make sense.",
        },
      ],
    },
  ],
  relatedReading: [
    {
      label: "Pilot Episode",
      description:
        "Markets Are Not About Numbers. They Are About Incentives. — the philosophical foundation for the series.",
      href: `/essays/${PILOT_SLUG}`,
    },
    {
      label: "Incentives Index",
      description:
        "Our forthcoming research platform measuring how well corporate management incentives align with long-term shareholders.",
      href: "/incentives-index",
    },
  ],
  nextEpisode: {
    label: "Episode 2",
    description: "The Opportunity Cost of Buybacks",
    note: "Coming soon",
  },
  listen: {
    title: "Hear this episode in Franz's own words",
    description:
      "Prefer to listen? Press play above, or open the episode on your favorite platform.",
  },
  seo: {
    title:
      'Credit Ratings, Incentives & How "Safe Companies" Become Dangerous',
    description:
      "How strong, highly-rated companies like Montana Power and Boeing collapse from within — and why executive incentives, not balance sheets, reveal where a company is really headed.",
    ogDescription:
      "Montana Power and Boeing looked safe — until they weren't. Franz Amussen on why incentives, not credit ratings, decide a company's future.",
  },
}

/** Flagship essays keyed by their permanent episode slug. */
export const FLAGSHIP_ESSAYS: Record<string, FlagshipEssay> = {
  [PILOT_SLUG]: PILOT,
  [EPISODE_1_SLUG]: EPISODE_1,
}

export function getFlagshipEssay(slug: string): FlagshipEssay | null {
  return FLAGSHIP_ESSAYS[slug] ?? null
}
