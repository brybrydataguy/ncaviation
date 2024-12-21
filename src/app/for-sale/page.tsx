import React from 'react'
import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Aircraft For Sale - NC Aviation',
  description: 'View our current aircraft listings and sign up for notifications about new planes for sale.',
}

export default function ForSalePage() {
  return (
    <>
      <PageIntro eyebrow="Listings" title="For Sale">
        <p className="mt-6 text-xl text-neutral-600">Coming Soon</p>
        <p className="mt-4 text-lg text-neutral-600">
          Sign up to hear when we post planes for sale.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <form className="max-w-md">
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Type your email…"
              className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
            />
            <div className="absolute inset-y-1 right-1">
              <button
                type="submit"
                className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
              >
                <span className="sr-only">Submit</span>
                <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </Container>
    </>
  )
}
