import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { OBSERVATIONS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Observations — Markets Without Spin",
  description: "Short, sharp notes on the incentives hiding in plain sight.",
}

export default function ObservationsPage() {
  return (
    <PageShell
      eyebrow="Observations"
      title="Short notes, sharp edges"
      description="Single ideas, stated plainly. The kind of thought that explains a headline in one sentence once you see the incentive behind it."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {OBSERVATIONS.map((o) => (
          <blockquote key={o.title} className="flex flex-col rounded-sm border border-border/60 bg-card p-7">
            <span className="font-heading text-5xl leading-none text-primary/70" aria-hidden>
              &ldquo;
            </span>
            <p className="mt-1 text-balance font-heading text-xl font-bold leading-snug text-foreground">
              {o.title}
            </p>
            <div className="mt-4 space-y-1.5 font-serif text-lg leading-relaxed text-muted-foreground">
              {o.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <footer className="mt-auto pt-6 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary">
              {o.tag}
            </footer>
          </blockquote>
        ))}
      </div>
    </PageShell>
  )
}
