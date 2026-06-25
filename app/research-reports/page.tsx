import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { RESEARCH_REPORTS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Research Reports — Markets Without Spin",
  description:
    "Institutional research tracking insider incentives, buybacks, and the forces reshaping modern markets.",
}

export default function ResearchReportsPage() {
  return (
    <PageShell
      eyebrow="Research Reports"
      title="Follow the incentives. Follow the money. Follow the behavior."
      description="Ongoing institutional research series examining the incentives that move insiders, corporations, and markets — published as recurring, data-driven reports."
    >
      <div className="grid gap-px overflow-hidden rounded-sm border border-border/60 bg-border/60 sm:grid-cols-2">
        {RESEARCH_REPORTS.map((report, i) => (
          <article key={report.title} className="flex flex-col bg-card p-8 lg:p-10">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
                No. {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-3 text-balance font-heading text-2xl font-bold leading-tight text-foreground lg:text-3xl">
              {report.title}
            </h2>
            <p className="mt-3 text-pretty font-serif text-lg leading-relaxed text-foreground/85">
              {report.lede}
            </p>

            {report.listLabel && (
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {report.listLabel}
              </p>
            )}

            <ul className={report.listLabel ? "mt-3 space-y-2" : "mt-6 space-y-2"}>
              {report.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 font-serif leading-relaxed text-foreground/85"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            {report.closing && (
              <p className="mt-5 text-pretty font-serif italic leading-relaxed text-muted-foreground">
                {report.closing}
              </p>
            )}

            <div className="mt-auto pt-8">
              <span className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                {report.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
