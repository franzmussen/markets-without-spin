import type { DescriptionBlock } from "@/lib/podcast"

/**
 * Renders an episode's parsed description blocks as a polished, readable
 * article: gold section labels, serif body copy, bulleted key topics, and
 * an inline tag row for mentioned companies.
 */
export function EpisodeArticle({ blocks }: { blocks: DescriptionBlock[] }) {
  if (blocks.length === 0) return null

  return (
    <div className="mt-10 max-w-2xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary first:mt-0"
              >
                {block.text}
              </h2>
            )
          case "subheading":
            return (
              <h3
                key={i}
                className="mt-8 text-balance font-heading text-xl font-bold leading-snug text-foreground"
              >
                {block.text}
              </h3>
            )
          case "paragraph":
            return (
              <p
                key={i}
                className="mt-4 text-pretty font-serif text-lg leading-relaxed text-muted-foreground"
              >
                {block.text}
              </p>
            )
          case "list":
            return (
              <ul key={i} className="mt-5 flex flex-col gap-3">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 font-serif text-lg leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case "tags":
            return (
              <ul key={i} className="mt-5 flex flex-wrap gap-2.5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="rounded-sm border border-primary/40 bg-card px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
