import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { RESEARCH_NOTES, IDEAS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Research — Markets Without Spin",
  description:
    "Research notes, long-term projects, and ideas in progress from Markets Without Spin — the reasoning behind the essays, before it is polished.",
}

const FUTURE_PROJECTS = [
  "Incentives Index",
  "Buyback Machine",
  "Government Incentives",
  "Executive Compensation Database",
  "Market Liquidity Research",
]

const SUBSECTIONS = [
  { href: "#notes", label: "Research Notes" },
  { href: "#projects", label: "Research Projects" },
  { href: "#ideas", label: "Ideas in Progress" },
]

export default function ResearchPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="The reasoning, before it is polished"
      description="Working notes, long-term projects, and half-formed ideas — the raw material behind the essays. Provisional by design."
    >
      {/* In-page subsection navigation */}
      <nav
        aria-label="Research sections"
        className="flex flex-wrap gap-3 border-y border-border/50 py-4"
      >
        {SUBSECTIONS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="rounded-sm border border-border/60 px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* Research Notes */}
      <section id="notes" className="mt-14 scroll-mt-24">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Research Notes
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-bold leading-tight text-foreground">
          Open notebooks, provisional by design
        </h2>
        <p className="mt-3 max-w-2xl text-pretty font-serif leading-relaxed text-muted-foreground">
          Data I am chasing, models I am stress-testing, and methodology I am
          still arguing with.
        </p>
        <div className="mt-8 divide-y divide-border/50 border-y border-border/50">
          {RESEARCH_NOTES.map((note, i) => (
            <article
              key={note.title}
              className="grid gap-3 py-8 md:grid-cols-[0.4fr_2fr] md:gap-10"
            >
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary">
                No. {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {note.title}
                </h3>
                <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {note.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Research Projects */}
      <section id="projects" className="mt-16 scroll-mt-24 border-t border-border/40 pt-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Research Projects
        </p>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-bold leading-tight text-foreground">
          Long-term research into why companies behave the way they do
        </h2>

        {/* Flagship project */}
        <article className="mt-8 overflow-hidden rounded-sm border border-border/60 bg-card p-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
              Flagship Project
            </span>
            <span className="inline-flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/5 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Coming Soon
            </span>
          </div>

          <h3 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight text-foreground lg:text-4xl">
            Incentives Index
          </h3>

          <div className="mt-6 max-w-3xl space-y-5 font-serif text-lg leading-relaxed text-foreground/85">
            <p>The Incentives Index is the flagship research project of Markets Without Spin.</p>
            <p>Most investment research measures what companies have done.</p>
            <p>The Incentives Index asks why they behave the way they do.</p>
            <p>
              The project evaluates publicly traded companies by analyzing the incentives that
              influence management decisions, including executive compensation, insider ownership,
              capital allocation, stock buybacks, governance, accounting quality, shareholder
              alignment, and other factors that help distinguish long-term value creation from
              short-term financial engineering.
            </p>
            <p>Our philosophy is simple:</p>
            <p className="font-heading text-xl font-bold not-italic text-primary">Follow the Incentives.</p>
            <p>Most investors ask what happened.</p>
            <p>We ask why it happened.</p>
            <p>
              The Incentives Index is currently under development and will eventually provide
              investors with an objective framework for evaluating whether corporate incentives are
              aligned with long-term shareholders.
            </p>
          </div>
        </article>

        {/* Future projects */}
        <div className="mt-12">
          <h3 className="font-heading text-2xl font-bold leading-tight text-foreground lg:text-3xl">
            Future Research Projects
          </h3>
          <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {FUTURE_PROJECTS.map((title) => (
              <article key={title} className="flex flex-col bg-card p-8">
                <h4 className="text-balance font-heading text-xl font-bold leading-tight text-foreground">
                  {title}
                </h4>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                    In Development
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ideas in Progress */}
      <section id="ideas" className="mt-16 scroll-mt-24 border-t border-border/40 pt-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Ideas in Progress
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-bold leading-tight text-foreground">
          Thinking out loud, on purpose
        </h2>
        <p className="mt-3 max-w-2xl text-pretty font-serif leading-relaxed text-muted-foreground">
          The workshop floor. Some of these become essays, some become episodes,
          and some quietly fall apart.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {IDEAS.map((idea) => (
            <article
              key={idea.title}
              className="rounded-sm border border-dashed border-border/70 bg-secondary/20 p-7"
            >
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-primary">
                In progress
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">
                {idea.title}
              </h3>
              <p className="mt-2 text-pretty text-lg leading-relaxed text-muted-foreground">
                {idea.note}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
