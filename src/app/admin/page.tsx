"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { Container } from "@/components/Container"
import { PageIntro } from "@/components/PageIntro"
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
      
      // Send form data directly to API
      const response = await fetch('/api/planes', {
        method: 'POST',
        body: formData, // FormData automatically sets the correct Content-Type
      })

      if (!response.ok) {
        throw new Error('Failed to create plane')
      }

      // Refresh planes list
      const updatedPlanes = await fetch('/api/planes').then(res => res.json())
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
                    <div className="flex items-center space-x-4">
                      <select
                        value={plane.status}
                        onChange={async (e) => {
                          try {
                            const updateData = new FormData()
                            updateData.append('status', e.target.value)
                            const response = await fetch(`/api/planes?id=${plane.id}`, {
                              method: 'PUT',
                              body: updateData,
                            })
                            if (!response.ok) throw new Error('Failed to update status')
                            const updatedPlanes = await fetch('/api/planes').then(res => res.json())
                            setPlanes(updatedPlanes)
                          } catch (error) {
                            console.error('Error updating plane status:', error)
                          }
                        }}
                        className="bg-neutral-700 text-neutral-100 rounded-md px-2 py-1 text-sm"
                      >
                        <option value="sale">For Sale</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                      </select>
                      <button
                        onClick={async () => {
                          if (!confirm('Are you sure you want to delete this aircraft?')) return
                          try {
                            const response = await fetch(`/api/planes?id=${plane.id}`, {
                              method: 'DELETE',
                            })
                            if (!response.ok) throw new Error('Failed to delete plane')
                            const updatedPlanes = await fetch('/api/planes').then(res => res.json())
                            setPlanes(updatedPlanes)
                          } catch (error) {
                            console.error('Error deleting plane:', error)
                          }
                        }}
                        className="bg-red-500/10 text-red-400 px-3 py-1 rounded-md text-sm hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
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
