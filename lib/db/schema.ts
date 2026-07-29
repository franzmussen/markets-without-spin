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

/**
 * Contact form submissions. Persisted as the durable record of every message
 * (email delivery is best-effort on top of this). `ipHash` is a one-way hash
 * of the sender's IP, used only for spam rate limiting — never the raw IP.
 */
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  ipHash: text("ip_hash"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type ContactMessage = typeof contactMessages.$inferSelect
