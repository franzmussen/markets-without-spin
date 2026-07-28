import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Gauge, LineChart, ListChecks, ShieldCheck } from "lucide-react"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Incentives Index — Markets Without Spin",
  description:
    "A research platform in development that measures how well corporate management incentives align with the interests of long-term shareholders.",
}

const METHOD_STEPS = [
  {
    icon: ListChecks,
    title: "Read the filings, not the press release",
    body: "Every score begins with the proxy statement (DEF 14A), compensation tables, and plan mechanics — the primary sources that reveal what management is actually paid to do.",
  },
  {
    icon: Gauge,
    title: "Score the incentive structure",
    body: "We evaluate the metrics that trigger payouts, the performance windows they use, ownership requirements, and how aggressively pay tracks share count, debt, and buybacks rather than durable value.",
  },
  {
    icon: LineChart,
    title: "Weight for the long term",
    body: "Structures that reward multi-year capital discipline and real returns on capital score higher than those that reward short-term EPS engineering or metrics management can manufacture.",
  },
  {
    icon: ShieldCheck,
    title: "Publish a transparent grade",
    body: "Each company receives a clear alignment grade with the reasoning shown — no black box, no proprietary hand-waving. You can see exactly why a score is what it is.",
  },
]

const PRINCIPLES = [
  "People do what they are rewarded to do — so read the reward before you read the strategy.",
  "Alignment is structural, not rhetorical. What the plan pays for matters more than what the letter to shareholders says.",
  "Short-term metrics can be engineered. Long-term capital discipline is much harder to fake.",
  "Transparency over precision theater: a clear, defensible grade beats a false-precision number.",
]

export default function IncentivesIndexPage() {
  return (
    <PageShell
      eyebrow="Incentives Index"
      title="Measuring whether management is paid to serve shareholders"
      description="A research platform in development that scores how well corporate management incentives align with the interests of long-term shareholders — built on primary filings, published in the open."
    >
      {/* Status banner */}
      <div className="flex flex-wrap items-center gap-3 rounded-sm border border-primary/40 bg-primary/5 px-5 py-4">
        <span className="flex size-2 items-center justify-center">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
        </span>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
          In development — the framework below is being built and tested now
        </p>
      </div>

      {/* Purpose */}
      <section className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            The Purpose
          </p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-bold leading-tight text-foreground">
            One question, asked consistently, across every company
          </h2>
          <div className="mt-5 space-y-4 text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
            <p>
              Executive compensation is the quietest and most powerful force in
              corporate behavior. It decides whether a management team invests
              for the next decade or manages the next quarter — whether it
              builds value or simply reprices it.
            </p>
            <p>
              The Incentives Index exists to answer a single question with
              discipline:{" "}
              <span className="font-semibold text-foreground">
                is this management team paid to do what is good for long-term
                shareholders?
              </span>{" "}
              Not what the company says. What its incentive structure actually
              rewards.
            </p>
          </div>
        </div>

        <div className="rounded-sm border border-border/60 bg-card p-7">
          <Compass className="size-6 text-primary" />
          <p className="mt-4 font-heading text-lg font-bold text-foreground">
            Why it matters
          </p>
          <p className="mt-3 text-pretty font-serif leading-relaxed text-muted-foreground">
            Two companies in the same industry can look identical on the income
            statement and behave completely differently — because they pay their
            leaders to chase different things. Make that structure visible and
            much of the &quot;mystery&quot; of corporate decisions disappears.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="mt-16">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          The Methodology
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-bold leading-tight text-foreground">
          How each alignment score is built
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {METHOD_STEPS.map((step, i) => (
            <article
              key={step.title}
              className="flex flex-col rounded-sm border border-border/60 bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <step.icon className="size-5 text-primary" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-balance font-heading text-lg font-bold leading-snug text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty font-serif leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Principles / long-term vision */}
      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            The Long-Term Vision
          </p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-bold leading-tight text-foreground">
            A permanent, growing reference — not a hot take
          </h2>
        </div>
        <div className="space-y-5 text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
          <p>
            The goal is a durable, expanding library of alignment grades that
            readers can consult the way they would a reference work: company by
            company, sector by sector, updated as filings change rather than as
            headlines do.
          </p>
          <p>
            Over time the Index is intended to pair directly with the essays and
            podcast — every score linked to the reasoning that produced it, so a
            grade is never a number to take on faith but a conclusion you can
            follow.
          </p>
          <ul className="space-y-3 border-t border-border/50 pt-6">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex gap-3">
                <ArrowRight className="mt-1.5 size-4 shrink-0 text-primary" />
                <span className="text-base leading-relaxed text-foreground/90">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-sm border border-border/60 bg-secondary/40 p-8 text-center sm:p-12">
        <h2 className="mx-auto max-w-2xl text-balance font-heading text-2xl font-bold leading-tight text-foreground">
          Be here when the first scores are published
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty font-serif leading-relaxed text-muted-foreground">
          The Incentives Index is being built in the open. Subscribe to be
          notified when the methodology and first company grades go live, or
          start with the essays that lay the groundwork.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Notify Me <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/essays"
            className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
          >
            Read the Essays
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
