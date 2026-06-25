import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Research Projects — Markets Without Spin",
  description:
    "The major long-term research initiatives being developed by Markets Without Spin, beginning with the flagship Incentives Index.",
}

const FUTURE_PROJECTS = [
  "Incentives Index",
  "Buyback Machine",
  "Government Incentives",
  "Executive Compensation Database",
  "Market Liquidity Research",
]

export default function ResearchProjectsPage() {
  return (
    <PageShell
      eyebrow="Research Projects"
      title="Long-term research into why companies behave the way they do."
      description="The major research initiatives being developed by Markets Without Spin — frameworks built to look past what happened and toward why it happened."
    >
      {/* Featured project */}
      <article className="overflow-hidden rounded-sm border border-border/60 bg-card p-8 lg:p-12">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
            Flagship Project
          </span>
          <span className="inline-flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/5 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            Coming Soon
          </span>
        </div>

        <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight text-foreground lg:text-4xl">
          Incentives Index
        </h2>

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
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold leading-tight text-foreground lg:text-3xl">
          Future Research Projects
        </h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_PROJECTS.map((title) => (
            <article key={title} className="flex flex-col bg-card p-8">
              <h3 className="text-balance font-heading text-xl font-bold leading-tight text-foreground">
                {title}
              </h3>
              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                  In Development
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
