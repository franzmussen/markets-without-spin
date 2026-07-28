import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

/**
 * Newsletter subscribers. This is a public signup list (not per-user data),
 * so there is no userId scoping — every row is an email captured from the
 * website's subscribe form.
 */
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("website"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type Subscriber = typeof subscribers.$inferSelect
