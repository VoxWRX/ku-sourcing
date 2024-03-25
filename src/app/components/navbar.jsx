"use client"

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { IoLogoWhatsapp } from "react-icons/io";
import { FcTimeline } from "react-icons/fc";
import { FaSitemap, FaCartFlatbed } from "react-icons/fa6";
import { MdSpaceDashboard, MdAdminPanelSettings } from "react-icons/md";
import Link from 'next/link';


import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'


const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header>
      <nav className="relative flex max-w-full items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Kuai Sourcing</span>
            <img className= "w-14 mx-6" src="/kuai-logo.svg" alt="kuai-sourcing" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
        <a data-aos="fade-up" data-aos-duration="1200"
            href="/"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
              <MdSpaceDashboard className="text-xl text-blue-400"/>
            <p>Dashboard</p>
          </a>
          <Link href="/sourcing-requests"
           data-aos="fade-up" data-aos-duration="1200"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
              <FaCartFlatbed className="text-xl text-blue-500"/>
            <p>Simple Sourcing Requests</p>
          
          </Link>

          <a data-aos="fade-up" data-aos-duration="1200"
        href="/handling"
        className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
            <FaSitemap className="text-xl text-blue-500"/>
            <p>Handling</p>
          </a>

          <a data-aos="fade-up" data-aos-duration="1200"
        href="/sourcing-orders"
        className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
            <FcTimeline className="text-xl"/>
           <p>Sourcing Orders</p> 
          </a>

          <a data-aos="fade-up" data-aos-duration="1200"
            href="https://wa.me/+447466068298?text=Hello%20there!"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer"
          >
            <IoLogoWhatsapp className="text-xl text-green-600" />
            <p>WhatsApp</p>
          </a>

        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:scale-125 duration-150 cursor-pointer">
          <MdAdminPanelSettings className="text-xl" />
            Admin <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>





      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" >
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Kuai Sourcing</span>
              <img
                className="h-8 w-auto"
                src="/kuai-logo.svg" alt="kuai-sourcing"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <a
                  href="#"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                    <MdSpaceDashboard className="text-2xl text-blue-400 my-2"/>
                  <p className='my-2'>Dashboard</p>
                </a>
                
                <a
                  href="#"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                    <FaCartFlatbed className="text-2xl text-blue-400 my-2"/>
                  <p className='my-2'>Simple Sourcing Requests</p>
                </a>

                <a
                  href="#"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                    <FaSitemap className="text-2xl text-blue-400 my-2"/>
                  <p className='my-2'>Handling</p>
                </a>

                <a
                  href="#"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                    <FcTimeline className="text-2xl text-blue-400 my-2"/>
                  <p className='my-2'>Sourcing Orders</p>
                </a>

                <a 
          data-aos="fade-up" data-aos-duration="1200"

            href="https://wa.me/+447466068298?text=Hello%20there!"
            className="-mx-3 text-gray-900 flex justify-between-left space-x-2 rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-50"
          >
            <IoLogoWhatsapp className="text-2xl text-green-600 my-2" />
            <p className='my-2'> WhatsApp</p>
          </a>
              </div>
            
              <div className="py-6">
              <a
                  href="#"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                    <MdAdminPanelSettings className="text-2xl text-gray-900 my-2"/>
                  <p className='my-2'>Admin</p>
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
