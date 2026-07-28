import type { Metadata } from "next"
import Link from "next/link"
import { Download, LogOut } from "lucide-react"
import {
  adminLogout,
  isAdminAuthed,
  listSubscribers,
} from "@/app/actions/admin"
import { AdminLoginForm } from "@/components/admin-login-form"

export const metadata: Metadata = {
  title: "Subscribers — Admin",
  robots: { index: false, follow: false },
}

// Always render fresh — this is an authenticated, data-backed view.
export const dynamic = "force-dynamic"

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default async function AdminSubscribersPage() {
  const authed = await isAdminAuthed()

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-20">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
          Restricted
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-foreground">
          Subscriber Admin
        </h1>
        <p className="mt-2 mb-8 text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
          Enter the admin password to view and export the subscriber list.
        </p>
        <AdminLoginForm />
      </main>
    )
  }

  const rows = await listSubscribers()

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            Admin
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Subscribers
          </h1>
          <p className="mt-1 font-serif text-lg text-muted-foreground">
            {rows.length} {rows.length === 1 ? "subscriber" : "subscribers"} on
            the list.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/subscribers/export"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
          >
            <Download className="size-4" /> Export CSV
          </Link>
          <form action={adminLogout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" /> Log out
            </button>
          </form>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 font-serif text-lg text-muted-foreground">
          No subscribers yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-sm border border-border/60">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border/60 bg-card">
                <th className="px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Email
                </th>
                <th className="px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Source
                </th>
                <th className="px-5 py-3 text-right font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-5 py-3 font-serif text-foreground">
                    {r.email}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {r.source}
                  </td>
                  <td className="px-5 py-3 text-right text-sm text-muted-foreground">
                    {formatDate(r.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
