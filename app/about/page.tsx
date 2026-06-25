import type { Metadata } from "next"
import Image from "next/image"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "About Franz — Markets Without Spin",
  description: "The person behind Markets Without Spin and the idea that drives it.",
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About Franz"
      title="An exploration of why things happen"
      description="Markets Without Spin is the culmination of a lifetime spent studying the incentives that drive markets, governments, and institutions."
    >
      <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
        <div className="max-w-2xl space-y-5 font-serif text-xl leading-relaxed text-foreground/85">
          <p className="font-heading text-2xl font-semibold text-foreground">
            I began investing in 1969.
          </p>
          <p>
            Over the past four decades, I have worked professionally in the investment field,
            beginning my career in 1985.
          </p>
          <p>
            I passed the CPA examination, earned a Master&apos;s Degree in Geography from the
            University of Utah, and co-founded an investment advisory firm that I helped build over
            many years. Throughout my career, I have spent a lifetime studying the incentives that
            drive markets, governments, and institutions.
          </p>
          <p>Markets Without Spin is the culmination of those experiences.</p>
          <p className="font-heading text-2xl font-semibold text-primary">
            It is an exploration of why things happen&mdash;not simply what happened.
          </p>
          <p className="pt-2 font-mono text-sm uppercase tracking-[0.18em] text-primary">
            — Franz Amussen
          </p>
        </div>
        <aside>
          <figure className="overflow-hidden rounded-sm border border-border/60 bg-card">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/franz-portrait.jpg"
                alt="Portrait of Franz Amussen, founder of Markets Without Spin"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-[center_18%] grayscale"
                priority
              />
            </div>
            <figcaption className="border-t border-border/60 px-5 py-4">
              <p className="font-heading text-base font-bold text-foreground">Franz Amussen</p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                Investor since 1969 · Founder, Markets Without Spin
              </p>
            </figcaption>
          </figure>
        </aside>
      </div>
    </PageShell>
  )
}
