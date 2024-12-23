import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { db, storage } from '../firebase'

// Mock Firebase modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}))

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}))

describe('Firebase Initialization', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize Firebase app with correct config', () => {
    // Ensure Firebase is initialized with proper config
    expect(initializeApp).toHaveBeenCalledWith({
      apiKey: expect.any(String),
      authDomain: expect.any(String),
      projectId: expect.any(String),
      storageBucket: expect.any(String),
      messagingSenderId: expect.any(String),
      appId: expect.any(String),
      measurementId: expect.any(String),
    })
  })

  it('should initialize Firestore', () => {
    expect(getFirestore).toHaveBeenCalled()
    expect(db).toBeDefined()
  })

  it('should initialize Storage', () => {
    expect(getStorage).toHaveBeenCalled()
    expect(storage).toBeDefined()
  })
})
