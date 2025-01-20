"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen p-8 w-full font-poppins overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/background1.jpeg')" }}>
      <div className="relative z-10 container flex flex-col items-center">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h1 className="font-extrabold text-6xl md:text-9xl text-white drop-shadow-custom-dark animate__animated animate__fadeIn whitespace-nowrap">
            <span className="sr-only">Error</span> 404
          </h1>
          <p className="text-xl md:text-3xl text-white drop-shadow-custom-dark animate__animated animate__fadeIn animate__delay-1s whitespace-nowrap">
            No se encontró la página
          </p>
          <Link
            href="/"
            className="group inline-flex items-center justify-center px-4 sm:px-6 py-3 text-xl lg:text-2xl font-semibold rounded bg-gradient-to-r from-black to-white/50 text-white border border-white/50 hover:from-white/50 hover:to-black transition duration-300 animate__animated animate__fadeIn animate__delay-2s whitespace-nowrap"
          >
            <span className="inline-flex items-center">
              <ArrowLeftCircle
                className="mr-2 sm:mr-3 transition-transform duration-300 group-hover:-translate-x-1 flex-shrink-0"
                size={24}
              />
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full whitespace-nowrap">
                  Vuelve al inicio
                </span>
                <span className="absolute top-full left-0 inline-block transition-transform duration-500 group-hover:-translate-y-full whitespace-nowrap">
                  Vuelve al inicio
                </span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
