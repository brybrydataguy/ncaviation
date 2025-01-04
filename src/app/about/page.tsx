import { type Metadata } from 'next'
import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'About NC Aviation',
  description: 'NC Aviation, Inc. - Led by Bob Kalhori, with over 32 years of aviation industry experience, providing expert aircraft sales and acquisition services.',
}

export default function About() {
  return (
    <>
      <PageIntro eyebrow="About NC Aviation" title="Expert Aircraft Sales & Acquisitions">
        <p>
          NC Aviation, Inc. specializes in aircraft sales and acquisitions, led by our founder and president Bob Kalhori.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Bob Kalhori is the founder and president of NC Aviation, Inc., bringing over 35 years of experience in the aviation industry. As an FAA Designated Check Airman and Examiner, Bob&apos;s expertise and dedication to aviation excellence have established NC Aviation as a trusted name in aircraft sales and acquisitions.
          </p>
          <p>
            Throughout his career, Bob has maintained the highest standards of professionalism and integrity in every transaction. His comprehensive understanding of the aviation market, combined with his technical expertise, ensures that clients receive expert guidance throughout the aircraft acquisition or sales process.
          </p>
        </div>
      </PageIntro>

      <ContactSection />
    </>
  )
}
