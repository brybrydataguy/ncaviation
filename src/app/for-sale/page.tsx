'use client'

import React, { useState } from 'react'
import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { Button } from '@/components/Button'

export default function ForSalePage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  return (
    <>
      <PageIntro eyebrow="Listings" title="For Sale">
        <p className="mt-6 text-xl text-neutral-600">Coming Soon</p>
        <p className="mt-4 text-lg text-neutral-600">
          Sign up to hear when we post planes for sale.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <div className="max-w-md">
          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const email = formData.get('email')

            try {
              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: 'Aircraft For Sale Inquiry',
                  email,
                  message: 'I am interested in receiving updates about aircraft for sale.',
                }),
              })

              if (!response.ok) {
                throw new Error('Failed to submit')
              }

              setStatus('success')
              e.currentTarget.reset()
            } catch (error) {
              console.error('Error submitting form:', error)
              setStatus('error')
            }
          }}>
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Type your email…"
                className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
              />
              <div className="absolute inset-y-1 right-1">
                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
                >
                  <span className="sr-only">
                    {status === 'submitting' ? 'Submitting...' : 'Submit'}
                  </span>
                  <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            {status === 'success' && (
              <p className="mt-4 text-sm text-green-600">
                Thank you! You will receive updates about new aircraft listings.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </Container>
    </>
  )
}
