"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createHash, timingSafeEqual } from "crypto"
import { db } from "@/lib/db"
import { subscribers, type Subscriber } from "@/lib/db/schema"
import { desc } from "drizzle-orm"

const COOKIE_NAME = "mws_admin"

/** Derives the cookie token from the admin password (never store the password itself). */
function tokenFor(password: string): string {
  return createHash("sha256")
    .update(`mws-admin:${password}`)
    .digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

/** True when the current request carries a valid admin session cookie. */
export async function isAdminAuthed(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const cookie = (await cookies()).get(COOKIE_NAME)?.value
  if (!cookie) return false
  return safeEqual(cookie, tokenFor(password))
}

export type AdminLoginResult = { ok: boolean; message: string }

export async function adminLogin(
  _prev: AdminLoginResult | null,
  formData: FormData,
): Promise<AdminLoginResult> {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    return {
      ok: false,
      message:
        "Admin password is not configured. Set the ADMIN_PASSWORD environment variable.",
    }
  }

  const entered =
    typeof formData.get("password") === "string"
      ? (formData.get("password") as string)
      : ""

  if (!entered || !safeEqual(entered, password)) {
    return { ok: false, message: "Incorrect password." }
  }

  ;(await cookies()).set(COOKIE_NAME, tokenFor(password), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  redirect("/admin/subscribers")
}

export async function adminLogout(): Promise<void> {
  ;(await cookies()).delete(COOKIE_NAME)
  redirect("/admin/subscribers")
}

/** Returns all subscribers, newest first. Throws if not authenticated. */
export async function listSubscribers(): Promise<Subscriber[]> {
  if (!(await isAdminAuthed())) throw new Error("Unauthorized")
  return db.select().from(subscribers).orderBy(desc(subscribers.createdAt))
}
