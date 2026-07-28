"use server"

import { db } from "@/lib/db"
import { subscribers } from "@/lib/db/schema"
import { sql } from "drizzle-orm"

export type SubscribeResult = {
  ok: boolean
  message: string
  alreadySubscribed?: boolean
}

// Basic, permissive email validation — good enough to reject obvious garbage
// without turning away valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribe(
  _prev: SubscribeResult | null,
  formData: FormData,
): Promise<SubscribeResult> {
  const raw = formData.get("email")
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : ""

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  try {
    const inserted = await db
      .insert(subscribers)
      .values({ email, source: "website" })
      .onConflictDoNothing({ target: subscribers.email })
      .returning({ id: subscribers.id })

    if (inserted.length === 0) {
      // Email already exists — treat as success so we don't leak list membership
      // in a confusing way, but let the UI acknowledge it.
      return {
        ok: true,
        alreadySubscribed: true,
        message: "You're already on the list — thank you.",
      }
    }

    return {
      ok: true,
      message: "You're on the list.",
    }
  } catch (error) {
    console.log("[v0] subscribe error:", error)
    return {
      ok: false,
      message: "Something went wrong. Please try again in a moment.",
    }
  }
}

/** Total confirmed subscribers — used for light social proof if desired. */
export async function getSubscriberCount(): Promise<number> {
  try {
    const [row] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(subscribers)
    return row?.count ?? 0
  } catch {
    return 0
  }
}
