'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Loader2 } from 'lucide-react'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DynamicMap = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 sm:h-80 bg-black animate-pulse flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
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
    position: [-31.581844376805705, -60.07839924007683] as [number, number],
    address: "Jujuy 185, Cerrito, Entre Ríos"
  },
  {
    name: "RC Amoblamientos Paraná",
    position: [-31.73216347817546, -60.51612112229742] as [number, number],
    address: "Av. Francisco Ramírez 1600, Paraná, Entre Ríos"
  }
]

const center: [number, number] = [
  (locations[0].position[0] + locations[1].position[0]) / 2,
  (locations[0].position[1] + locations[1].position[1]) / 2
]

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
    <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg">
      <DynamicMap center={center} zoom={9} className="w-full h-full">
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