'use client'

import React from 'react'
import { StackProvider } from '@stackframe/stack'

export function StackAuthProvider({ children }: { children: React.ReactNode }) {
  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID
  const publishableClientKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY

  if (!projectId) {
    console.error('NEXT_PUBLIC_STACK_PROJECT_ID is not set')
    // Return children without provider if not configured
    return <>{children}</>
  }

  return (
    <StackProvider
      app={{
        projectId: projectId,
        publishableClientKey: publishableClientKey,
      }}
    >
      {children}
    </StackProvider>
  )
}