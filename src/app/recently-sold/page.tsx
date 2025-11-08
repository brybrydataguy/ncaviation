import React from 'react'
import Image from 'next/image'
import { type Metadata } from 'next'
import { headers } from 'next/headers'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import type { Aircraft } from '@/types/plane'

export const metadata: Metadata = {
  title: 'Recently Sold Aircraft - NC Aviation',
  description: 'View our recently sold aircraft inventory.',
}

async function getSoldPlanes(host: string): Promise<Aircraft[]> {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const response = await fetch(`${protocol}://${host}/api/planes?status=sold`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    console.error('Failed to fetch sold planes:', await response.text())
    return []
  }
  return response.json()
}

export default async function RecentlySoldPage() {
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const soldPlanes = await getSoldPlanes(host)

  return (
    <>
      <PageIntro eyebrow="Previous Sales" title="Recently Sold">
        <p className="mt-6 text-xl text-neutral-600">
          Browse our recently sold aircraft inventory.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {soldPlanes.map((plane) => (
            <div key={plane.name} className="group relative overflow-hidden rounded-3xl bg-neutral-100">
              <div className="aspect-h-9 aspect-w-16 relative h-[300px]">
                <Image
                  src={plane.mainImage}
                  alt={`${plane.name} Aircraft - NC Aviation`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  priority
                  quality={90}
                  loading="eager"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-medium text-neutral-950">
                  {plane.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">Status: {plane.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
