"use client"

import React, { useContext, useEffect, useState } from "react";
import { FlagIcon, CurrencyDollarIcon, Square3Stack3DIcon, CalendarDaysIcon, TruckIcon } from '@heroicons/react/20/solid';
import Navbar from "../components/navbar";
import Details from "../components/request-details";
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import withAuth from "../context/withAuth";
import { db } from "../config/firebase";
import { AuthContext } from "../context/authContext";
import LoadingIndicator from "../components/alerts/loading-indicator";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Boxes } from "../components/ui/background-boxes";
import TranslateComponent from "../components/translate-comp";


const OrderCards = () => {

  const { currentUser } = useContext(AuthContext);
  const [sourcingRequestsList, setSourcingRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const getSourcingRequestsList = async () => {
      if (currentUser) {
        const sourcingRequestsCollectionRef = collection(db, "product_request_forms");
        const q = query(sourcingRequestsCollectionRef, where("userId", "==", currentUser.uid), where("status", "in", ["Processing", "Unpaid"]));

        try {
          const querySnapshot = await getDocs(q);
          const requests = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const shippingType = data.airFreight ? 'Express Shipping' : 'Normal Shipping';

            let formCreationDate;
            if (data.formCreationDate && data.formCreationDate.toDate) {
              formCreationDate = data.formCreationDate.toDate();
            } else if (data.formCreationDate) {
              formCreationDate = new Date(data.formCreationDate);
            }
            return { id: doc.id, ...data, shippingType, formCreationDate };
          });

          requests.sort((a, b) => b.formCreationDate - a.formCreationDate);

          setSourcingRequestsList(requests);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getSourcingRequestsList();
  }, [currentUser]); // Depend on currentUser to re-fetch when it changes


  if (isLoading) {
    return <LoadingIndicator />
  }


  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
        <div className="fixed inset-0 w-full h-full bg-gray-100 z-20 pointer-events-none" style={{
          maskImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 5%, rgba(255,255,255,1) 95%)'
        }} />
        <Boxes />
        <Navbar className='relative z-30' />

        <div className=" py-10 sm:py-14">
          <div className="mx-auto sm:text-center max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl relative z-20">
                <TranslateComponent text="Your Sourcing Requests" />
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 relative z-20">
                <TranslateComponent text="After submitting your request, receive our confirmation within 24h then you can handle payments. Click Get Quotation to
                see more information." />
              </p>
            </div>

            {/* Conditional rendering to display a message if there are no items or render the list of items */}
            {sourcingRequestsList.length === 0 ? (
              <p className="mt-10 text-2xl leading-8 text-gray-900 relative z-20">
                <TranslateComponent text="No sourcing requests found !" />
              </p>
            ) : (
              sourcingRequestsList.map(item => (
                <div key={item.id} className="mx-auto relative z-20 mt-14 max-w-2xl flex flex-nowrap rounded-3xl shadow-lg bg-white ring-1 ring-gray-200 sm:mt-16 lg:mx-0 lg:flex items-center justify-center lg:max-w-none">
                  <div className="p-6 sm:p-8 lg:flex-auto">
                    <h3 className="text-2xl font-semibold tracking-tight text-gray-900"><b> <TranslateComponent text="Product name: " /></b> {item.productName}</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600 flex justify-center items-center">
                      <b> <TranslateComponent text="Date created:&nbsp; &nbsp; " /></b> {item.formCreationDate ? item.formCreationDate.toLocaleDateString('en-GB') : 'Unknown date'}
                      <CalendarDaysIcon className="h-6 w-5 ml-2 text-gray-500" />

                    </p>
                    <p className="mt-4 text-base leading-7 text-gray-600 flex justify-center items-center">
                      <p><b> <TranslateComponent text="Shipment: " /></b> {item.shippingType}</p>
                      {item.shippingType === 'Express Shipping' ? (
                        <RocketLaunchIcon className="h-6 w-5 ml-2 text-gray-500" />
                      ) : (
                        <TruckIcon className="h-6 w-5 ml-2 text-gray-500" />
                      )}
                    </p>
                    <div className="mt-10 flex items-center gap-x-4">
                      <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600"> <TranslateComponent text="Informations" /></h4>
                      <div className="h-px flex-auto bg-gray-100" />
                    </div>
                    <ul
                      role="list"
                      className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                      {item.destinations.map((destination, index) => (
                        <li key={index} className="flex flex-col gap-y-2">
                          <div className="flex gap-x-3 items-center">
                            <FlagIcon className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                            <span><b> <TranslateComponent text="Country:" /></b> {destination.country}</span>
                          </div>
                          <div className="flex gap-x-3 items-center">
                            <Square3Stack3DIcon className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                            <span><b> <TranslateComponent text="Quantity:" /></b> {destination.quantity}</span>
                          </div>
                          <div className="flex gap-x-3 items-center">
                            <CurrencyDollarIcon className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                            <span><b> <TranslateComponent text="Service:" /></b> {destination.service}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </div>
                  <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                    <div className="rounded-2xl bg-gray-50 py-4 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-4">
                      <div className="mx-auto max-w-xs px-4">
                        <p className="text-gray-600 text-base font-semibold mb-4 mt-2 md:mt-3"> <TranslateComponent text="Reference:" /> {item.id}</p>
                        <div
                          className={`px-2 py-1 mt-4 mb-4 rounded-full text-center text-white font-semibold text-xs md:text-sm 
                        ${item.status === "Paid"
                              ? "bg-green-400"
                              : item.status === "Processing"
                                ? "bg-gray-400"
                                : item.status === "Unpaid"
                                  ? "bg-red-400"
                                  : item.status === "Shipped"
                                    ? "bg-blue-400"
                                    : item.status === "Arrived"
                                      ? "bg-green-700"
                                      : "bg-gray-500"
                            }`}
                        >
                          <TranslateComponent text={item.status} />
                        </div>
                        {/* Set a fixed size for the image container */}
                        <div className="w-48 h-48 overflow-hidden inline-block">
                          <img
                            src={item.productImageUrl}
                            alt="Product"
                            className="object-cover rounded-lg transition-opacity duration-300 w-full h-full"
                          />
                        </div>
                        <Details status={item.status} orderId={item.id} />

                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(OrderCards);


