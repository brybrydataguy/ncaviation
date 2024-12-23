import { NextRequest, NextResponse } from 'next/server'
import { getPlanes, createPlane, updatePlane, deletePlane } from '@/lib/planes'
import type { Aircraft } from '@/types/plane'

export async function GET(req: NextRequest) {
  try {
    const planes = await getPlanes()
    return NextResponse.json(planes)
  } catch (error) {
    console.error('Error fetching planes:', error)
    return NextResponse.json({ error: 'Failed to fetch planes' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const planeData: Aircraft = await req.json()
    const newPlaneId = await createPlane(planeData)
    return NextResponse.json({ id: newPlaneId }, { status: 201 })
  } catch (error) {
    console.error('Error creating plane:', error)
    return NextResponse.json({ error: 'Failed to create plane' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing plane ID' }, { status: 400 })
    }
    const updatedData: Partial<Aircraft> = await req.json()
    await updatePlane(id, updatedData)
    return NextResponse.json({ message: 'Plane updated successfully' })
  } catch (error) {
    console.error('Error updating plane:', error)
    return NextResponse.json({ error: 'Failed to update plane' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing plane ID' }, { status: 400 })
    }
    await deletePlane(id)
    return NextResponse.json({ message: 'Plane deleted successfully' })
  } catch (error) {
    console.error('Error deleting plane:', error)
    return NextResponse.json({ error: 'Failed to delete plane' }, { status: 500 })
  }
}
