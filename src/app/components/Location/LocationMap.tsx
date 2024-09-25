'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Loader2 } from 'lucide-react'

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DynamicMap = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      <span className="sr-only">Cargando mapa...</span>
    </div>
  ),
})

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

const locations = [
  {
    name: "RC Amoblamientos Cerrito",
    position: [-31.5833333, -60.0666667] as [number, number],
    address: "Jujuy 185, Cerrito, Entre Ríos"
  },
  {
    name: "RC Amoblamientos Paraná",
    position: [-31.7333333, -60.5166667] as [number, number],
    address: "Av. Francisco Ramírez 1600, Paraná, Entre Ríos"
  }
]

const center: [number, number] = [-31.6583333, -60.2916667] // Calculated center between the two locations

export default function LocationMap() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    L.Marker.prototype.options.icon = DefaultIcon
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full h-80 relative z-10 rounded-lg overflow-hidden shadow-lg">
      <DynamicMap center={center} zoom={8} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                <p className="text-sm mb-2">{location.address}</p>
                <p className="text-xs">
                  Lat: {location.position[0].toFixed(6)}, Lon: {location.position[1].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </DynamicMap>
    </div>
  )
}