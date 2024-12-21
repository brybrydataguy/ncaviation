import { useId } from 'react'
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
  return (
    <FadeIn className="lg:order-last">
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Contact Us
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput 
            label="Message" 
            name="message"
            className="min-h-[100px]" 
          />
        </div>
        <Button type="submit" className="mt-10">
          Send Message
        </Button>
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
              href="mailto:bob@ncaviation.com"
              className="text-neutral-600 hover:text-neutral-950"
            >
              bob@ncaviation.com
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

export const metadata: Metadata = {
  title: 'Contact NC Aviation',
  description: 'Contact NC Aviation for expert aircraft sales and acquisitions.',
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
