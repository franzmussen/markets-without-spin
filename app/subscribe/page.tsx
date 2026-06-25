import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { SubscribeForm } from "@/components/subscribe-form"

export const metadata: Metadata = {
  title: "Subscribe — Markets Without Spin",
  description: "Get essays, observations, and new episodes delivered without spin.",
}

const includes = [
  {
    title: "Essays as they publish",
    body: "Each long-form piece, in full, the moment it goes live.",
  },
  {
    title: "Weekly observations",
    body: "The short, sharp notes — collected and sent so you never miss one.",
  },
  {
    title: "New episodes first",
    body: "An early note when a new conversation lands in the podcast feed.",
  },
]

export default function SubscribePage() {
  return (
    <PageShell
      eyebrow="Subscribe"
      title="Follow the incentives, every week"
      description="One email. No hype, no noise, no spin — just the forces beneath the headlines and the occasional idea still being built."
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="rounded-sm border border-primary/40 bg-card p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Join the readers</h2>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              Enter your email and you&apos;ll get everything below, delivered directly. Unsubscribe
              anytime — no friction, because that would be a bad incentive.
            </p>
            <div className="mt-6">
              <SubscribeForm />
            </div>
          </div>
        </div>
        <aside className="space-y-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
            What you&apos;ll get
          </p>
          {includes.map((item) => (
            <div key={item.title} className="border-l-2 border-primary/60 pl-4">
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </aside>
      </div>
    </PageShell>
  )
}
