import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APPP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase, ensuring only one instance is created
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Firestore and Storage
export const db = getFirestore(app)
export const storage = getStorage(app)
