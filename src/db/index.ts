import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('POSTGRES_URL or DATABASE_URL environment variable is required')
}

// Create the connection
const sql = neon(databaseUrl)

// Create drizzle instance
export const db = drizzle(sql, { schema })

// Export schema for convenience
export * from './schema'