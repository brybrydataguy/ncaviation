import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

// Lazy initialization to avoid build-time errors
let dbInstance: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
      throw new Error('POSTGRES_URL or DATABASE_URL environment variable is required')
    }

    // Create the connection
    const sql = neon(databaseUrl)

    // Create drizzle instance
    dbInstance = drizzle(sql, { schema })
  }

  return dbInstance
}

// Export schema for convenience
export * from './schema'