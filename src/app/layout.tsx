"use client"

import { Suspense } from 'react'
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Suspense fallback={
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-neutral-400">Loading...</div>
              </div>
            }>
              <RootLayout>{children}</RootLayout>
            </Suspense>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  )
}
