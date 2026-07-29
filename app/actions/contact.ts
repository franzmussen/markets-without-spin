"use server"

import { createHash } from "crypto"
import { headers } from "next/headers"
import { and, eq, gte, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { contactMessages } from "@/lib/db/schema"

export type ContactResult = { ok: boolean; message: string }

// Permissive email check — reject obvious garbage without turning away valid
// addresses. Matches the pattern used by the subscribe action.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Rate limit: at most this many submissions per IP within the window.
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MINUTES = 10

/** Best-effort hash of the requester's IP, used only for rate limiting. */
async function getIpHash(): Promise<string | null> {
  const h = await headers()
  const forwarded = h.get("x-forwarded-for")
  const ip =
    (forwarded ? forwarded.split(",")[0]?.trim() : "") ||
    h.get("x-real-ip") ||
    ""
  if (!ip) return null
  return createHash("sha256").update(`mws-contact:${ip}`).digest("hex")
}

/** Sends the message to the site owner via Resend, if configured. */
async function sendEmail(
  name: string,
  email: string,
  message: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL
  if (!apiKey || !to) {
    console.log(
      "[v0] contact: email not sent (RESEND_API_KEY or CONTACT_EMAIL not set); message saved to database",
    )
    return
  }

  const from = process.env.CONTACT_FROM || "Markets Without Spin <onboarding@resend.dev>"

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    console.log("[v0] contact: Resend send failed:", res.status, detail)
    throw new Error("email-send-failed")
  }
}

export async function sendContactMessage(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  // 1. Honeypot — a hidden field real users never fill. If populated, it's a
  // bot. Silently succeed so the bot gets no signal, and record nothing.
  const honeypot = formData.get("company")
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { ok: true, message: "Thanks — your message has been sent." }
  }

  // 2. Server-side validation.
  const name = (formData.get("name") as string | null)?.trim() ?? ""
  const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
  const message = (formData.get("message") as string | null)?.trim() ?? ""

  if (name.length < 2 || name.length > 100) {
    return { ok: false, message: "Please enter your name." }
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, message: "Please enter a valid email address." }
  }
  if (message.length < 10) {
    return { ok: false, message: "Please include a message of at least 10 characters." }
  }
  if (message.length > 5000) {
    return { ok: false, message: "Your message is too long (5000 characters max)." }
  }

  try {
    // 3. Rate limiting — count recent submissions from this IP.
    const ipHash = await getIpHash()
    if (ipHash) {
      const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000)
      const [row] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(contactMessages)
        .where(
          and(
            eq(contactMessages.ipHash, ipHash),
            gte(contactMessages.createdAt, since),
          ),
        )
      if ((row?.count ?? 0) >= RATE_LIMIT_MAX) {
        return {
          ok: false,
          message:
            "You've sent several messages recently. Please wait a little while before sending another.",
        }
      }
    }

    // 4. Persist the message (durable record, independent of email delivery).
    await db.insert(contactMessages).values({ name, email, message, ipHash })

    // 5. Best-effort email notification to the site owner.
    try {
      await sendEmail(name, email, message)
    } catch {
      // Email failed but the message is safely stored; still acknowledge to the
      // visitor so they aren't asked to resend (which would duplicate the record).
    }

    return {
      ok: true,
      message: "Thanks — your message has been sent. I'll be in touch.",
    }
  } catch (error) {
    console.log("[v0] contact error:", error)
    return {
      ok: false,
      message: "Something went wrong. Please try again in a moment.",
    }
  }
}
