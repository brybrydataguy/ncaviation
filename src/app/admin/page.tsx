"use client"

import React from 'react'
import { useSession } from "next-auth/react"
import { Container } from "@/components/Container"
import { PageIntro } from "@/components/PageIntro"

export default function AdminPage(): React.ReactElement {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="flex justify-center">
          <p className="text-neutral-300">Loading...</p>
        </div>
      </Container>
    )
  }

  if (!session) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="flex justify-center">
          <p className="text-red-500">Access Denied. Please log in.</p>
        </div>
      </Container>
    )
  }

  return (
    <>
      <PageIntro eyebrow="Admin Dashboard" title="Welcome to the Admin Panel">
        <p>
          This is a placeholder for the admin dashboard. More functionality will be added in the future.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          <div className="bg-neutral-900 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-300">Total Listings</h3>
                <p className="text-3xl font-bold text-neutral-100 mt-2">0</p>
              </div>
              <div className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-300">Active Inquiries</h3>
                <p className="text-3xl font-bold text-neutral-100 mt-2">0</p>
              </div>
              <div className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-300">Recent Sales</h3>
                <p className="text-3xl font-bold text-neutral-100 mt-2">0</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
