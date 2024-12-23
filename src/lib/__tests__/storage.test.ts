import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../firebase'
import { uploadImage, uploadImages, deleteImage } from '../storage'

// Mock Firebase Storage
jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  deleteObject: jest.fn(),
}))

jest.mock('../firebase', () => ({
  storage: {},
}))

describe('Storage Operations', () => {
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
  const mockDownloadURL = 'https://example.com/test.jpg'
  const mockStorageRef = {}

  beforeEach(() => {
    jest.clearAllMocks()
    ;(ref as jest.Mock).mockReturnValue(mockStorageRef)
    ;(uploadBytes as jest.Mock).mockResolvedValue({})
    ;(getDownloadURL as jest.Mock).mockResolvedValue(mockDownloadURL)
    ;(deleteObject as jest.Mock).mockResolvedValue(undefined)
  })

  describe('uploadImage', () => {
    it('should upload a single image and return download URL', async () => {
      const result = await uploadImage(mockFile, 'test/test.jpg')
      expect(ref).toHaveBeenCalledWith(storage, 'test/test.jpg')
      expect(uploadBytes).toHaveBeenCalledWith(mockStorageRef, mockFile)
      expect(getDownloadURL).toHaveBeenCalledWith(mockStorageRef)
      expect(result).toBe(mockDownloadURL)
    })

    it('should throw error if upload fails', async () => {
      ;(uploadBytes as jest.Mock).mockRejectedValue(new Error('Upload failed'))
      await expect(uploadImage(mockFile, 'test/test.jpg')).rejects.toThrow('Failed to upload image')
    })
  })

  describe('uploadImages', () => {
    const mockFiles = [
      new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
    ]

    it('should upload multiple images and return download URLs', async () => {
      const results = await uploadImages(mockFiles, 'test')
      expect(results).toHaveLength(2)
      expect(results).toEqual([mockDownloadURL, mockDownloadURL])
      expect(uploadBytes).toHaveBeenCalledTimes(2)
      expect(getDownloadURL).toHaveBeenCalledTimes(2)
    })

    it('should throw error if any upload fails', async () => {
      ;(uploadBytes as jest.Mock).mockRejectedValueOnce(new Error('Upload failed'))
      await expect(uploadImages(mockFiles, 'test')).rejects.toThrow('Failed to upload images')
    })
  })

  describe('deleteImage', () => {
    it('should delete an image', async () => {
      await deleteImage('test/test.jpg')
      expect(ref).toHaveBeenCalledWith(storage, 'test/test.jpg')
      expect(deleteObject).toHaveBeenCalledWith(mockStorageRef)
    })

    it('should throw error if deletion fails', async () => {
      ;(deleteObject as jest.Mock).mockRejectedValue(new Error('Delete failed'))
      await expect(deleteImage('test/test.jpg')).rejects.toThrow('Failed to delete image')
    })
  })
})
