import { Suspense } from 'react';
import './globals.css';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './components/Nav';
import Loading from './loading';
const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'Prueba Frontend Hackathon Jump2Digital',
  description: 'Generated by Gloria',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <container className="min-h-screen">
          <Link href="/personatges/1"><div className="flex w-full justify-center my-5">
            <img src="/rick_and_morty.png" alt="Logo Rick and Morty"
              width={213.33} height={65}
              className="w-8/12 sm:w-5/12 max-w-sm mt-2 mb-4" /></div>
          </Link>

          <div className='text-center flex justify-center divide-y '>
            <h1 className='font-black text-2xl md:text-5xl bg-clip-text bg-gradient-to-r from-blue-300 via-green-500 to-white-500 text-transparent mx-7 '><hr className=' border border-blue-300 border-opacity-40 ' /> &nbsp; els personatges &nbsp; <hr className=' mt-1 md:mt-2 border border-lime-500 border-opacity-30' /></h1>
          </div>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </container >
      </body>
    </html>
  )
}
