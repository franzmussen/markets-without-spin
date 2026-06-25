"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV, SITE } from "@/lib/content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link href="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {SITE.name}
          </span>
          <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-primary">
            {SITE.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.slice(1).map((item) => {
            const active = pathname === item.href
            const isSubscribe = item.href === "/subscribe"
            if (isSubscribe) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-sm border border-primary px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-primary",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-background px-5 pb-6 pt-2 lg:hidden">
          {NAV.slice(1).map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block border-b border-border/40 py-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground",
                  active && "text-primary",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
