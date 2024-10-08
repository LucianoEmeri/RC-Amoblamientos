'use client'

import React, { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRightCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import Swal from 'sweetalert2'
import Image from 'next/image'

const LocationMap = dynamic(() => import('../Location/LocationMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-64 bg-black animate-pulse"></div>
})

interface FormDetails {
  name: string
  email: string
  message: string
}

const formInitialDetails: FormDetails = {
  name: "",
  email: "",
  message: "",
}

const textShadowClass = "drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"

export default function Component() {
  const [formDetails, setFormDetails] = useState<FormDetails>(formInitialDetails)
  const [buttonText, setButtonText] = useState("ENVIAR")
  const [status, setStatus] = useState({ success: false, message: "" })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const onFormUpdate = (category: keyof FormDetails, value: string) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setButtonText("Enviando...")

    try {
      const response = await fetch("https://formspree.io/f/xkgwldvl", {
        method: "POST",
        body: JSON.stringify(formDetails),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const result = await response.json()

      setFormDetails(formInitialDetails)
      setButtonText("Enviar")

      if (response.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Mensaje enviado con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ffffff',
          color: '#000000',
          backdrop: `
            rgba(255,255,255,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
        setStatus({ success: true, message: "" })
      } else {
        throw new Error(result.error || "Algo salió mal")
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setStatus({ success: false, message: "Algo salió mal, por favor intenta de nuevo más tarde." })
    }
  }

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/background1.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 bg-black bg-opacity-70 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-normal mb-8 sm:mb-12 lg:mb-16 text-center text-white ${textShadowClass}`}>CONTÁCTANOS</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden bg-black bg-opacity-80 border-2 border-opacity-50 border-white p-4 sm:p-6 rounded-lg shadow-lg"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assets/background1.jpeg"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="rotate-180 opacity-10"
                  quality={100}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal mb-6 sm:mb-8 text-white text-center">NUESTROS LOCALES</h3>
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div className="space-y-3">
                    <p className="flex items-start text-white text-sm sm:text-base lg:text-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="flex-1">
                        <a href="https://maps.app.goo.gl/TLjsV48sW3iMphHx8" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Jujuy 185, Cerrito
                        </a>
                        <br />
                        <a href="https://maps.app.goo.gl/rknbSm6X1fGF2c62A" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Av. Francisco Ramírez 1600, Paraná
                        </a>
                      </span>
                    </p>
                  </div>
                  <p className="flex items-center text-white text-sm sm:text-base lg:text-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:rcamoblamientos.ventas@gmail.com" className="hover:underline break-all">
                      rcamoblamientos.ventas@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center text-white text-sm sm:text-base lg:text-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+543434890020" className="hover:underline">0343 4890 020</a>
                  </p>
                </div>
                <div className="w-full mt-6 sm:mt-8">
                  <LocationMap />
                </div>
              </div>
            </motion.div>

            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden bg-black bg-opacity-80 border-2 border-opacity-50 border-white p-4 sm:p-6 rounded-lg shadow-lg"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assets/background1.jpeg"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="rotate-180 opacity-10"
                  quality={100}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal mb-6 sm:mb-8 text-white text-center">TU CONSULTA</h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm sm:text-base lg:text-lg font-medium text-white mb-2">Nombre:</label>
                    <input
                      id="name"
                      type="text"
                      value={formDetails.name}
                      onChange={(e) => onFormUpdate("name", e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black bg-opacity-20 border border-opacity-50 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-400 text-sm sm:text-base lg:text-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm sm:text-base lg:text-lg font-medium text-white mb-2">Email:</label>
                    <input
                      id="email"
                      type="email"
                      value={formDetails.email}
                      onChange={(e) => onFormUpdate("email", e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black bg-opacity-20 border border-opacity-50 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-400 text-sm sm:text-base lg:text-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm sm:text-base lg:text-lg font-medium text-white mb-2">Mensaje:</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formDetails.message}
                      onChange={(e) => onFormUpdate("message", e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black bg-opacity-20 border border-opacity-50 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-400 text-sm sm:text-base lg:text-lg"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="group inline-flex items-center justify-center w-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg lg:text-xl font-semibold rounded-full bg-white text-black border border-opacity-50 border-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                  >
                    <span className="inline-flex items-center">
                      <span className="relative overflow-hidden mr-2 sm:mr-3">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                          {buttonText}
                        </span>
                        <span className="absolute top-full left-0 inline-block transition-transform duration-500 group-hover:-translate-y-full">
                          {buttonText}
                        </span>
                      </span>
                      <ArrowRightCircle className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
                    </span>
                  </motion.button>
                </form>
                {status.message && (
                  <p className={`mt-4 sm:mt-6 text-center text-sm sm:text-base lg:text-lg ${status.success ? "text-white" : "text-red-400"}`}>
                    {status.message}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}