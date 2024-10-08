"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRightIcon, XIcon } from 'lucide-react'

const images = {
  amoblamientos: {
    main: '/assets/showroom.jpg',
    additional: [
      '/assets/cocina4.jpg',
      '/assets/cocina2.jpg',
      '/assets/cocina3.jpg',
      '/assets/amob1.jpg',
    ],
  },
  stone: {
    main: '/assets/mesada2.jpg',
    additional: [
      '/assets/mesada3.jpg',
      '/assets/mesada6.jpg',
      '/assets/mesada5.jpg',
      '/assets/mesada4.jpg',
    ],
  },
}

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div ref={modalRef} className="relative w-full max-w-3xl">
        <div className="relative w-full">
          {children}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 text-white opacity-70 p-2"
            aria-label="Cerrar modal"
          >
            <XIcon size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<'amoblamientos' | 'stone' | null>(null)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const aboutRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1
      }
    )

    const currentRef = aboutRef.current;

    if (currentRef) {
      observer.observe(currentRef)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSectionClick = (section: 'amoblamientos' | 'stone') => {
    setActiveSection(section === activeSection ? null : section)
  }

  const handleImageClick = (e: React.MouseEvent, src: string) => {
    e.stopPropagation()
    setModalImage(src)
  }

  const renderSection = (section: 'amoblamientos' | 'stone') => {
    const isActive = activeSection === section
    const title = section === 'amoblamientos' ? 'RC AMOBLAMIENTOS' : 'RC STONE'
    const description = section === 'amoblamientos'
      ? 'Somos una empresa familiar, dedicada a la fabricación de muebles de cocina, placares y vestidores con la mejor calidad del mercado.'
      : 'Desde 2013 incursionamos en el mundo de la marmolería, elaborando mesadas en granitos naturales, Silestone y Neolith.'
    const fullDescription = section === 'amoblamientos'
      ? 'Diseñamos y fabricamos muebles de cocina, placares y vestidores con la más alta calidad y tecnología de vanguardia. Nuestro compromiso es crear espacios funcionales y estéticamente atractivos que se adapten perfectamente a las necesidades de nuestros clientes.'
      : 'Ofrecemos una amplia gama de mesadas en granitos naturales, Silestone y Neolith, combinando diseño y calidad superior. Nuestras soluciones en piedra natural y artificial transforman cualquier espacio en una obra de arte duradera y funcional.'

    return (
      <motion.div
        className="w-full lg:w-1/2 bg-black bg-opacity-60 rounded-xl shadow-2xl overflow-hidden cursor-pointer relative group"
        onClick={() => handleSectionClick(section)}
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/9] lg:aspect-auto lg:h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10" />
              <Image
                src={images[section].main}
                alt={title}
                layout="fill"
                objectFit="cover"
                className={`transition-all duration-300 transform ${isMobile ? '' : 'group-hover:scale-110'}`}
              />
              <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  whileHover={{ y: 0 }}
                  className={`space-y-2 sm:space-y-4 transition-all duration-300 ${isMobile ? '' : 'group-hover:-translate-y-20'}`}
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className={`text-gray-300 text-base sm:text-lg leading-relaxed ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                    {description}
                  </p>
                </motion.div>
                <div className="flex items-center text-white mt-2 sm:mt-4">
                  <span className="mr-2 text-sm sm:text-base">Ver más</span>
                  <ChevronRightIcon size={20} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6 flex flex-col bg-transparent h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white pr-8">
                  {title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveSection(null)
                  }}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Cerrar"
                >
                  <XIcon size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                {images[section].additional.map((src, index) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
                    onClick={(e) => handleImageClick(e, src)}
                  >
                    <Image
                      src={src}
                      alt={`${title} imagen ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {fullDescription}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative py-12 sm:py-16 bg-transparent text-white overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/background1.jpeg"
          alt="Fondo"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-20"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container mx-auto px-4 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-8 sm:mb-16 tracking-tight">SOBRE NOSOTROS</h2>
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:h-[750px]">
          {renderSection('amoblamientos')}
          {renderSection('stone')}
        </div>
      </motion.div>
      <Modal isOpen={!!modalImage} onClose={() => setModalImage(null)}>
        {modalImage && (
          <Image
            src={modalImage}
            alt="Imagen en tamaño completo"
            layout="responsive"
            width={1200}
            height={800}
            className="rounded-lg"
          />
        )}
      </Modal>
    </section>
  )
}