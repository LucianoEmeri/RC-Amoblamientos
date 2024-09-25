'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import SponsorCarouselBlack from '../components/Sponsor/sponsor-carousel-black'

type Category = 'Todos' | 'Mármol' | 'Granito' | 'Cuarcita' | 'Marmetas' | 'Dekton' | 'Marmotech' | 'Silestone'

interface Product {
  id: number
  name: string
  category: Category
  image: string
}

const products: Product[] = [
  { id: 1, name: 'Travertino', category: 'Mármol', image: '/assets/travertino-500x500.jpeg' },
  { id: 2, name: 'Mármol Clásico', category: 'Mármol', image: '/assets/marmol-500x500.jpeg' },
  { id: 3, name: 'Granito Negro', category: 'Granito', image: '/assets/granito-500x500.jpeg' },
  { id: 4, name: 'Cuarcita Blanca', category: 'Cuarcita', image: '/assets/cuarcita-500x500.jpeg' },
  { id: 5, name: 'Marmetas Variadas', category: 'Marmetas', image: '/assets/marmetas-500x500.jpeg' },
  { id: 6, name: 'Dekton Slim', category: 'Dekton', image: '/assets/dekton-500x500.jpeg' },
  { id: 7, name: 'Dekton Modulado', category: 'Dekton', image: '/assets/dekton-modulado-500x500.jpeg' },
  { id: 8, name: 'Marmotech Classic', category: 'Marmotech', image: '/assets/marmotech-500x500.jpeg' },
]

const categories: Category[] = ['Todos', 'Mármol', 'Granito', 'Cuarcita', 'Marmetas', 'Dekton', 'Marmotech', 'Silestone']

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos')

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="relative min-h-screen">
      <Image
        src="/assets/marquina.jpeg"
        alt="Fondo de mármol Marquina"
        fill
        className="object-cover"
        quality={100}
        priority
      />
      <div className="relative z-10 pt-20 min-h-screen bg-black bg-opacity-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-5xl font-light text-center mb-6 text-white">CATÁLOGO</h1>
          <p className="text-center mb-8 text-gray-200">
            Recorré nuestro catálogo y disfruta de la amplia gama de productos que tenemos disponibles.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-black border-white border-2 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h2 className="text-lg font-semibold mb-2 text-white">{product.name}</h2>
                    <p className="text-sm text-gray-200">{product.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <SponsorCarouselBlack/>
      </div>
    </div>
  )
}