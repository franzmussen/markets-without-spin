import Link from "next/link"
import { NAV, SITE } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-heading text-xl font-bold text-foreground">{SITE.name}</p>
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-primary">
              {SITE.tagline}
            </p>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              {SITE.intro} {SITE.thesis}
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
              Read &amp; Listen
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV.slice(1, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
              More
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV.slice(6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/50 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            Written &amp; produced by Franz
          </p>
        </div>
      </div>
    </footer>
  )
}
