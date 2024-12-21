import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactSection } from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'NC Aviation - Private Jet Sales & Consulting',
  description: 'NC Aviation provides private jet sales, acquisitions, consulting, aircraft management and charter services.',
}

export default function Home() {
  return (
    <>
      <PageIntro eyebrow="Welcome" title="Your Journey Begins">
        <p className="mt-6 text-xl text-neutral-600">
          NC Aviation is your choice for private jets sales, acquisitions, consulting, aircraft management and charter.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 md:mt-40">
        <FadeIn>
          <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl">
            Explore the World
          </h2>
          <p className="mt-6 text-lg text-neutral-600">
            Amazing world of aviation is waiting for you to explore. NC Aviation is your perfect guide.
          </p>
        </FadeIn>
      </Container>

      <ContactSection />
    </>
  )
}
