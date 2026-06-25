"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex items-center gap-4 rounded-sm border border-primary/50 bg-card p-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-5" />
        </div>
        <div>
          <p className="font-heading text-lg font-bold text-foreground">You&apos;re on the list</p>
          <p className="text-sm text-muted-foreground">
            Watch your inbox for the next dispatch from {email}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email) setSubmitted(true)
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-sm border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
      <button
        type="submit"
        className="rounded-sm bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  )
}
