import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is required')
}

// Create the connection
const sql = neon(process.env.POSTGRES_URL)

// Create drizzle instance
export const db = drizzle(sql, { schema })

// Export schema for convenience
export * from './schema'