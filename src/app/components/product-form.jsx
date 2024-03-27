"use client"

import { PhotoIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Destinations from './destinations'
import { TypewriterEffectSourcing } from './writer-source'


const category = [
    {
      id: 1,
      name: 'Home & Garden, Fourniture',
      },
    {
      id: 2,
      name: 'Electronics',
      },
    {
      id: 3,
      name: 'Healthcare & Beauty',
      },
    {
      id: 4,
      name: 'Bags & Shoes',
     },
    {
      id: 5,
      name: 'Sports & Outdoors',
      },
    {
      id: 6,
      name: 'Pet Supplies',
      },
    {
      id: 7,
      name: 'Jewelry & Watches',
     },
    {
      id: 8,
      name: 'Other',
     },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function SourcingRequestForm() {
    const [selectedCategory, setSelectedCategory] = useState(category[3])

  return (
    <form>
      <div className="space-y-12">
                  <TypewriterEffectSourcing />
          <p className="text-sm leading-6 text-gray-600">
            All information with * below are required.
          </p>

          <div className="mt-10 container grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
            <div className="sm:col-span-4">
              <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-blue-500 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm ">kuaisourcing.com/</span>
                  <input
                    type="text"
                    name="product"
                    id="product"
                    autoComplete="product"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="name here..."
                  />
                </div>
              </div>
            </div>

    

            <div className="col-full max-w-xl">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500">
                Product Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md p-1 bg-white font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 max-w-xl">
              <label htmlFor="urlField" className="block text-sm font-medium leading-6 text-gray-900">
                Product URL
              </label>
              <div className="mt-2">
                <input
                  id="urlField"
                  name="urlField"
                  type="url"
                  autoComplete="urlField"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>


              <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      {({ open }) => (
        <>
          <Listbox.Label className="block mt-5 text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500">Category</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full mt-2 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selectedCategory.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {category.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-blue-400 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={category}
                  >
                    {({ selectedCategory, active }) => (
                      <>
                        <div className="flex items-center">
                          
                          <span
                            className={classNames(selectedCategory ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {category.name}
                          </span>
                        </div>

                        {selectedCategory ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-blue-500',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>

            </div>
        </div>

       

    <div className="border-b border-gray-900/10 pb-8"></div>


        <div className="border-b border-gray-900/10 pb-12 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500">Destination Country</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use an address where you can receive mail.</p>

            <Destinations />

          
          
        </div>

        <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Additional Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Extra details for specific orders.</p>
            </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base mt-4 font-semibold leading-7 text-gray-900">Shipping Methods</h2>

          <div className="mt-10 space-y-10">
            <fieldset>
             
              <div className="space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="air"
                      name="air"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="air" className="font-medium text-gray-900">
                      Air freight
                    </label>
                    <p className="text-gray-500">Estimated delivery time 15-20 working days.</p>
                  </div>
                </div>
                
                </div>
            </fieldset>
            
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href='/'>
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900 rounded-md ">
          Cancel
        </button>
        </a>
       
        <button
          type="submit"
          className="rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Request the product
        </button>
      </div>
    </form>
  )
}
