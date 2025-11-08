import { stackServerApp } from '@stackframe/stack'

if (!process.env.NEXT_PUBLIC_STACK_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_STACK_PROJECT_ID is required')
}

if (!process.env.STACK_SECRET_SERVER_KEY) {
  throw new Error('STACK_SECRET_SERVER_KEY is required')
}

export const stackApp = stackServerApp({
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY,
})