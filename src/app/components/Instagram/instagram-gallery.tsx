'use client'

import { useState, useEffect } from 'react'
import { Instagram, Plus } from 'lucide-react'
import Image from 'next/image'

interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  media_type: string
  thumbnail_url?: string
  caption?: string
}

async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const response = await fetch('/api/instagram')
  if (!response.ok) {
    throw new Error('Error al cargar las imágenes de Instagram')
  }
  return response.json()
}

export default function InstagramGallery() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [visiblePosts, setVisiblePosts] = useState<InstagramPost[]>([])
  const [isSmallMobile, setIsSmallMobile] = useState(true)
  const textShadowClass = "drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await fetchInstagramPosts()
        setPosts(fetchedPosts)
        setVisiblePosts(fetchedPosts.slice(0, isSmallMobile ? 4 : 8))
      } catch (err) {
        console.error(err)
      }
    }

    const handleResize = () => {
      setIsSmallMobile(window.innerWidth < 640)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    loadPosts()

    return () => window.removeEventListener('resize', handleResize)
  }, [isSmallMobile])

  const loadMorePosts = () => {
    const currentLength = visiblePosts.length
    const newPosts = posts.slice(currentLength, currentLength + (isSmallMobile ? 4 : 8))
    setVisiblePosts([...visiblePosts, ...newPosts])
  }

  return (
    <div id="news" className="relative py-16">
      <Image
        src="/assets/background2.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0"></div>
      <div className="relative container mx-auto px-4">
        <h2 className={`text-4xl sm:text-5xl font-normal mb-8 sm:mb-16 text-center text-white ${textShadowClass}`}>NOVEDADES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {visiblePosts.map((post) => (
            <div key={post.id} className="relative aspect-square overflow-hidden shadow-lg">
              <img
                src={post.media_type === 'VIDEO' ? post.thumbnail_url || post.media_url : post.media_url}
                alt={post.caption || `Instagram post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="text-white text-center p-4">
                  <p className="text-sm sm:text-base">{post.caption ? `${post.caption.slice(0, 100)}...` : 'Ver en Instagram'}</p>
                  {post.media_type === 'VIDEO' && <p className="text-xs mt-1">(Video)</p>}
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center mt-8 sm:mt-14 space-y-4 sm:space-y-0 sm:space-x-4">
          {visiblePosts.length < posts.length && (
            <button
              onClick={loadMorePosts}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-black border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Cargar más
            </button>
          )}
          <a
            href="https://www.instagram.com/rc_amoblamientos"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-black border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Síguenos en Instagram
          </a>
        </div>
      </div>
    </div>
  )
}