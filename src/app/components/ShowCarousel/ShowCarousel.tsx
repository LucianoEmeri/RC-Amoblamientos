'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Carousel from '../Carousel/Carousel'
import Image1 from '../../../../public/assets/vestidor.jpg'
import Image2 from '../../../../public/assets/mesada.jpg'
import Image3 from '../../../../public/assets/cocina.jpg'

const ShowCarousel = () => {
  const pathname = usePathname()

  const validPaths = ['/']

  if (!validPaths.includes(pathname)) {
    return null
  }

  return (
    <Carousel 
      images={[
        { 
          id: 1, 
          image: Image3.src, 
          href: "/cocinas", 
          description1: "Diseños modernos y funcionales.", 
          description2: "Crea la cocina de tus sueños con materiales de alta calidad.", 
          title: "Cocinas" 
        },
        
        { 
          id: 2, 
          image: Image2.src, 
          href: "/mesadas", 
          description1: "Mesadas elegantes y duraderas.", 
          description2: "Encuentra la combinación perfecta de estilo y resistencia.", 
          title: "Mesadas" 
        },
        
        { 
          id: 3, 
          image: Image1.src, 
          href: "/vestidores", 
          description1: "Espacios organizados y personalizados.", 
          description2: "Optimiza cada rincón con nuestros placares y vestidores a medida.", 
          title: "Placares / Vestidores" 
        }
      ]}
    />
  )
}

export default ShowCarousel