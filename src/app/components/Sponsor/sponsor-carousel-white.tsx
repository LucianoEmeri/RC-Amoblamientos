"use client"

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useAnimationFrame } from 'framer-motion'

interface Sponsor {
  name: string;
  image: string;
}

const sponsors: Sponsor[] = [
  { name: 'Dekton', image: '/assets/Dekton.png' },
  { name: 'Silestone', image: '/assets/Silestone.png' },
  { name: 'Marmotech', image: '/assets/Marmotech.png' },
  { name: 'Dekton', image: '/assets/Dekton.png' },
  { name: 'Silestone', image: '/assets/Silestone.png' },
  { name: 'Marmotech', image: '/assets/Marmotech.png' },
]

export default function SponsorCarouselWhite() {
  const [scrollX, setScrollX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
        setIsMobile(window.innerWidth < 640)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useAnimationFrame(() => {
    setScrollX((prevScrollX) => {
      const speed = isMobile ? 0.5 : 1
      const newScrollX = prevScrollX - speed
      const sponsorSetWidth = containerWidth
      return newScrollX <= -sponsorSetWidth ? prevScrollX + sponsorSetWidth : newScrollX
    })
  })

  return (
    <div className="w-full bg-white">
      <div className="w-full overflow-hidden py-4">
        <div className="relative" ref={containerRef}>
          <div 
            className="flex whitespace-nowrap"
            style={{ 
              width: `${containerWidth * 3}px`, 
              transform: `translateX(${scrollX}px)`,
              transition: 'transform 0.1s linear'
            }}
            aria-label="Sponsor carousel"
          >
            {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
              <div 
                key={`${sponsor.name}-${index}`}
                className="inline-block px-4"
                style={{ width: `${containerWidth / sponsors.length}px` }}
              >
                <Image
                  src={sponsor.image}
                  alt={`${sponsor.name} logo`}
                  width={200}
                  height={100}
                  quality={100}
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}