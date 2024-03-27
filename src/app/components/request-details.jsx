"use client"

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    quantity: 100,
    unitPrice: '$ 15.23',
    commissionOfService: '$ 98.99',
    unitWeight: 'g 20.00',
    deliveryCostInChina: '$ 80.99',
    totalCost: '$ 950',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
  },
  
  // More products later...
]

const realImages = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
  },
]

const Details = ({ items }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
    <a
        href="#"
        className="mt-10 block w-full rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => setOpen(true)} // Open the dialog when the button is clicked
      >
        Get Details
      </a>

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Quotation</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col space-y-2">
                                  <div>
                                  <div className="border-t space-y-3 border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        {product.name}
                                      </h3>
                                    </div>

                                    <div className="flex flex-1 border-t space-y-3 items-end justify-between text-sm">
                                    <p className="text-gray-500">Quantity: </p>

                                    <div className="flex font-medium text-gray-700 ">
                                    {product.quantity}
                                    </div>
                                  </div>    

                                    <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Unit price: </p>

                                    <div className="flex font-medium text-gray-700 ">
                                    {product.unitPrice}
                                    </div>
                                  </div>                                    
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Unit weight: </p>

                                    <div className="flex font-medium text-gray-700">
                                    {product.unitWeight}
                                    </div>
                                  </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Commission of service: </p>

                                    <div className="flex font-medium text-gray-700">
                                    {product.commissionOfService}
                                    </div>
                                  </div>

                                    <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Delivery cost in china: </p>

                                    <div className="flex font-medium text-gray-700">
                                    {product.deliveryCostInChina}
                                    </div>
                                  </div>
                                  <div className="flex flex-1 border-t space-y-4 items-end justify-between text-sm">
                                    <p className="text-gray-500">Total: </p>

                                    <div className="flex font-medium text-gray-900">
                                    {product.totalCost}
                                    </div>
                                  </div>
                                  </div>
                                 
                                </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h2 className='text-lg text-gray-900 px-4 py-2 font-semibold'>Real Images</h2>
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-4">

          {realImages.map((image) => (
            <a key={image.id} href={image.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={image.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              </a>
          ))}
        </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Note</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Taxes are not included <a href='/https://wa.me/+447466068298?text=Hello%20What%20about%20taxes!' className='text-blue-400'>contact us</a> to learn more.</p>
                      <div className="mt-6">
                        <a
                          href="/payment"
                          className="flex items-center justify-center rounded-lg border border-transparent bg-blue-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500"
                        >
                          Proceed to payment
                        </a>
                      </div>
                     
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}

export default Details;
