import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NC Aviation',
  description: 'Contact NC Aviation for expert aircraft sales and acquisitions.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
