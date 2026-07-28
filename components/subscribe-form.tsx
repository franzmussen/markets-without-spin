"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { subscribe, type SubscribeResult } from "@/app/actions/subscribe"

export function SubscribeForm() {
  const [state, formAction, pending] = useActionState<
    SubscribeResult | null,
    FormData
  >(subscribe, null)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  // Capture the email that was successfully submitted for the confirmation copy.
  useEffect(() => {
    if (state?.ok) {
      const value = formRef.current?.elements.namedItem("email")
      if (value instanceof HTMLInputElement) setSubmittedEmail(value.value)
    }
  }, [state])

  if (state?.ok) {
    return (
      <div className="flex items-center gap-4 rounded-sm border border-primary/50 bg-card p-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-5" />
        </div>
        <div>
          <p className="font-heading text-lg font-bold text-foreground">
            {state.alreadySubscribed
              ? "You're already on the list"
              : "You're on the list"}
          </p>
          <p className="text-sm text-muted-foreground">
            {submittedEmail
              ? `We'll reach you at ${submittedEmail} when the next essay is published.`
              : "We'll reach you when the next essay is published."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={pending}
          className="flex-1 rounded-sm border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {pending && <Loader2 className="size-4 animate-spin" />}
          {pending ? "Joining" : "Subscribe"}
        </button>
      </div>
      {state && !state.ok && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}
    </form>
  )
}
