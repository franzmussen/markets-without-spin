import Link from "next/link"
import {
  ArrowLeft,
  BookMarked,
  Calendar,
  Clock,
  ExternalLink,
  Headphones,
  ListChecks,
  PenLine,
} from "lucide-react"
import { EpisodePlayer } from "@/components/episode-player"
import {
  formatDuration,
  formatPubDate,
  type PodcastEpisode,
} from "@/lib/podcast"

type Block =
  | { type: "p"; text: string }
  | { type: "quote"; text: string; cite?: string }

type Section = { heading: string; blocks: Block[] }

const EDITOR_NOTE =
  "Markets Without Spin begins here. In this inaugural essay, Franz Amussen — an investor since 1969 — sets out the idea at the heart of everything that follows: that markets are governed less by numbers than by the incentives acting on the people behind them. Drawing a line from the 1970 collapse of Penn Central to the modern unraveling of General Electric, he makes the case for reading corporate behavior through the lens of reward and consequence. It is the philosophical foundation for the series."

const SECTIONS: Section[] = [
  {
    heading: "Executive Summary",
    blocks: [
      {
        type: "p",
        text: `Financial markets are often described as collections of numbers — earnings, valuations, interest rates, and economic statistics. Yet after more than four decades in the investment business, I have come to believe that markets are driven less by numbers than by incentives.`,
      },
      {
        type: "p",
        text: `Every corporate decision begins with people. People respond to rewards, avoid penalties, and adapt to the systems in which they operate. When those incentives encourage long-term thinking, shareholders prosper. When they reward appearances instead of substance, even great companies can slowly destroy themselves.`,
      },
      {
        type: "p",
        text: `The collapse of Penn Central in 1970 and the decline of General Electric decades later appear, at first glance, to be entirely different stories. One involved railroads, the other industrial manufacturing. One occurred before personal computers; the other unfolded in the age of sophisticated financial engineering.`,
      },
      {
        type: "p",
        text: `Yet both reveal the same fundamental truth: when management becomes more focused on maintaining the narrative than improving the business, failure becomes a matter of time.`,
      },
      {
        type: "quote",
        text: `This essay is not about trains or turbines. It is about incentives.`,
      },
    ],
  },
  {
    heading: "The Night the Trains Stopped Running",
    blocks: [
      {
        type: "p",
        text: `On June 21, 1970, Penn Central Transportation Company filed for bankruptcy, marking the largest corporate bankruptcy in American history at that time. The event shocked the nation. Penn Central was not an obscure company. It was a critical part of the economic infrastructure of the northeastern United States, moving coal, steel, automobiles, grain, and countless other products that powered American industry.`,
      },
      {
        type: "p",
        text: `To most Americans, the bankruptcy seemed impossible. How could a company so large, so essential, simply run out of money?`,
      },
      {
        type: "p",
        text: `The answer wasn't found in a single bad quarter or one unfortunate business decision. Penn Central had spent years masking deeper problems. Losses were hidden, debt was continually rolled forward, unrealistic financial projections were accepted, and dividends continued despite deteriorating fundamentals. By the time reality became unavoidable, the outcome had already been determined.`,
      },
      {
        type: "p",
        text: `Corporate failures rarely arrive without warning. They are usually preceded by years of rationalizations, optimistic assumptions, and decisions that postpone difficult choices rather than solving them.`,
      },
    ],
  },
  {
    heading: "A Personal Lesson",
    blocks: [
      {
        type: "p",
        text: `Penn Central's collapse was not merely a chapter in financial history for me.`,
      },
      {
        type: "p",
        text: `It happened during the summer before my senior year in high school, when I had already begun investing my own savings. Every dollar represented hours spent working after school. My broker was Jim Dettling at F. I. DuPont & Company, and my father gave him remarkably simple instructions:`,
      },
      {
        type: "quote",
        text: `Do whatever he tells you. It's his money. And this is how he's going to learn.`,
        cite: "— My father",
      },
      {
        type: "p",
        text: `Those words shaped my investment philosophy more than either of us realized at the time. My father understood that genuine investing requires personal responsibility. Mistakes are unavoidable, but they become invaluable teachers when the consequences belong to you.`,
      },
      {
        type: "p",
        text: `Watching Penn Central collapse taught me another lesson that would repeat itself throughout my career: no company is too large to fail if management loses sight of economic reality.`,
      },
    ],
  },
  {
    heading: "Markets Are Ultimately About Incentives",
    blocks: [
      {
        type: "p",
        text: `During more than forty years in the investment business, I lived through the crash of 1987, the technology bubble, the financial crisis of 2008, the era of near-zero interest rates, and many smaller booms and busts in between.`,
      },
      {
        type: "p",
        text: `Each cycle had its own story. Each had its own villains. Each had its own explanations. But beneath those differences lay something remarkably consistent: people respond to incentives.`,
      },
      {
        type: "p",
        text: `Charlie Munger expressed the idea memorably:`,
      },
      {
        type: "quote",
        text: `People do what they are rewarded for.`,
        cite: "— Charlie Munger",
      },
      {
        type: "p",
        text: `That observation explains far more about financial markets than most valuation models ever will.`,
      },
      {
        type: "p",
        text: `Executives whose compensation depends on quarterly earnings per share naturally search for ways to increase earnings per share. Investment bankers benefit from transactions. Consultants benefit from supporting management. Boards frequently rely on the same assumptions that management provides.`,
      },
      {
        type: "p",
        text: `None of these participants necessarily intend to create poor outcomes. Most are simply responding rationally to the incentives placed before them. The problem is that rational behavior at the individual level can produce destructive outcomes for shareholders.`,
      },
    ],
  },
  {
    heading: "The Evolution of Stock Buybacks",
    blocks: [
      {
        type: "p",
        text: `When I entered the investment profession, stock buybacks occupied a very different place in corporate finance. They were relatively uncommon and often viewed with suspicion. Today they are celebrated as evidence of "returning capital to shareholders." That phrase deserves closer examination.`,
      },
      {
        type: "p",
        text: `Dividends distribute cash equally to every shareholder. Buybacks distribute cash only to shareholders who choose to sell their shares.`,
      },
      {
        type: "p",
        text: `Those who continue holding receive no cash. Instead, they receive the hope that fewer outstanding shares will eventually increase earnings per share and support a higher stock price. Sometimes that happens. Sometimes it doesn't.`,
      },
      {
        type: "p",
        text: `The critical question is not whether buybacks are inherently good or bad. The question is whether management is repurchasing shares because they represent exceptional value — or because reducing the share count conveniently improves executive compensation metrics.`,
      },
    ],
  },
  {
    heading: "When Financial Engineering Replaces Business Engineering",
    blocks: [
      {
        type: "p",
        text: `General Electric illustrates the danger more clearly than almost any modern example. For generations, GE represented American industrial excellence. It traced its origins to Thomas Edison, maintained one of the strongest balance sheets in corporate America, and enjoyed the highest possible credit rating.`,
      },
      {
        type: "p",
        text: `Then financial engineering gradually became as important as engineering itself.`,
      },
      {
        type: "p",
        text: `Between 2010 and 2017, GE spent more than $40 billion repurchasing its own stock. Those repurchases occurred at prices that, in hindsight, proved disastrously optimistic. Internal valuation models supported the decisions. Outside advisors provided additional confidence. Management assured investors that the shares represented attractive value.`,
      },
      {
        type: "p",
        text: `Reality eventually reached the spreadsheets. The share price collapsed. The debt remained. The dividend was cut almost to nothing. Businesses were sold. Thousands of employees lost their jobs. One of America's most admired companies was removed from the Dow Jones Industrial Average after more than a century.`,
      },
      {
        type: "p",
        text: `The buybacks did not cause every one of GE's problems. But they demonstrated how easily sophisticated financial models can reinforce management's existing beliefs instead of challenging them.`,
      },
    ],
  },
  {
    heading: "Looking Beyond the Numbers",
    blocks: [
      {
        type: "p",
        text: `Financial statements matter. Valuation matters. Interest rates matter. But investors who study only the numbers often miss the most important question: what incentives are driving the people making these decisions?`,
      },
      {
        type: "p",
        text: `Are executives rewarded for building stronger businesses, or for producing stronger quarterly results? Are directors encouraging long-term capital allocation, or simply approving strategies that satisfy immediate market expectations?`,
      },
      {
        type: "p",
        text: `Once you begin asking those questions, many corporate decisions become much easier to understand.`,
      },
    ],
  },
  {
    heading: "Why Markets Without Spin Exists",
    blocks: [
      {
        type: "p",
        text: `This series is not intended to predict the next market correction or identify the next winning stock. There are already countless sources attempting to forecast tomorrow's prices. My goal is different.`,
      },
      {
        type: "p",
        text: `I want to understand the incentives that shape corporate behavior, influence capital allocation, and ultimately determine whether long-term shareholders prosper or suffer.`,
      },
      {
        type: "quote",
        text: `Markets are created by people. People respond to incentives.`,
      },
      {
        type: "p",
        text: `If we understand those incentives, we gain a deeper understanding not only of markets, but of the institutions that shape our economy. That idea will guide every essay and every episode that follows.`,
      },
    ],
  },
]

const KEY_TAKEAWAYS = [
  "Great companies rarely fail suddenly; deterioration usually begins years before collapse.",
  "Financial engineering cannot permanently replace sound business fundamentals.",
  "Stock buybacks should be evaluated by why they are undertaken, not simply by whether they occur.",
  "Executive compensation systems influence corporate behavior far more than many investors appreciate.",
  'The most valuable question an investor can ask is not, "What do the numbers say?" but, "What incentives produced those numbers?"',
]

const FURTHER_READING = [
  "Penn Central Transportation bankruptcy",
  "General Electric annual reports (2010–2018)",
  "SEC filings related to stock repurchase programs",
  "Charlie Munger, Poor Charlie's Almanack",
  "Berkshire Hathaway shareholder letters on capital allocation",
]

function PullQuote({ text, cite }: { text: string; cite?: string }) {
  return (
    <blockquote className="my-10 border-l-2 border-primary pl-6">
      <p className="text-balance font-heading text-2xl font-medium italic leading-snug text-foreground sm:text-[1.7rem]">
        {text}
      </p>
      {cite && (
        <cite className="mt-3 block font-mono text-[0.7rem] not-italic uppercase tracking-[0.18em] text-primary">
          {cite}
        </cite>
      )}
    </blockquote>
  )
}

export function PilotFlagshipArticle({ episode }: { episode: PodcastEpisode }) {
  const date = formatPubDate(episode.pubDate)
  const duration = formatDuration(episode.durationSeconds)

  return (
    <article className="mx-auto max-w-2xl">
      {/* Back link */}
      <Link
        href="/podcast"
        className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        All Episodes
      </Link>

      {/* Meta / byline row */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">Pilot Essay</span>
        <span aria-hidden className="text-border">
          /
        </span>
        <span>By Franz Amussen</span>
        {date && (
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" /> {date}
          </span>
        )}
        {duration && (
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {duration}
          </span>
        )}
      </div>

      {/* Embedded Libsyn player near the top */}
      {episode.audioUrl && (
        <div className="mt-8">
          <EpisodePlayer
            src={episode.audioUrl}
            initialDuration={episode.durationSeconds ?? 0}
          />
        </div>
      )}

      {/* Editor's Note */}
      <aside className="mt-10 rounded-sm border border-border/60 bg-card/50 p-6 sm:p-8">
        <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-primary">
          <PenLine className="size-3.5" /> Editor&apos;s Note
        </p>
        <p className="mt-4 text-pretty font-serif text-base italic leading-relaxed text-muted-foreground">
          {EDITOR_NOTE}
        </p>
      </aside>

      {/* Body */}
      {SECTIONS.map((section, i) => (
        <section
          key={section.heading}
          className={`border-t border-border/40 pt-10 ${i === 0 ? "mt-12" : "mt-14"}`}
        >
          <h2 className="text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-foreground">
            {section.heading}
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {section.blocks.map((block, j) =>
              block.type === "quote" ? (
                <PullQuote key={j} text={block.text} cite={block.cite} />
              ) : (
                <p
                  key={j}
                  className="text-pretty font-serif text-lg leading-relaxed text-foreground/85"
                >
                  {block.text}
                </p>
              ),
            )}
          </div>
        </section>
      ))}

      {/* Key Takeaways — visually distinct box */}
      <section className="mt-14">
        <div className="rounded-sm border border-primary/30 bg-card p-8 sm:p-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <ListChecks className="size-3.5" /> Key Takeaways
          </p>
          <ol className="mt-6 flex flex-col gap-5">
            {KEY_TAKEAWAYS.map((point, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 font-mono text-sm font-medium text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty font-serif text-lg leading-relaxed text-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Further Reading */}
      <section className="mt-14 border-t border-border/40 pt-10">
        <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          <BookMarked className="size-3.5" /> Further Reading
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {FURTHER_READING.map((ref, i) => (
            <li
              key={i}
              className="text-pretty font-serif text-lg leading-relaxed text-foreground/85"
            >
              {ref}
            </li>
          ))}
        </ul>
      </section>

      {/* Listen to the Podcast */}
      <section className="mt-16 border-t border-border/40 pt-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Listen to the Podcast
        </p>
        <h2 className="mt-3 text-balance font-heading text-2xl font-bold tracking-tight text-foreground">
          Hear the pilot episode in Franz&apos;s own words
        </h2>
        <p className="mt-4 max-w-xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
          Prefer to listen? Press play above, or open the episode on your
          favorite platform.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {episode.audioUrl && (
            <a
              href={episode.audioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Headphones className="size-4" /> Listen Now
            </a>
          )}
          {episode.pageUrl && (
            <a
              href={episode.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
            >
              <ExternalLink className="size-4" /> Listen on Libsyn
            </a>
          )}
          <Link
            href="/follow"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            All Platforms
          </Link>
        </div>
      </section>
    </article>
  )
}
