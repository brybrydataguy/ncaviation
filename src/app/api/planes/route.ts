import { NextRequest, NextResponse } from 'next/server'
import { getPlanes, createPlane, updatePlane, deletePlane } from '@/lib/planes'
import { uploadImage, uploadImages } from '@/lib/storage'
import type { Aircraft } from '@/types/plane'

// Ensure we're running server-side
if (typeof window !== 'undefined') {
  throw new Error('This file should only be imported server-side')
}

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
    // Parse the multipart form data
    const formData = await req.formData()
    
    // Get and validate files from form data
    const mainImageFile = formData.get('mainImage')
    if (!mainImageFile || !(mainImageFile instanceof File)) {
      return NextResponse.json({ error: 'Main image must be a file' }, { status: 400 })
    }

    const additionalImageFiles = formData.getAll('images').filter((file): file is File => file instanceof File)
    
    // Validate required fields
    const name = formData.get('name')
    const price = formData.get('price')
    const status = formData.get('status')

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!price || isNaN(Number(price))) {
      return NextResponse.json({ error: 'Valid price is required' }, { status: 400 })
    }
    if (!status || !['sale', 'pending', 'sold'].includes(status as string)) {
      return NextResponse.json({ error: 'Valid status is required' }, { status: 400 })
    }

    // Upload images using server-side storage functions
    const mainImagePath = `planes/${Date.now()}-${mainImageFile.name}`
    const mainImageUrl = await uploadImage(mainImageFile, mainImagePath)
    
    const additionalImageUrls = await uploadImages(additionalImageFiles, 'planes')

    // Create plane data
    const planeData: Aircraft = {
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      status: formData.get('status') as Aircraft['status'],
      mainImage: mainImageUrl,
      images: additionalImageUrls
    }

    // Save plane to database
    const newPlaneId = await createPlane(planeData)
    return NextResponse.json({ id: newPlaneId, ...planeData }, { status: 201 })
  } catch (error) {
    console.error('Error creating plane:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({ error: `Failed to create plane: ${errorMessage}` }, { status: 500 })
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({ error: `Failed to update plane: ${errorMessage}` }, { status: 500 })
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({ error: `Failed to delete plane: ${errorMessage}` }, { status: 500 })
  }
}
