import { storage } from './firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

/**
 * Uploads an image to Firebase Storage and returns the download URL
 * @param file - The file to upload
 * @param path - The path in storage where the file should be stored (e.g., 'planes/image.jpg')
 * @returns Promise<string> - The download URL of the uploaded file
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    console.log('Starting image upload to path:', path)
    const storageRef = ref(storage, path)
    console.log('Created storage reference, attempting upload...')
    await uploadBytes(storageRef, file)
    console.log('Upload successful, getting download URL...')
    const url = await getDownloadURL(storageRef)
    console.log('Image upload complete. Download URL:', url)
    return url
  } catch (error) {
    console.error('Error uploading image:', error)
    console.error('Failed path:', path)
    console.error('File details:', { name: file.name, size: file.size, type: file.type })
    throw new Error('Failed to upload image')
  }
}

/**
 * Uploads multiple images to Firebase Storage and returns their download URLs
 * @param files - Array of files to upload
 * @param basePath - Base path in storage where files should be stored (e.g., 'planes')
 * @returns Promise<string[]> - Array of download URLs for the uploaded files
 */
export async function uploadImages(files: File[], basePath: string): Promise<string[]> {
  try {
    console.log('Starting batch upload of', files.length, 'images to base path:', basePath)
    const uploadPromises = files.map((file, index) => {
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
 * Deletes an image from Firebase Storage
 * @param path - The path of the image to delete (e.g., 'planes/image.jpg')
 * @returns Promise<void>
 */
export async function deleteImage(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}
