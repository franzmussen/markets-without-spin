import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { IDEAS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Ideas in Progress — Markets Without Spin",
  description: "Half-formed arguments and projects still on the workbench.",
}

export default function IdeasPage() {
  return (
    <PageShell
      eyebrow="Ideas in Progress"
      title="Thinking out loud, on purpose"
      description="The workshop floor. Some of these become essays, some become episodes, and some quietly fall apart. You are seeing them before I know which is which."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {IDEAS.map((idea) => (
          <article
            key={idea.title}
            className="rounded-sm border border-dashed border-border/70 bg-secondary/20 p-7"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-primary">
              In progress
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">{idea.title}</h2>
            <p className="mt-2 text-pretty text-lg leading-relaxed text-muted-foreground">{idea.note}</p>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
