import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aircraft For Sale - NC Aviation',
  description: 'View our current aircraft listings and sign up for notifications about new planes for sale.',
}

export default function ForSaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
