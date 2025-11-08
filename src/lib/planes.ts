import { db, planes, planeImages } from '@/db'
import { eq, desc, inArray } from 'drizzle-orm'
import { Aircraft } from '@/types/plane'

// Create a new plane with images
export async function createPlane(data: Aircraft): Promise<string> {
  try {
    // Insert the plane
    const [newPlane] = await db.insert(planes).values({
      name: data.name,
      price: data.price,
      status: data.status,
      mainImageUrl: data.mainImage,
    }).returning()

    // Insert additional images if any
    if (data.images && data.images.length > 0) {
      const imageRecords = data.images.map((imageUrl, index) => ({
        planeId: newPlane.id,
        imageUrl,
        position: index,
      }))
      await db.insert(planeImages).values(imageRecords)
    }

    return newPlane.id
  } catch (error) {
    console.error('Error creating plane:', error)
    throw new Error('Failed to create plane')
  }
}

// Get all planes with their images
export async function getPlanes(): Promise<(Aircraft & { id: string })[]> {
  try {
    // Get all planes
    const planesData = await db
      .select()
      .from(planes)
      .orderBy(desc(planes.createdAt))

    // Get all images for these planes
    const planeIds = planesData.map(p => p.id)
    const images = planeIds.length > 0
      ? await db
          .select()
          .from(planeImages)
          .where(inArray(planeImages.planeId, planeIds))
          .orderBy(planeImages.position)
      : []

    // Group images by plane
    const imagesByPlane = images.reduce((acc, img) => {
      if (!acc[img.planeId]) acc[img.planeId] = []
      acc[img.planeId].push(img.imageUrl)
      return acc
    }, {} as Record<string, string[]>)

    // Map to Aircraft type
    return planesData.map(plane => ({
      id: plane.id,
      name: plane.name,
      price: plane.price,
      status: plane.status,
      mainImage: plane.mainImageUrl,
      images: imagesByPlane[plane.id] || [],
    }))
  } catch (error) {
    console.error('Error fetching planes:', error)
    throw new Error('Failed to fetch planes')
  }
}

// Get planes by status
export async function getPlanesByStatus(status: Aircraft['status']): Promise<(Aircraft & { id: string })[]> {
  try {
    const planesData = await db
      .select()
      .from(planes)
      .where(eq(planes.status, status))
      .orderBy(desc(planes.createdAt))

    // Get images for these planes
    const planeIds = planesData.map(p => p.id)
    const images = planeIds.length > 0
      ? await db
          .select()
          .from(planeImages)
          .where(inArray(planeImages.planeId, planeIds))
          .orderBy(planeImages.position)
      : []

    // Group images by plane
    const imagesByPlane = images.reduce((acc, img) => {
      if (!acc[img.planeId]) acc[img.planeId] = []
      acc[img.planeId].push(img.imageUrl)
      return acc
    }, {} as Record<string, string[]>)

    return planesData.map(plane => ({
      id: plane.id,
      name: plane.name,
      price: plane.price,
      status: plane.status,
      mainImage: plane.mainImageUrl,
      images: imagesByPlane[plane.id] || [],
    }))
  } catch (error) {
    console.error('Error fetching planes by status:', error)
    throw new Error('Failed to fetch planes by status')
  }
}

// Get a single plane by ID
export async function getPlane(id: string): Promise<Aircraft & { id: string }> {
  try {
    const [plane] = await db
      .select()
      .from(planes)
      .where(eq(planes.id, id))
      .limit(1)

    if (!plane) {
      throw new Error('Plane not found')
    }

    // Get additional images
    const images = await db
      .select()
      .from(planeImages)
      .where(eq(planeImages.planeId, id))
      .orderBy(planeImages.position)

    return {
      id: plane.id,
      name: plane.name,
      price: plane.price,
      status: plane.status,
      mainImage: plane.mainImageUrl,
      images: images.map(img => img.imageUrl),
    }
  } catch (error) {
    console.error('Error fetching plane:', error)
    throw new Error('Failed to fetch plane')
  }
}

// Update a plane
export async function updatePlane(id: string, data: Partial<Aircraft>): Promise<string> {
  try {
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.price !== undefined) updateData.price = data.price
    if (data.status !== undefined) updateData.status = data.status
    if (data.mainImage !== undefined) updateData.mainImageUrl = data.mainImage

    // Update the plane
    await db
      .update(planes)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(planes.id, id))

    // If images are provided, update them
    if (data.images !== undefined) {
      // Delete existing additional images
      await db.delete(planeImages).where(eq(planeImages.planeId, id))

      // Insert new images
      if (data.images.length > 0) {
        const imageRecords = data.images.map((imageUrl, index) => ({
          planeId: id,
          imageUrl,
          position: index,
        }))
        await db.insert(planeImages).values(imageRecords)
      }
    }

    return id
  } catch (error) {
    console.error('Error updating plane:', error)
    throw new Error('Failed to update plane')
  }
}

// Delete a plane
export async function deletePlane(id: string): Promise<string> {
  try {
    // Images will be cascade deleted due to foreign key constraint
    await db.delete(planes).where(eq(planes.id, id))
    return id
  } catch (error) {
    console.error('Error deleting plane:', error)
    throw new Error('Failed to delete plane')
  }
}