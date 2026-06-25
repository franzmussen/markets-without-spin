import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/section-heading"

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pt-14 lg:px-8">
        <PageHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="py-12">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}
