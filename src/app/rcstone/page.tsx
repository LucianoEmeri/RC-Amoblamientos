'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react'
import { products, categories, Category, Product as ImportedProduct } from './products'

const ITEMS_PER_PAGE = 12
const MAX_VISIBLE_PAGES = 5

interface DisplayProduct extends Omit<ImportedProduct, 'id'> {
  id: string | number;
}

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => 
        (selectedCategory === 'Todos' || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  }, [selectedCategory, searchTerm])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const displayProducts: DisplayProduct[] = [...paginatedProducts]
  while (displayProducts.length < ITEMS_PER_PAGE) {
    displayProducts.push({ id: `empty-${displayProducts.length}`, name: '', category: 'Todos', image: '' })
  }

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setIsCategoryMenuOpen(false)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2)
    let start = Math.max(1, currentPage - halfVisible)
    const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1)

    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1)
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null)
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Image
          src="/assets/marquina.jpeg"
          alt="Fondo de mármol Marquina"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 pt-16 sm:pt-20 min-h-screen bg-black bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-center my-4 sm:my-6 text-white">CATÁLOGO</h1>
          <p className="text-center text-base sm:text-lg mb-6 sm:mb-8 text-gray-200 px-4">
            Recorré nuestro catálogo y disfruta de la amplia gama de materiales que tenemos disponibles para tu mesada.
          </p>

          <div className="mb-6 sm:mb-8 flex flex-col items-center space-y-4">
            <div className="relative w-full max-w-5xl">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-black bg-opacity-70 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-base sm:text-lg"
              />
              <Search className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="w-full max-w-5xl">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="w-full px-4 py-3 bg-black bg-opacity-70 text-white rounded-full text-base sm:text-lg mb-2 sm:hidden"
              >
                {selectedCategory} ▼
              </button>
              <div className={`sm:block ${isCategoryMenuOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-white text-black'
                          : 'bg-black bg-opacity-70 text-white hover:bg-opacity-75'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.map((product) => (
              <div 
                key={product.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${product.name ? 'cursor-pointer' : 'opacity-0'}`}
                onClick={() => product.name && setSelectedImage(product.image || '/placeholder.png')}
              >
                <div className="relative">
                  {product.name && (
                    <Image
                      src={product.image || '/placeholder.png'}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                    />
                  )}
                  {product.name && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-4">
                      <h2 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-white">{product.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-200">{product.category}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-white mt-8">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 sm:p-2 rounded-full bg-black text-white hover:bg-gray-200 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${
                    currentPage === page
                      ? 'bg-white text-black'
                      : 'bg-black bg-opacity-50 text-white hover:bg-gray-200 hover:text-black'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 sm:p-2 rounded-full bg-black text-white hover:bg-gray-200 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div className="relative max-w-2xl max-h-[80vh] w-full">
            <Image
              src={selectedImage}
              alt="Selected product"
              width={600}
              height={600}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-white"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}