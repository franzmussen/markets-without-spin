"use client"

import { useActionState } from "react"
import { Loader2, Lock } from "lucide-react"
import { adminLogin, type AdminLoginResult } from "@/app/actions/admin"

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState<
    AdminLoginResult | null,
    FormData
  >(adminLogin, null)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="password"
          className="mb-2 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground"
        >
          <Lock className="size-3.5" /> Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          disabled={pending}
          className="w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary disabled:opacity-60"
        />
      </div>
      {state && !state.ok && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        {pending ? "Checking" : "Enter"}
      </button>
    </form>
  )
}
