export interface Aircraft {
  name: string
  price: number
  status: 'sale' | 'sold' | 'pending'
  mainImage: string
  images: string[]
}
