import React from 'react'

export default function Video() {
  return (
    <div className="w-full relative overflow-hidden" style={{ height: '70vh' }}>
      <video 
        className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}