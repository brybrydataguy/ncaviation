'use client'

import React, { useId } from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

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

function ContactForm() {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    // Get form data before any async operations
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
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
      form.reset() // Reset the form after successful submission
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
    }
  }

  return (
    <FadeIn className="lg:order-last">
      <form ref={formRef} onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Contact Us
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
            label="Message" 
            name="message"
            className="min-h-[100px]"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="mt-10"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
        {status === 'success' && (
          <p className="mt-4 text-sm text-green-600">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-600">Failed to send message. Please try again.</p>
        )}
      </form>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Contact Information
      </h2>
      <dl className="mt-6 grid grid-cols-1 gap-8 text-sm">
        <div>
          <dt className="font-semibold text-neutral-950">Email</dt>
          <dd>
            <Link
              href="mailto:bryantravissmith@gmail.com"
              className="text-neutral-600 hover:text-neutral-950"
            >
              bryantravissmith@gmail.com
            </Link>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-neutral-950">Phone</dt>
          <dd className="text-neutral-600">
            +1 (949) 466-3667
          </dd>
        </div>
      </dl>
    </FadeIn>
  )
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact Us" title="Get in Touch">
        <p>Contact us for expert guidance in aircraft sales and acquisitions.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactDetails />
          <ContactForm />
        </div>
      </Container>
    </>
  )
}
