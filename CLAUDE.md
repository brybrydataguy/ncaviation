# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
```bash
npm run dev       # Start Next.js development server on http://localhost:3000
npm run build     # Build production-ready application
npm start         # Start production server
npm run lint      # Run ESLint for code quality checks
```

**Database:**
```bash
npm run db:generate  # Generate Drizzle migrations from schema
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio for database management
```

## Architecture

This is a Next.js 15 application for NC Aviation, an aircraft sales platform built with:
- **Frontend:** Next.js App Router, React 19, TypeScript, Tailwind CSS
- **Database:** Neon PostgreSQL with Drizzle ORM for aircraft listings
- **Storage:** Vercel Blob Storage for aircraft images
- **Authentication:** Stack Auth for admin access
- **Email:** Resend for contact form submissions

### Key Architectural Patterns

1. **App Router Structure:** Uses Next.js 15 App Router with file-based routing in `src/app/`
   - Public pages: `/`, `/for-sale`, `/recently-sold`, `/about`, `/contact`
   - Admin section: `/admin` (protected by Stack Auth)
   - API routes: `/api/planes`, `/api/contact`
   - Auth handler: `/handler/[...stack]` (Stack Auth)

2. **Data Layer:**
   - Aircraft data managed through Drizzle ORM with Neon PostgreSQL via `src/lib/planes.ts`
   - Database schema defined in `src/db/schema.ts`
   - Image uploads handled by Vercel Blob Storage via `src/lib/blob-storage.ts`
   - All database operations server-side only (API routes)

3. **Type System:**
   - Core type `Aircraft` defined in `src/types/plane.ts`
   - Path alias `@/` configured for `./src/` imports

4. **Client/Server Separation:**
   - Pages use "use client" directive for client components
   - API routes handle all database operations server-side
   - Database and storage credentials use environment variables (never exposed to client)

## Environment Variables

Required in `.env.local`:
- `DATABASE_URL` - Neon database connection string (pooled)
- `DATABASE_URL_UNPOOLED` - Non-pooling connection for migrations
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob Storage token
- `NEXT_PUBLIC_STACK_PROJECT_ID` - Stack Auth project ID
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` - Stack Auth client key
- `STACK_SECRET_SERVER_KEY` - Stack Auth server key
- `RESEND_API_KEY` - Resend API key for email service
- `CONTACT_FORM_EMAIL` - Email address to receive contact form submissions

## Important Context

- The codebase uses Neon PostgreSQL with Drizzle ORM for data persistence
- Aircraft images are stored in Vercel Blob Storage with public URLs
- Authentication is handled by Stack Auth (no longer tied to Google accounts)
- The admin interface at `/admin` allows CRUD operations on aircraft listings
- Aircraft have three statuses: 'sale', 'pending', 'sold'
- The frontend displays aircraft galleries with modal image viewers
- Database tables: `planes` (main aircraft data) and `plane_images` (additional images)
- No test framework is currently configured