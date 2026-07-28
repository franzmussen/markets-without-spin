import { isAdminAuthed, listSubscribers } from "@/app/actions/admin"

/** Escapes a value for CSV (RFC 4180): wrap in quotes, double any inner quotes. */
function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

export async function GET() {
  if (!(await isAdminAuthed())) {
    return new Response("Unauthorized", { status: 401 })
  }

  const rows = await listSubscribers()
  const header = ["id", "email", "source", "created_at"].join(",")
  const body = rows
    .map((r) =>
      [
        r.id,
        csvCell(r.email),
        csvCell(r.source),
        csvCell(r.createdAt.toISOString()),
      ].join(","),
    )
    .join("\n")

  const csv = `${header}\n${body}\n`
  const date = new Date().toISOString().slice(0, 10)

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${date}.csv"`,
    },
  })
}
