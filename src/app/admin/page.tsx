"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { Container } from "@/components/Container"
import { PageIntro } from "@/components/PageIntro"
import { createPlane, getPlanes, updatePlane, deletePlane } from '@/lib/planes'
import { uploadImage, uploadImages } from '@/lib/storage'
import type { Aircraft } from '@/types/plane'
import Image from 'next/image'

export default function AdminPage(): React.ReactElement {
  const { data: session, status } = useSession()
  const [planes, setPlanes] = useState<(Aircraft & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  console.log(session)
  useEffect(() => {
    async function fetchPlanes() {
     try {
        const planesData = await fetch('/api/planes').then((res) => res.json())
        setPlanes(planesData)
      } catch (error) {
        console.error('Error fetching planes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlanes()
  }, [])

  async function handleCreatePlane(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('submitting')

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      // Handle image uploads
      const mainImageFile = (formData.get('mainImage') as File)
      const additionalImageFiles = Array.from(formData.getAll('images') as File[])
      
      // Upload images to Firebase Storage
      const mainImageUrl = await uploadImage(mainImageFile, `planes/${Date.now()}-${mainImageFile.name}`)
      const additionalImageUrls = await uploadImages(additionalImageFiles, 'planes')

      // Create plane data
      const planeData: Aircraft = {
        name: formData.get('name') as string,
        price: Number(formData.get('price')),
        status: formData.get('status') as Aircraft['status'],
        mainImage: mainImageUrl,
        images: additionalImageUrls
      }

      // Save to Firestore
      await createPlane(planeData)
      
      // Refresh planes list
      const updatedPlanes = await getPlanes()
      setPlanes(updatedPlanes)
      
      setFormStatus('success')
      form.reset()
    } catch (error) {
      console.error('Error creating plane:', error)
      setFormStatus('error')
    }
  }

  if (status === "loading" || loading) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="flex justify-center">
          <p className="text-neutral-300">Loading...</p>
        </div>
      </Container>
    )
  }

  if (!session) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="flex justify-center">
          <p className="text-red-500">Access Denied. Please log in.</p>
        </div>
      </Container>
    )
  }

  return (
    <>
      <PageIntro eyebrow="Admin Dashboard" title="Aircraft Management">
        <p>
          Add, edit, and manage aircraft listings from this dashboard.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {/* Add New Aircraft Form */}
          <div className="bg-neutral-900 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-6">Add New Aircraft</h2>
            <form onSubmit={handleCreatePlane} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                  Aircraft Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-800 text-neutral-100 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral-300">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-800 text-neutral-100 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-neutral-300">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  required
                  className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-800 text-neutral-100 px-3 py-2"
                >
                  <option value="sale">For Sale</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div>
                <label htmlFor="mainImage" className="block text-sm font-medium text-neutral-300">
                  Main Image
                </label>
                <input
                  type="file"
                  name="mainImage"
                  id="mainImage"
                  accept="image/*"
                  required
                  className="mt-1 block w-full text-sm text-neutral-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-neutral-700 file:text-neutral-100
                    hover:file:bg-neutral-600"
                />
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-neutral-300">
                  Additional Images
                </label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  accept="image/*"
                  multiple
                  className="mt-1 block w-full text-sm text-neutral-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-neutral-700 file:text-neutral-100
                    hover:file:bg-neutral-600"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {formStatus === 'submitting' ? 'Adding...' : 'Add Aircraft'}
              </button>

              {formStatus === 'success' && (
                <p className="mt-2 text-sm text-green-500">Aircraft added successfully!</p>
              )}
              {formStatus === 'error' && (
                <p className="mt-2 text-sm text-red-500">Error adding aircraft. Please try again.</p>
              )}
            </form>
          </div>

          {/* Aircraft Listings */}
          <div className="bg-neutral-900 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-6">Aircraft Listings</h2>
            <div className="space-y-6">
              {planes.map((plane) => (
                <div key={plane.id} className="bg-neutral-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-neutral-100">{plane.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      plane.status === 'sale' ? 'bg-green-500/10 text-green-400' :
                      plane.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {plane.status === 'sale' ? 'For Sale' :
                       plane.status === 'pending' ? 'Pending' : 'Sold'}
                    </span>
                  </div>
                  <p className="mt-2 text-neutral-300">${plane.price.toLocaleString()}</p>
                    <div className="mt-4">
                    <Image
                      src={plane.mainImage}
                      alt={plane.name}
                      width={500}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    </div>
                </div>
              ))}
              {planes.length === 0 && (
                <p className="text-neutral-400">No aircraft listings yet.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
