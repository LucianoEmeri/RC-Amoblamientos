'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const locations = [
  {
    name: "RC Amoblamientos Cerrito",
    position: [-31.5833, -60.0667] as [number, number]
  },
  {
    name: "RC Amoblamientos Paraná",
    position: [-31.7333, -60.5167] as [number, number]
  }
]

const center: [number, number] = [-31.7333, -60.5167] // Approximate center between the two locations

export default function LocationMap() {
  return (
    <div className="w-full h-80 relative z-10">
      <MapContainer center={center} zoom={9} style={{ height: '100%', width: '100%' }} className="z-10">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}