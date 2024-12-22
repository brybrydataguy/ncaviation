'use client'

import React, { useId } from 'react'
import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

export default function ForSalePage() {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message') || 'I am interested in receiving updates about aircraft for sale.',
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
    }
  }

  return (
    <>
      <PageIntro eyebrow="Listings" title="For Sale">
        <p className="mt-6 text-xl text-neutral-600">
          Interested in our aircraft listings? Fill out the form below to receive updates about new aircraft for sale.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="mx-auto max-w-lg">
          <FadeIn>
            <form ref={formRef} onSubmit={handleSubmit}>
              <h2 className="font-display text-base font-semibold text-neutral-950">
                Request Information
              </h2>
              <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
                <TextInput label="Name" name="name" autoComplete="name" required />
                <TextInput
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
                <TextInput 
                  label="Message (Optional)" 
                  name="message"
                  className="min-h-[100px]"
                />
              </div>
              <Button 
                type="submit" 
                className="mt-10"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Request Information'}
              </Button>
              {status === 'success' && (
                <p className="mt-4 text-sm text-green-600">
                  Thank you! We'll keep you updated about new aircraft listings.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </Container>
    </>
  )
}
