"use client"

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect, Fragment, useContext } from 'react';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import TranslateComponent from './translate-comp';


const Details = ({ status, orderId }) => {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const isOrderProcessing = status === 'Processing';
  const [orderDetails, setOrderDetails] = useState(null);
  const [quotationDetails, setQuotationDetails] = useState([]);
  const [realImages, setRealImages] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const fetchOrderDetails = async () => {
    // Fetching order details from the 'product_request_forms' collection
    const orderRef = doc(db, "product_request_forms", orderId);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      const orderData = orderSnap.data();
      setOrderDetails(orderData);

      // Update realImages state if present in orderData
      if (Array.isArray(orderData.realImages)) {
        setRealImages(orderData.realImages);
      } else {
        setRealImages([]); // realImages is an empty array if not present
      }

      // If the order has destinations, fetch the quotations for each
      if (Array.isArray(orderData.destinations) && orderData.destinations.length > 0) {
        const quotes = [];
        for (const destination of orderData.destinations) {
          console.log("Destination data:", destination); // To confirm the structure

          const q = query(collection(db, "quotation"),
            where("country", "==", destination.country), // The country as the unique identifier here
            where("orderId", "==", orderId));
          const querySnapshot = await getDocs(q);
          console.log("Quotations found:", querySnapshot.docs.length); // Debugging

          if (!querySnapshot.empty) {
            // Assuming each destination has only one quotation document
            const quotationDoc = querySnapshot.docs[0].data();
            quotes.push({ ...quotationDoc, destination: destination.country }); // Adding the destination country for reference
          }
        }
        setQuotationDetails(quotes);
      }
    } else {
      console.log("No such document!");
    }
  };

  // Fetch user data and check verification status
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setIsVerified(userData.isVerified || false); // Default to false if not set
        } else {
          console.error("No user document found!");
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  const handlePaymentClick = () => {
    if (isVerified) {
      window.location.href = '/user-payment';
    } else {
      window.location.href = '/confirm-identity';
    }
  };


  return (
    <>
      <a
        href="#"
        className={`mt-5 block w-full rounded-lg px-3 py-2 text-center text-sm font-semibold text-white shadow-sm 
        ${isOrderProcessing ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-400'} 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        onClick={(e) => {
          e.preventDefault();
          if (!isOrderProcessing) {
            setOpen(true);
            fetchOrderDetails();
          }
        }}
      >
        <TranslateComponent text="Get Quotation" />
      </a>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
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
                          <Dialog.Title className="text-lg mb-2 font-semibold text-gray-900"> <TranslateComponent text="Quotation Details" /></Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {quotationDetails ? (
                          quotationDetails.length > 0 && (
                            <div className="space-y-6">
                              {quotationDetails.map((quotation, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                  <h3 className="text-lg font-semibold text-gray-900"> <TranslateComponent text={`Quotation for ${quotation.destination}`} /></h3>
                                  <p className="text-sm font-bold text-gray-700"> <TranslateComponent text="Unit Price: $ " /><span className="font-normal">{quotation.unitPrice}</span></p>
                                  <p className="text-sm font-bold text-gray-700"> <TranslateComponent text="Commission of Service: $ " /><span className="font-normal">{quotation.commissionOfService}</span></p>
                                  <p className="text-sm font-bold text-gray-700"> <TranslateComponent text="Unit Weight: kg " /><span className="font-normal">{quotation.unitWeight}</span></p>
                                  <p className="text-sm font-bold text-gray-700"> <TranslateComponent text="Delivery Cost in China: $ " /><span className="font-normal">{quotation.deliveryCostInChina}</span></p>
                                  <p className="text-sm font-bold text-gray-700"> <TranslateComponent text="Total Cost: $ " /><span className="font-normal">{quotation.totalCost}</span></p>
                                </div>
                              ))}
                            </div>
                          )
                        ) : (
                          <p className="text-sm font-bold mt-4 text-gray-600"> <TranslateComponent text="No quotation details available yet." /></p>
                        )}

                        <h2 className='text-lg text-gray-900 px-4 py-2 font-semibold'> <TranslateComponent text="Real Images" /></h2>
                        <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-4">
                          {realImages.length > 0 ? (
                            realImages.map((imageSrc, index) => (
                              <div key={index} className="group">
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                                  <img src={imageSrc} alt={`Real Image ${index + 1}`} className="h-full w-full object-cover object-center group-hover:opacity-75" />
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 ml-4"> <TranslateComponent text="No real images available." /></p>
                          )}
                        </div>
                        <div className="mt-4 border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p> <TranslateComponent text="Note" /></p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            <TranslateComponent text="Taxes are not included" /> <a href='/https://wa.me/+8619301266421?text=Hello%20What%20about%20taxes!' className='text-blue-400 hover:text-blue-500'> <TranslateComponent text="contact us" /></a>  <TranslateComponent text="to learn more." />
                          </p>
                          <div className="mt-6">
                            <button
                              className="flex items-center justify-center rounded-lg border border-transparent bg-blue-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500"
                              onClick={handlePaymentClick}
                              disabled={isLoading}
                            >
                              <TranslateComponent text={isLoading ? 'Loading...' : 'Proceed to payment'} />
                            </button>
                          </div>
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
  );
};

export default Details;
