import type { Metadata } from "next";
import { Rubik } from 'next/font/google';
import "./globals.css";
import Navbar from './components/Navbar/Navbar';
import { Footer } from "./components/Footer/Footer";
import WhatsAppButton from './components/Contact/whatsapp-button';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "RC Amoblamientos",
  description: "RC Amoblamientos - Diseño y fabricación de muebles modernos y futuristas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${rubik.variable} font-sans antialiased`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton phoneNumber="+5493435342578" message="Hola, estoy interesado en sus servicios." />
      </body>
    </html>
  );
}