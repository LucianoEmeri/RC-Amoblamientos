'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function WhatsAppButton({ phoneNumber = "+5493435342578", message = "Hola, estoy interesado en sus servicios." }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-4 right-4 bg-white hover:bg-black rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 z-50 group"
      aria-label="Abrir chat de WhatsApp"
    >
      <div className="relative w-7 h-7">
        <Image
          src="/assets/whatsapp.svg"
          alt="WhatsApp Icon"
          layout="fill"
          className="transition-all duration-300 group-hover:filter group-hover:invert"
        />
      </div>
    </button>
  );
}