"use client"

import { useState, useCallback, useEffect } from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from 'framer-motion'

interface ICarouselImageProps {
  id: number
  image: string
  href: string
  description1: string
  description2: string
  title: string
}

interface ICarouselProps {
  images: ICarouselImageProps[]
}

export default function Carousel({ images }: ICarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleButtonClick = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handlePrevClick = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    )
  }, [images.length])

  const handleNextClick = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    )
  }, [images.length])

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextClick()
    }, 4000)

    return () => {
      clearInterval(timer)
    }
  }, [handleNextClick])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const textShadowClass = "drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"

  return (
    <div
      id="default-carousel"
      className="relative w-full hidden md:block"
      data-carousel="slide">
      <div className="relative h-[70vh] overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? 'opacity-100 z-40' : 'opacity-0'
            }`}
            data-carousel-item>
            <Image
              src={img.image}
              className="absolute block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
              width={1920}
              height={1080}
              quality={100}
            />

            <AnimatePresence mode="wait">
              {index === activeIndex && (
                <motion.div
                  className="absolute top-52 left-20 text-white p-6 rounded-lg"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  key={index}
                >
                  <motion.p 
                    className={`font-bold text-sm uppercase ${textShadowClass}`}
                    variants={itemVariants}
                  >
                    {img.title}
                  </motion.p>
                  <motion.p 
                    className={`text-4xl font-bold ${textShadowClass}`}
                    variants={itemVariants}
                  >
                    {img.description1}
                  </motion.p>
                  <motion.p 
                    className={`text-3xl mb-12 leading-none ${textShadowClass}`}
                    variants={itemVariants}
                  >
                    {img.description2}
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    {/* <a
                      href={img.href}
                      className="text-white bg-gradient-to-r from-black to-gray-800 hover:bg-gradient-to-l focus:outline-none py-4 px-8 font-bold uppercase text-sm rounded hover:bg-gray-200 hover:text-white inline-block transition duration-300 hover:scale-110">
                      VER MÁS
                    </a> */}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="absolute z-40 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`w-3 h-3 rounded-full bg-opacity-50 ${
              index === activeIndex ? 'bg-gray-500' : 'bg-gray-800'
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => handleButtonClick(index)}></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={handlePrevClick}>
        <span className="inline-flex items-center justify-center w-10 h-10 group-hover:bg-tertiary/50 group-focus:ring-0 group-focus:outline-none bg-transparent">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180 opacity-80"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={handleNextClick}>
        <span className="inline-flex items-center justify-center w-10 h-10 group-hover:bg-tertiary/50 group-focus:ring-0 group-focus:outline-none bg-transparent">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180 opacity-80"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}