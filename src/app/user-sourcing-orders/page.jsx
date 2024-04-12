"use client"

import React, { useEffect, useState } from 'react'
import SourcingOrders from './sourcing-orders'
import withAuth from '../context/withAuth'
import Navbar from '../components/navbar'
import LoadingIndicator from '../components/alerts/loading-indicator'
import Footer from '../components/footer'

function Handling() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <div className='relative'>

      <div className=" h-[60rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative ">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex  dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-700 ">
          <Navbar />

          <div className="flex justify-center items-center gap-4 py-8">
            <SourcingOrders />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withAuth(Handling);