"use client"

import { type Metadata } from 'next'
import { StackAuthProvider } from '@/lib/stack-auth-client'
import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <StackAuthProvider>
          <RootLayout>{children}</RootLayout>
        </StackAuthProvider>
      </body>
    </html>
  )
}
