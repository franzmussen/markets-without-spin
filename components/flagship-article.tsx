import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
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
import type {
  FlagshipBlock,
  FlagshipEssay,
  FlagshipSection,
} from "@/lib/flagship-essays"

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

function BodyBlock({ block }: { block: FlagshipBlock }) {
  if (block.type === "quote") {
    return <PullQuote text={block.text} cite={block.cite} />
  }
  return (
    <p className="text-pretty font-serif text-lg leading-relaxed text-foreground/85">
      {block.text}
    </p>
  )
}

function ArticleSection({
  section,
  isFirst,
}: {
  section: FlagshipSection
  isFirst: boolean
}) {
  return (
    <section
      className={`border-t border-border/40 pt-10 ${isFirst ? "mt-12" : "mt-14"}`}
    >
      <h2 className="text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-foreground">
        {section.heading}
      </h2>
      <div className="mt-6 flex flex-col gap-6">
        {section.blocks.map((block, j) => (
          <BodyBlock key={j} block={block} />
        ))}
      </div>
    </section>
  )
}

/**
 * The site's flagship long-form essay layout. A single, reusable renderer
 * driven entirely by a FlagshipEssay content object, shared by the Pilot and
 * every numbered episode essay so they stay visually identical.
 */
export function FlagshipArticle({
  content,
  episode,
}: {
  content: FlagshipEssay
  episode: PodcastEpisode
}) {
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
        Podcast Archive
      </Link>

      {/* Meta / byline row */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">{content.metaLabel}</span>
        <span aria-hidden className="text-border">
          /
        </span>
        <span>{content.author}</span>
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
          {content.editorNote}
        </p>
      </aside>

      {/* Body */}
      {content.sections.map((section, i) => (
        <ArticleSection
          key={section.heading}
          section={section}
          isFirst={i === 0}
        />
      ))}

      {/* Key Takeaways — visually distinct box */}
      <section className="mt-14">
        <div className="rounded-sm border border-primary/30 bg-card p-8 sm:p-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <ListChecks className="size-3.5" /> Key Takeaways
          </p>
          <ol className="mt-6 flex flex-col gap-5">
            {content.keyTakeaways.map((point, i) => (
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

      {/* Closing sections (e.g. Final Thoughts), rendered after takeaways */}
      {content.closingSections?.map((section) => (
        <ArticleSection key={section.heading} section={section} isFirst={false} />
      ))}

      {/* Further Reading — plain reference list */}
      {content.furtherReading && content.furtherReading.length > 0 && (
        <section className="mt-14 border-t border-border/40 pt-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <BookMarked className="size-3.5" /> Further Reading
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {content.furtherReading.map((ref, i) => (
              <li
                key={i}
                className="text-pretty font-serif text-lg leading-relaxed text-foreground/85"
              >
                {ref}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Reading — linked cards */}
      {content.relatedReading && content.relatedReading.length > 0 && (
        <section className="mt-14 border-t border-border/40 pt-10">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            <BookMarked className="size-3.5" /> Related Reading
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50 sm:grid-cols-2">
            {content.relatedReading.map((item) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">
                      {item.label}
                    </span>
                    {item.href && (
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-3 text-pretty font-serif leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </>
              )
              return item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col bg-card p-6 transition-colors hover:bg-card/60"
                >
                  {inner}
                </Link>
              ) : (
                <div key={item.label} className="flex flex-col bg-card p-6">
                  {inner}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Next Episode teaser */}
      {content.nextEpisode && (
        <section className="mt-14 border-t border-border/40 pt-10">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            Next Episode
          </p>
          {(() => {
            const next = content.nextEpisode!
            const inner = (
              <>
                <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="text-primary">{next.label}</span>
                  {next.note && (
                    <>
                      <span aria-hidden className="text-border">
                        /
                      </span>
                      <span>{next.note}</span>
                    </>
                  )}
                </div>
                {next.description && (
                  <h3 className="mt-3 text-balance font-heading text-xl font-bold leading-snug text-foreground">
                    {next.description}
                  </h3>
                )}
              </>
            )
            return next.href ? (
              <Link
                href={next.href}
                className="group mt-6 flex flex-col rounded-sm border border-border/50 bg-card p-6 transition-colors hover:border-primary/50"
              >
                {inner}
              </Link>
            ) : (
              <div className="mt-6 flex flex-col rounded-sm border border-dashed border-border/60 bg-card/50 p-6">
                {inner}
              </div>
            )
          })()}
        </section>
      )}

      {/* Listen to the Podcast */}
      <section className="mt-16 border-t border-border/40 pt-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Listen to the Podcast
        </p>
        <h2 className="mt-3 text-balance font-heading text-2xl font-bold tracking-tight text-foreground">
          {content.listen.title}
        </h2>
        <p className="mt-4 max-w-xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
          {content.listen.description}
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
