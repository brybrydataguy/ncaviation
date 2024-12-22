import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { createPlane, getPlane, updatePlane, deletePlane } from '../planes'
import type { AircraftPlan } from '@/types/plane'

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}))

jest.mock('../firebase', () => ({
  db: {},
}))

describe('Planes CRUD Operations', () => {
  const mockPlane: AircraftPlan = {
    name: 'Test Aircraft',
    price: 1000000,
    status: 'sale',
    mainImage: 'https://example.com/image.jpg',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  }

  const mockDocRef = {
    id: 'test-id',
  }

  const mockDocSnapshot = {
    exists: jest.fn().mockReturnValue(true),
    data: jest.fn().mockReturnValue(mockPlane),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(collection as jest.Mock).mockReturnValue({})
    ;(doc as jest.Mock).mockReturnValue(mockDocRef)
    ;(getDoc as jest.Mock).mockResolvedValue(mockDocSnapshot)
    ;(addDoc as jest.Mock).mockResolvedValue(mockDocRef)
    ;(updateDoc as jest.Mock).mockResolvedValue(undefined)
    ;(deleteDoc as jest.Mock).mockResolvedValue(undefined)
  })

  describe('createPlane', () => {
    it('should create a new plane document', async () => {
      const result = await createPlane(mockPlane)
      expect(collection).toHaveBeenCalledWith(db, 'planes')
      expect(addDoc).toHaveBeenCalledWith(expect.any(Object), mockPlane)
      expect(result).toBe('test-id')
    })

    it('should throw error if creation fails', async () => {
      ;(addDoc as jest.Mock).mockRejectedValue(new Error('Failed to create'))
      await expect(createPlane(mockPlane)).rejects.toThrow('Failed to create plane')
    })
  })

  describe('getPlane', () => {
    it('should retrieve a plane document', async () => {
      const result = await getPlane('test-id')
      expect(doc).toHaveBeenCalledWith(db, 'planes', 'test-id')
      expect(getDoc).toHaveBeenCalledWith(mockDocRef)
      expect(result).toEqual(mockPlane)
    })

    it('should throw error if plane not found', async () => {
      ;(mockDocSnapshot.exists as jest.Mock).mockReturnValue(false)
      await expect(getPlane('test-id')).rejects.toThrow('Plane not found')
    })
  })

  describe('updatePlane', () => {
    it('should update a plane document', async () => {
      await updatePlane('test-id', { price: 2000000 })
      expect(doc).toHaveBeenCalledWith(db, 'planes', 'test-id')
      expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { price: 2000000 })
    })

    it('should throw error if update fails', async () => {
      ;(updateDoc as jest.Mock).mockRejectedValue(new Error('Failed to update'))
      await expect(updatePlane('test-id', { price: 2000000 })).rejects.toThrow('Failed to update plane')
    })
  })

  describe('deletePlane', () => {
    it('should delete a plane document', async () => {
      await deletePlane('test-id')
      expect(doc).toHaveBeenCalledWith(db, 'planes', 'test-id')
      expect(deleteDoc).toHaveBeenCalledWith(mockDocRef)
    })

    it('should throw error if deletion fails', async () => {
      ;(deleteDoc as jest.Mock).mockRejectedValue(new Error('Failed to delete'))
      await expect(deletePlane('test-id')).rejects.toThrow('Failed to delete plane')
    })
  })
})
