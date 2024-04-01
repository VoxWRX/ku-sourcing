"use client"

import { Fragment, useContext, useState } from 'react';
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { IoLogoWhatsapp } from "react-icons/io";
import { FcTimeline } from "react-icons/fc";
import { FaSitemap, FaCartFlatbed } from "react-icons/fa6";
import { MdSpaceDashboard, MdAdminPanelSettings } from "react-icons/md";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import withAuth from '../context/withAuth';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Navbar() {

  const { dispatch, currentUser } = useContext(AuthContext);

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" }); // Dispatch logout action
      console.log("logout clicked");
      window.location.href = '/login';
    } catch (error) {
      console.error(error.message);
    }
  };

  const userNavigation = [
    { name: currentUser ? currentUser.firstName : 'User' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', onClick: logOut },
  ]
  console.log(currentUser)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header>
      <nav className="relative flex max-w-full items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Kuai Sourcing</span>
            <img className="w-14 mx-6" src="/kuai-logo.svg" alt="kuai-sourcing" />
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
            href="/user-dashboard"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
            <MdSpaceDashboard className="text-xl text-blue-500" />
            <p>Dashboard</p>
          </a>

          <a href="/user-sourcing-requests"
            data-aos="fade-up" data-aos-duration="1200"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
            <FaCartFlatbed className="text-xl text-blue-500" />
            <p>Sourcing Requests</p>
          </a>

          <a data-aos="fade-up" data-aos-duration="1200"
            href="/user-handling"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
            <FaSitemap className="text-xl text-blue-500" />
            <p>Handling Requests</p>
          </a>

          <a data-aos="fade-up" data-aos-duration="1200"
            href="/user-sourcing-orders"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
            <FcTimeline className="text-xl" />
            <p>Sourcing Orders</p>
          </a>

          <a data-aos="fade-up" data-aos-duration="1200"
            href="https://wa.me/+447466068298?text=Hello%20there!"
            className="font-medium text-gray-900 flex justify-between-left space-x-2 hover:scale-125 duration-150 cursor-pointer">
            <IoLogoWhatsapp className="text-xl text-green-600" />
            <p>WhatsApp</p>
          </a>

        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* Profile dropdown */}
          <Menu as="div" className="relative mr-4 ml-3">
            <div>
              <Menu.Button className="relative flex hover:scale-125 duration-150 cursor-pointer max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src={currentUser && currentUser.photoURL ? currentUser.photoURL : "https://images.unsplash.com/photo-1503354531728-dedfa6cb4e8d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="kuai sourcing" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        onClick={item.onClick}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:scale-125 duration-150 cursor-pointer">
            <MdAdminPanelSettings className="text-xl" />
            Admin <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>





      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

        <Dialog.Panel className={`fixed inset-y-0 right-0 z-40 w-full bg-white px-6 py-6 sm:max-w-sm transform transition-transform ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} duration-300`}>
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
                  href="/user-dashboard"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                  <MdSpaceDashboard className="text-2xl text-blue-400 my-2" />
                  <p className='my-2'>Dashboard</p>
                </a>

                <a
                  href="/user-sourcing-requests"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                  <FaCartFlatbed className="text-2xl text-blue-400 my-2" />
                  <p className='my-2'>Sourcing Requests</p>
                </a>

                <a
                  href="/user-handling"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                  <FaSitemap className="text-2xl text-blue-400 my-2" />
                  <p className='my-2'>Handling Requests</p>
                </a>

                <a
                  href="/user-sourcing-orders"
                  className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                >
                  <FcTimeline className="text-2xl text-blue-400 my-2" />
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

              <Disclosure>
                <div className="py-6">
                  <div className="mt-3 space-y-1 px-2">
                    {/* User profile picture or default image */}
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={currentUser && currentUser.photoURL ? currentUser.photoURL : "https://images.unsplash.com/photo-1503354531728-dedfa6cb4e8d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="kuai sourcing"
                      />
                    </div>
                    {/* Navigation items */}
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={item.onClick}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="-mx-3 flex justify-between-left space-x-2  rounded-lg px-3 py-2 text-base font-semibold  text-gray-900 hover:bg-gray-50"
                  >
                    <MdAdminPanelSettings className="text-2xl text-gray-900 my-2" />
                    <p className='my-2'>Admin</p>
                  </a>
                </div>
              </Disclosure>

            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default withAuth(Navbar);
