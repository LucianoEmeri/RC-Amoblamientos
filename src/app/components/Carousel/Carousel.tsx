"use client"

import { useState, useCallback, useEffect } from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from 'framer-motion'

interface ICarouselImageProps {
  id: number
  image: string
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
      className="relative w-full"
      data-carousel="slide">
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
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
              priority={index === 0}
            />

            <AnimatePresence mode="wait">
              {index === activeIndex && (
                <motion.div
                  className="absolute inset-y-0 left-0 flex flex-col justify-center text-white p-6 md:p-12 w-full md:w-2/3 lg:w-1/2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  key={index}
                >
                  <motion.p 
                    className={`font-bold text-xs md:text-sm uppercase ${textShadowClass}`}
                    variants={itemVariants}
                  >
                    {img.title}
                  </motion.p>
                  <motion.p 
                    className={`text-2xl md:text-4xl font-bold mt-2 ${textShadowClass}`}
                    variants={itemVariants}
                  >
                    {img.description1}
                  </motion.p>
                  <motion.p 
                    className={`text-xl md:text-3xl mt-2 leading-none ${textShadowClass}`}
                    variants={itemVariants}
                  >
                    {img.description2}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="absolute z-40 flex justify-center space-x-2 -translate-x-1/2 bottom-5 left-1/2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-opacity-50 ${
              index === activeIndex ? 'bg-gray-500' : 'bg-gray-800'
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute left-4 bottom-5 z-40 flex items-center justify-center w-10 h-10 focus:outline-none"
        data-carousel-prev
        onClick={handlePrevClick}
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4 text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
      <button
        type="button"
        className="absolute right-4 bottom-5 z-40 flex items-center justify-center w-10 h-10 focus:outline-none"
        data-carousel-next
        onClick={handleNextClick}
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4 text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  )
}