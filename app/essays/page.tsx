import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { ESSAYS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Essays — Markets Without Spin",
  description: "Long-form essays on incentives in markets, institutions, and public life.",
}

export default function EssaysPage() {
  return (
    <PageShell
      eyebrow="Essays"
      title="Arguments worth the reading time"
      description="Considered pieces that follow a single thread of incentive to its often uncomfortable conclusion. Read slowly; that is the point."
    >
      <div className="grid gap-px overflow-hidden rounded-sm border border-border/60 bg-border/40 sm:grid-cols-2">
        {ESSAYS.map((essay) => (
          <article key={essay.title} className="flex flex-col bg-card p-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
              {essay.category}
            </p>
            <h2 className="mt-3 text-balance font-heading text-2xl font-bold leading-tight text-foreground">
              {essay.title}
            </h2>
            <p className="mt-4 flex-1 text-pretty font-serif leading-relaxed text-muted-foreground">
              {essay.dek}
            </p>
            <div className="mt-6 flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
              <span>{essay.date}</span>
              <span className="text-primary">{essay.readingTime}</span>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
