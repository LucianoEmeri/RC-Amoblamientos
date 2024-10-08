import React from 'react'
import ShowCarousel from './components/ShowCarousel/ShowCarousel'
import About from './components/About/About'
import Video from './components/Videos/video'
import Video2 from './components/Videos/video2'
import InstagramGallery from './components/Instagram/instagram-gallery'
import Contact from './components/Contact/Contact'
import { Footer } from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ShowCarousel />
      <About />
      <Video2/>
      <InstagramGallery/>
      <Video/>
      <Contact/>
      <Footer/>
    </div>
  )
}