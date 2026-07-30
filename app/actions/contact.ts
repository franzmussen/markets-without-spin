"use server"

import { createHash } from "crypto"
import { headers } from "next/headers"
import { and, eq, gte, sql } from "drizzle-orm"
import { Resend } from "resend"
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

/** Escapes user-supplied text for safe inclusion in the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Sends the message to the site owner via the Resend SDK.
 * Throws if Resend is not configured or the send fails, so the caller can log
 * it. Logs are prefixed with [v0] so delivery can be traced in the runtime logs.
 */
async function sendEmail(
  name: string,
  email: string,
  message: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL
  if (!apiKey || !to) {
    console.log(
      "[v0] contact: skipping email — RESEND_API_KEY set:",
      Boolean(apiKey),
      "CONTACT_EMAIL set:",
      Boolean(to),
    )
    throw new Error("email-not-configured")
  }

  // Must be an address on a domain verified in Resend. Falls back to Resend's
  // shared onboarding sender, which can only deliver to the account owner.
  const from =
    process.env.CONTACT_FROM || "Markets Without Spin <onboarding@resend.dev>"

  const resend = new Resend(apiKey)
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")

  console.log("[v0] contact: calling Resend SDK, to:", to, "from:", from)

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `New contact message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.5">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
      <p>${safeMessage}</p>
    </div>`,
  })

  if (error) {
    console.log("[v0] contact: Resend SDK error:", JSON.stringify(error))
    throw new Error("email-send-failed")
  }

  console.log("[v0] contact: Resend accepted message, id:", data?.id)
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

    // 5. Best-effort email notification to the site owner. The message is
    // already stored in Neon, so a delivery failure never loses the message —
    // we log it and still acknowledge the visitor rather than asking them to
    // resend (which would duplicate the stored record).
    try {
      await sendEmail(name, email, message)
    } catch (emailError) {
      console.log(
        "[v0] contact: email notification failed (message still saved):",
        emailError instanceof Error ? emailError.message : emailError,
      )
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
