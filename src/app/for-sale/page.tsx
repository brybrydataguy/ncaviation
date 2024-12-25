'use client'

import React from 'react'
import Image from 'next/image'
import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from '@/components/ContactForm'
import { GalleryModal } from '@/components/GalleryModal'
import type { Aircraft } from '@/types/plane'

export default function ForSalePage() {
  const [availablePlanes, setAvailablePlanes] = React.useState<Aircraft[]>([])
  const [selectedPlane, setSelectedPlane] = React.useState<Aircraft | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadPlanes() {
      try {
        const [salePlanes, pendingPlanes] = await Promise.all([
          fetch('/api/planes?status=sale').then(res => res.ok ? res.json() : []),
          fetch('/api/planes?status=pending').then(res => res.ok ? res.json() : [])
        ])
        setAvailablePlanes([...salePlanes, ...pendingPlanes])
      } catch (error) {
        console.error('Error loading planes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadPlanes()
  }, [])

  return (
    <>
      <PageIntro eyebrow="Listings" title="For Sale">
        <p className="mt-6 text-xl text-neutral-600">
          Browse our current aircraft inventory. Contact us for detailed information about any aircraft.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-24">
          {availablePlanes.map((plane) => (
            <div key={plane.name} className="group relative overflow-hidden rounded-3xl bg-neutral-100">
              <div 
                className="aspect-h-9 aspect-w-16 relative h-[300px] cursor-pointer"
                onClick={() => setSelectedPlane(plane)}
              >
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
                <p className="mt-2 text-sm text-neutral-600">
                  Status: {plane.status === 'sale' ? 'For Sale' : 'Sale Pending'}
                </p>
                <p className="mt-1 text-sm font-medium text-neutral-950">
                  ${plane.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {availablePlanes.length === 0 && (
            <p className="text-neutral-600 col-span-full text-center py-12">
              No aircraft currently available. Please check back soon or contact us for updates.
            </p>
          )}
        </div>

        <ContactForm />
      </Container>

      {selectedPlane && (
        <GalleryModal
          images={[selectedPlane.mainImage, ...selectedPlane.images]}
          onClose={() => setSelectedPlane(null)}
        />
      )}
    </>
  )
}
