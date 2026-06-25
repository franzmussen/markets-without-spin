import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { RESEARCH_NOTES } from "@/lib/content"

export const metadata: Metadata = {
  title: "Research Notes — Markets Without Spin",
  description: "Working notes and methodology toward longer pieces.",
}

export default function ResearchNotesPage() {
  return (
    <PageShell
      eyebrow="Research Notes"
      title="The reasoning, before it is polished"
      description="Open notebooks: data I am chasing, models I am stress-testing, and methodology I am still arguing with. Provisional by design."
    >
      <div className="divide-y divide-border/50 border-y border-border/50">
        {RESEARCH_NOTES.map((note, i) => (
          <article key={note.title} className="grid gap-3 py-8 md:grid-cols-[0.4fr_2fr] md:gap-10">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary">
              No. {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">{note.title}</h2>
              <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {note.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
