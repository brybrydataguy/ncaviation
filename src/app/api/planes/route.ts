import { NextRequest, NextResponse } from 'next/server'
import { getPlanes } from '@/lib/planes'

export async function GET(req: NextRequest) {
  try {
    const planes = await getPlanes()
    return new NextResponse(JSON.stringify(planes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error fetching planes:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch planes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
