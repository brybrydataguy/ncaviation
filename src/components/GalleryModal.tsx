'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './GalleryModal.module.css'

interface GalleryModalProps {
  images: string[]
  onClose: () => void
  initialIndex?: number
}

export function GalleryModal({ images, onClose, initialIndex = 0 }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = useCallback(() => {
    setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }, [images.length])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrevious, onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.imageContainer}>
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1} of ${images.length}`}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 90vw, 100vw"
            priority
            quality={90}
          />
          
          <button
            className={`${styles.navigationButton} ${styles.prevButton}`}
            onClick={handlePrevious}
          >
            ←
            <span className="sr-only">Previous</span>
          </button>
          
          <button
            className={`${styles.navigationButton} ${styles.nextButton}`}
            onClick={handleNext}
          >
            →
            <span className="sr-only">Next</span>
          </button>
        </div>

        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">View image {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
