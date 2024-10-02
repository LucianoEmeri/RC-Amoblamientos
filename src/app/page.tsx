import React from 'react'
import ShowCarousel from './components/ShowCarousel/ShowCarousel'
import About from './components/About/About'
import Video from './components/Sponsor/video'
import InstagramGallery from './components/Instagram/instagram-gallery'
import Contact from './components/Contact/Contact'
// import SponsorCarouselWhite from './components/Sponsor/sponsor-carousel-white'
// import SponsorCarouselBlack from './components/Sponsor/sponsor-carousel-black'

export default function Home() {
  return (
    <div className="min-h-screen">
      <ShowCarousel />
      <About />
      {/* <SponsorCarouselBlack/> */}
      <InstagramGallery/>
      <Video/>
      {/* <SponsorCarouselWhite/> */}
      <Contact/>
    </div>
  )
}