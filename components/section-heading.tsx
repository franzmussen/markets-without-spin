import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "View all",
}: {
  eyebrow: string
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-border/60 pb-4">
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary sm:flex"
        >
          {linkLabel}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="border-b border-border/60 pb-10">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  )
}
