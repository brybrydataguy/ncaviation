"use client"

import React, { useEffect } from 'react'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Container } from '../../../components/Container'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push("/")
    })
  }, [router])

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-lg text-neutral-600">Logging out...</p>
      </div>
    </Container>
  )
}
