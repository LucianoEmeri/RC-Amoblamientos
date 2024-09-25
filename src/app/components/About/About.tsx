"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRightIcon, XIcon } from 'lucide-react'

const images = {
  amoblamientos: [
    '/assets/showroom.jpg',
    '/assets/showroom.jpg',
    '/assets/showroom.jpg',
    '/assets/showroom.jpg',
  ],
  stone: [
    '/assets/mesada2.jpg',
    '/assets/mesada2.jpg',
    '/assets/mesada2.jpg',
    '/assets/mesada2.jpg',
  ],
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
            aria-label="Close modal"
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

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
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
        className="lg:w-1/2 bg-black bg-opacity-60 rounded-xl shadow-2xl overflow-hidden cursor-pointer relative group"
        onClick={() => handleSectionClick(section)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        style={{ height: '650px' }}
      >
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10" />
              <Image
                src={images[section][0]}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  whileHover={{ y: 0 }}
                  className="space-y-4 transition-all duration-300 group-hover:-translate-y-20"
                >
                  <h3 className="text-3xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {description}
                  </p>
                </motion.div>
                <div className="flex items-center text-white mt-4">
                  <span className="mr-2">Ver más</span>
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
              className="p-6 h-full flex flex-col bg-transparent"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold text-white">{title}</h3>
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
              <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                {images[section].map((src, index) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
                    onClick={(e) => handleImageClick(e, src)}
                  >
                    <Image
                      src={src}
                      alt={`${title} image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mt-auto">
                {fullDescription}
              </p>
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
      className="relative py-24 bg-transparent text-white overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/marquina.jpeg"
          alt="Background"
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
        <h2 className="text-5xl font-normal text-center mb-16 tracking-tight">SOBRE NOSOTROS</h2>
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
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