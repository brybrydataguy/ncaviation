import React from 'react'
import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Recently Sold Aircraft - NC Aviation',
  description: 'View our recently sold aircraft including Citation X, Gulfstream G-200, and Citation Sovereign.',
}

export default function RecentlySoldPage() {
  const soldAircraft = [
    {
      title: '1997 Citation X',
      image: '/placeholder-citation-x.jpg',
      alt: '1997 Citation X Aircraft'
    },
    {
      title: '2008 Gulfstream G-200',
      image: '/placeholder-gulfstream-g200.jpg',
      alt: '2008 Gulfstream G-200 Aircraft'
    },
    {
      title: '2006 Citation Sovereign',
      image: '/placeholder-citation-sovereign.jpg',
      alt: '2006 Citation Sovereign Aircraft'
    }
  ]

  return (
    <>
      <PageIntro eyebrow="Previous Sales" title="Recently Sold">
        <p className="mt-6 text-xl text-neutral-600">
          Browse our recently sold aircraft inventory.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {soldAircraft.map((aircraft) => (
            <div key={aircraft.title} className="group relative overflow-hidden rounded-3xl bg-neutral-100">
              <div className="aspect-h-9 aspect-w-16 relative">
                <img
                  src={aircraft.image}
                  alt={aircraft.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-medium text-neutral-950">
                  {aircraft.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">Sold</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
