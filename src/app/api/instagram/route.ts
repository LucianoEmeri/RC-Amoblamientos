import { NextResponse } from 'next/server'

const INSTAGRAM_API_URL = 'https://graph.instagram.com/me/media'

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    if (!accessToken) {
      throw new Error('Instagram access token not found')
    }

    const response = await fetch(
      `${INSTAGRAM_API_URL}?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Instagram API error:', errorData)
      throw new Error(`Failed to fetch Instagram posts: ${errorData.error.message}`)
    }

    const data = await response.json()
    
    // Set CORS headers
    const headers = new Headers()
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    
    return NextResponse.json(data.data, { headers })
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 })
  }
}

export async function OPTIONS() {
  const headers = new Headers()
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return NextResponse.json({}, { headers })
}