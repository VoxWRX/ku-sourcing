"use client"

import { LinkIcon } from '@heroicons/react/20/solid'
import { SiWise } from "react-icons/si";
import { BsBank } from "react-icons/bs";
import Navbar from '../components/navbar'
import withAuth from '../context/withAuth';
import { useEffect, useState } from 'react';
import LoadingIndicator from '../components/alerts/loading-indicator';
import Footer from '../components/footer';

function Payments() {
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
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-6 my-8 bg-white shadow-lg rounded-lg">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Payment Information</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">You can make a payment using one of the account options listed below.<br />
            Then submit a confirmation of your payment.</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 flex items-center">
                Transfer Wise <SiWise className="ml-2" />
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button className='flex items-center justify-center rounded-lg border border-transparent bg-blue-400 px-4 py-2 text-base text-white shadow-sm hover:bg-blue-500'>
                  Account details</button></dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 flex items-center">
                Cih Bank <BsBank className="ml-2" />
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button className='flex items-center justify-center rounded-lg border border-transparent bg-blue-400 px-4 py-2 text-base text-white shadow-sm hover:bg-blue-500'>
                  Account details</button></dd>
            </div>


            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Proof of payment</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <LinkIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">image.jpeg</span>
                        <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default withAuth(Payments);