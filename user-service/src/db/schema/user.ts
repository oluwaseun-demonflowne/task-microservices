import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const User = pgTable("UserSchema", {
  id: uuid().defaultRandom().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
});

export const SelectUser = typeof User.$inferSelect;
export const InsertUser = typeof User.$inferInsert;
