'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Instagram, Plus } from 'lucide-react'

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
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
  const textShadowClass = "drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await fetchInstagramPosts()
        setPosts(fetchedPosts)
        setVisiblePosts(fetchedPosts.slice(0, 8))
      } catch (err) {
        // setError('Error al cargar las imágenes de Instagram')
        console.error(err)
      } finally {
        // setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const loadMorePosts = () => {
    const currentLength = visiblePosts.length
    const newPosts = posts.slice(currentLength, currentLength + 8)
    setVisiblePosts([...visiblePosts, ...newPosts])
  }

//   if (loading) return <div className="text-center py-8 text-white">Cargando...</div>
//   if (error) return <div className="text-center py-8 text-white">{error}</div>

  return (
    <div id="news" className="relative bg-cover bg-center bg-no-repeat py-16" style={{ backgroundImage: "url('/assets/pxfuel.com.jpg')" }}>
      <div className="absolute inset-0"></div>
      <div className="relative container mx-auto px-4">
        <h2 className={`text-5xl font-normal mb-16 text-center text-white ${textShadowClass}`}>NOVEDADES</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visiblePosts.map((post) => (
            <div key={post.id} className="relative aspect-square overflow-hidden shadow-lg">
              <Image
                src={post.media_type === 'VIDEO' ? post.thumbnail_url || post.media_url : post.media_url}
                alt={post.caption || `Instagram post ${post.id}`}
                layout="fill"
                objectFit="cover"
              />
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="text-white text-center p-2">
                  <p className="text-sm">{post.caption ? `${post.caption.slice(0, 50)}...` : 'Ver en Instagram'}</p>
                  {post.media_type === 'VIDEO' && <p className="text-xs mt-1">(Video)</p>}
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-14 space-x-4">
          {visiblePosts.length < posts.length && (
            <button
              onClick={loadMorePosts}
              className="px-6 py-3 bg-white text-black border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out flex items-center shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Cargar más
            </button>
          )}
          <a
            href="https://www.instagram.com/rc_amoblamientos"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out flex items-center shadow-md hover:shadow-lg"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Síguenos en Instagram
          </a>
        </div>
      </div>
    </div>
  )
}