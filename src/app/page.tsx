import React from 'react'
import ShowCarousel from './components/ShowCarousel/ShowCarousel'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import SponsorCarousel from './components/Sponsor/sponsor-carousel'
import Video from './components/Sponsor/video'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ShowCarousel />
      <About />
      <SponsorCarousel/>
      <Video/>
    </div>
  )
}