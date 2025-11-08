"use client"

import React, { useEffect } from 'react'
import { useStackApp } from '@stackframe/stack'
import { useRouter } from "next/navigation"
import { Container } from '../../../components/Container'

export default function LogoutPage() {
  const router = useRouter()
  const stackApp = useStackApp()

  useEffect(() => {
    stackApp.signOut().then(() => {
      router.push("/")
    })
  }, [router, stackApp])

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-lg text-neutral-600">Logging out...</p>
      </div>
    </Container>
  )
}