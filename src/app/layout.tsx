import type { Metadata } from "next";
import { Rubik } from 'next/font/google';
import "./globals.css";
import Navbar from './components/Navbar/Navbar';
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <WhatsAppButton phoneNumber="+5493435342578" message="Hola, estoy interesado en sus servicios." />
      </body>
    </html>
  );
}