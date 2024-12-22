"use client"

import React from 'react'
import { signIn } from "next-auth/react"
import { Button } from '../../../components/Button'
import { Container } from '../../../components/Container'

export default function LoginPage() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="font-display text-2xl font-semibold text-neutral-950 mb-8">
          Sign in to NC Aviation
        </h1>
        <Button onClick={() => signIn('google', { callbackUrl: '/admin' })} invert={false}>
          Sign in with Google
        </Button>
      </div>
    </Container>
  )
}
