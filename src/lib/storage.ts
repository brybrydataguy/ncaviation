import { storage } from './firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

/**
 * Uploads an image to Firebase Storage and returns the download URL
 * @param file - The file to upload
 * @param path - The path in storage where the file should be stored (e.g., 'planes/image.jpg')
 * @returns Promise<string> - The download URL of the uploaded file
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  } catch (error) {
    console.error('Error uploading image:', error)
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
    const uploadPromises = files.map((file, index) => {
      const path = `${basePath}/${Date.now()}-${index}-${file.name}`
      return uploadImage(file, path)
    })
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading images:', error)
    throw new Error('Failed to upload images')
  }
}
