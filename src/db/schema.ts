import { pgTable, uuid, varchar, integer, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// Create enum for plane status
export const planeStatusEnum = pgEnum('plane_status', ['sale', 'pending', 'sold'])

// Planes table
export const planes = pgTable('planes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  status: planeStatusEnum('status').notNull().default('sale'),
  mainImageUrl: text('main_image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Plane images table for additional images
export const planeImages = pgTable('plane_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  planeId: uuid('plane_id')
    .notNull()
    .references(() => planes.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),
  position: integer('position').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Type exports
export type Plane = typeof planes.$inferSelect
export type NewPlane = typeof planes.$inferInsert
export type PlaneImage = typeof planeImages.$inferSelect
export type NewPlaneImage = typeof planeImages.$inferInsert

// Validation schemas
export const insertPlaneSchema = createInsertSchema(planes)
export const selectPlaneSchema = createSelectSchema(planes)
export const insertPlaneImageSchema = createInsertSchema(planeImages)
export const selectPlaneImageSchema = createSelectSchema(planeImages)