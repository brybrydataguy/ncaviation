import { db } from './firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  DocumentData,
  QueryDocumentSnapshot 
} from 'firebase/firestore'
import { Aircraft } from '@/types/plane'

const planesCollection = collection(db, 'planes')

// Convert Firestore document to Aircraft type
const convertDoc = (doc: QueryDocumentSnapshot<DocumentData>): Aircraft & { id: string } => {
  const data = doc.data()
  return {
    id: doc.id,
    name: data.name,
    price: data.price,
    status: data.status,
    mainImage: data.mainImage,
    images: data.images
  }
}

// Create a new plane
export async function createPlane(data: Aircraft) {
  const docRef = await addDoc(planesCollection, data)
  return docRef.id
}

// Get all planes
export async function getPlanes() {
  const snapshot = await getDocs(planesCollection)
  return snapshot.docs.map(convertDoc)
}

// Get planes by status
export async function getPlanesByStatus(status: Aircraft['status']) {
  const q = query(planesCollection, where("status", "==", status))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(convertDoc)
}

// Get a single plane by ID
export async function getPlane(id: string) {
  const docRef = doc(db, 'planes', id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) {
    throw new Error('Plane not found')
  }
  return convertDoc(snapshot)
}

// Update a plane
export async function updatePlane(id: string, data: Partial<Aircraft>) {
  const docRef = doc(db, 'planes', id)
  await updateDoc(docRef, data)
  return id
}

// Delete a plane
export async function deletePlane(id: string) {
  const docRef = doc(db, 'planes', id)
  await deleteDoc(docRef)
  return id
}
