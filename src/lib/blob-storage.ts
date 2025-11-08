import { put, del } from '@vercel/blob'

// Ensure this file is only imported server-side
if (typeof window !== 'undefined') {
  throw new Error('blob-storage.ts should only be imported server-side')
}

/**
 * Uploads an image to Vercel Blob Storage and returns the URL
 * @param file - The file to upload
 * @param path - The path in storage where the file should be stored (e.g., 'planes/image.jpg')
 * @returns Promise<string> - The URL of the uploaded file
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    // Validate file before upload
    if (!file || file.size === 0 || !file.name) {
      throw new Error('Invalid file: File is empty or has no name')
    }

    console.log('Starting image upload to path:', path)

    // Convert File to Buffer for Vercel Blob
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const blob = await put(path, buffer, {
      access: 'public',
      contentType: file.type || 'image/jpeg',
    })

    console.log('Image upload complete. URL:', blob.url)
    return blob.url
  } catch (error) {
    console.error('Error uploading image:', error)
    console.error('Failed path:', path)
    console.error('File details:', { name: file.name, size: file.size, type: file.type })
    throw new Error('Failed to upload image')
  }
}

/**
 * Uploads multiple images to Vercel Blob Storage and returns their URLs
 * @param files - Array of files to upload
 * @param basePath - Base path in storage where files should be stored (e.g., 'planes')
 * @returns Promise<string[]> - Array of URLs for the uploaded files
 */
export async function uploadImages(files: File[], basePath: string): Promise<string[]> {
  try {
    // Filter out invalid files (empty or no name)
    const validFiles = files.filter(file => file && file.size > 0 && file.name)

    if (validFiles.length === 0) {
      console.log('No valid files to upload')
      return []
    }

    console.log('Starting batch upload of', validFiles.length, 'images to base path:', basePath)
    const uploadPromises = validFiles.map((file, index) => {
      const path = `${basePath}/${Date.now()}-${index}-${file.name}`
      console.log('Queuing upload for file:', file.name, 'to path:', path)
      return uploadImage(file, path)
    })
    const urls = await Promise.all(uploadPromises)
    console.log('Batch upload complete. Successfully uploaded', urls.length, 'images')
    return urls
  } catch (error) {
    console.error('Error uploading images:', error)
    console.error('Base path:', basePath)
    console.error('Files details:', files.map(f => ({ name: f.name, size: f.size, type: f.type })))
    throw new Error('Failed to upload images')
  }
}

/**
 * Deletes an image from Vercel Blob Storage
 * @param url - The URL of the image to delete
 * @returns Promise<void>
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url)
    console.log('Image deleted successfully:', url)
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}