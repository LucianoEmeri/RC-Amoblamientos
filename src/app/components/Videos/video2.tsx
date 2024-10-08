'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current

    const handleResize = () => {
      if (video && container) {
        const containerAspect = container.clientWidth / container.clientHeight
        const videoAspect = videoDimensions.width / videoDimensions.height

        if (containerAspect > videoAspect) {
          const scale = container.clientWidth / videoDimensions.width
          video.style.width = `${container.clientWidth}px`
          video.style.height = `${videoDimensions.height * scale}px`
        } else {
          const scale = container.clientHeight / videoDimensions.height
          video.style.width = `${videoDimensions.width * scale}px`
          video.style.height = `${container.clientHeight}px`
        }
      }
    }

    const handleLoadedMetadata = () => {
      if (video) {
        setVideoDimensions({ width: video.videoWidth, height: video.videoHeight })
      }
    }

    window.addEventListener('resize', handleResize)
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [videoDimensions])

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight * 0.6}px` // Reduced from 0.8 to 0.6
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="https://res.cloudinary.com/dhm3hgkzo/video/upload/v1728424556/video2_f6di0r.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
    </div>
  )
}