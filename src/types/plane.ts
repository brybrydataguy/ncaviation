export interface AircraftPlan {
  name: string
  price: number
  status: 'sale' | 'sold' | 'pending'
  mainImage: string
  images: string[]
}
