import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase only if it hasn't been initialized already
export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize services
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

// Initialize Analytics and export it
export const getFirebaseAnalytics = () => {
  if (typeof window !== 'undefined') {
    return getAnalytics(firebaseApp)
  }
  return null
}
