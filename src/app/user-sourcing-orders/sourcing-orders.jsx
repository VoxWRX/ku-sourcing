"use client"

import { TruckIcon, CheckBadgeIcon, ClipboardDocumentListIcon, ExclamationTriangleIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect, useContext } from 'react';
import withAuth from '../context/withAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { format } from 'date-fns';
import { GoXCircleFill } from "react-icons/go";
import { BiLoaderCircle } from "react-icons/bi";
import TranslateComponent from '../components/translate-comp';


function SourcingOrders() {
  const [isHovered, setIsHovered] = useState(false);
  const [orders, setOrders] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      const q = query(collection(db, "product_request_forms"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const ordersData = await Promise.all(querySnapshot.docs.map(async doc => {
        const imagesQuery = query(collection(db, "orderDeliveryProof"), where("orderId", "==", doc.id));
        const imageDocs = await getDocs(imagesQuery);
        const images = imageDocs.docs.map(doc => doc.data().imageUrl || null);
        return {
          ...doc.data(),
          id: doc.id,
          formCreationDate: doc.data().formCreationDate.toDate(),
          deliveryImages: images.length > 0 ? images : null
        };

      }));

      ordersData.sort((a, b) => b.formCreationDate - a.formCreationDate);
      setOrders(ordersData);
    };

    fetchOrders();
  }, [currentUser]);

  function getStatusIcon(status) {
    switch (status) {
      case 'Paid':
        return <HandThumbUpIcon className='h-8 w-10 text-blue-500 justify-center' />;
      case 'Unpaid':
        return <ExclamationTriangleIcon className='h-8 w-10 text-red-500 justify-center' />;
      case 'Shipped':
        return <TruckIcon className='h-8 w-10 text-blue-500 justify-center' />;
      case 'Arrived':
        return <CheckBadgeIcon className='h-8 w-10 text-green-500 justify-center' />;
      case 'Processing':
      default:
        return <ClipboardDocumentListIcon className='h-8 w-10 text-gray-500 justify-center' />;
    }
  }

  function formatDate(date) {
    // if 'date' is a Firebase Timestamp object
    if (date && typeof date.toDate === 'function') {
      // Convert the Timestamp to a JavaScript Date object
      date = date.toDate();
    }

    try {
      //  'date' should be a JavaScript Date object, and we can format it
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', date, error);
      return 'Invalid date';
    }
  }

  const handleImageClick = (images) => {
    if (images && images.length > 0) {
      setExpandedImage(images[0]); // Assuming we want to expand the first image by default
    }
  };

  const closeExpandedImage = () => setExpandedImage(null);

  if (expandedImage) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="relative">
          <button onClick={closeExpandedImage} className="absolute top-0 right-0 p-2">
            <GoXCircleFill className="h-8 w-8 text-black" />
          </button>
          <img src={expandedImage} className="max-h-screen max-w-screen-xl rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mx-4 md:mx-8 lg:mx-10">
      {/* Table, visible only on larger screens */}
      <div className="hidden sm:block">
        <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Date Created" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Product Name" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Category" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Status" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Quantity" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Destination" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Service" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <TranslateComponent text="Delivery Package" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.id}
                className={`transition-transform duration-300 hover:bg-gray-50 ${isHovered === index ? 'scale-x-105' : ''}`}
                onMouseEnter={() => setIsHovered(index)} // Setting hovered row index on mouse enter
                onMouseLeave={() => setIsHovered(null)}   // Reseting hovered row index on mouse leave
              >
                <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                  <div className="text-sm text-gray-900">{formatDate(order.formCreationDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-normal text-xs md:text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 cursor-pointer" onClick={() => setExpandedImage(order.productImageUrl)}>
                      <img className="h-10 w-10 rounded-xl" src={order.productImageUrl} alt="kuaisourcing" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                  <div className="text-sm text-gray-900">{order.category}</div>
                  <div className="text-sm text-gray-500">
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                  <div className="text-sm text-gray-900 flex items-center">
                    {order.status}
                    {getStatusIcon(order.status)}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs md:text-sm">
                  <div className="text-sm text-gray-900">
                    {order.destinations.map((qnt, index) => (
                      <div key={index} className="whitespace-normal">
                        {qnt.quantity}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs md:text-sm">
                  <div className="text-sm text-gray-900">
                    {order.destinations.map((dest, index) => (
                      <div key={index} className="whitespace-normal">
                        {dest.country}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs md:text-sm">
                  <div className="text-sm text-gray-900">
                    {order.destinations.map((srv, index) => (
                      <div key={index} className="whitespace-normal">
                        {srv.service}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                  {order.deliveryImages ? (
                    <img className="h-10 w-10 rounded-xl cursor-pointer" src={order.deliveryImages[0]} alt="Delivery Proof" onClick={() => handleImageClick(order.deliveryImages)} />
                  ) : (
                    <BiLoaderCircle className='h-8 w-8 text-gray-500 justify-center' />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Cards, visible on smaller screens */}
      <div className="sm:hidden">
        {orders.map((order) => (
          <div key={order.id} className="p-4 bg-gray-50 shadow-md rounded-lg mb-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-xl" src={order.productImageUrl} alt="" />
              </div>
              <div className="text-sm font-medium text-gray-900">{order.productName}</div>
            </div>
            <div className="text-xs text-gray-800 mb-2">{`Category: ${order.category}`}</div>
            <div className="text-sm text-gray-800 mb-2">{`Status: ${order.status}`}</div>
            <div className="text-xs text-gray-800 mb-2">{`Quantity: ${order.destinations.map(qnt => qnt.quantity).join(', ')}`}</div>
            <div className="text-xs text-gray-800 mb-2">{`Destination: ${order.destinations.map(dest => dest.country).join(', ')}`}</div>
            <div className="text-xs text-gray-800 mb-2">{`Service: ${order.destinations.map(srv => srv.service).join(', ')}`}</div>
            <div className="text-xs text-gray-800">{`Date Created: ${formatDate(order.formCreationDate)}`}</div>
            <div className="text-sm text-gray-800 mb-2">{order.deliveryImages ? (
              <img className="h-5 w-5 rounded-xl cursor-pointer" src={order.deliveryImages[0]} alt="Delivery Proof" onClick={() => handleImageClick(order.deliveryImages)} />
            ) : (
              <BiLoaderCircle className='h-5 w-5 text-gray-500 justify-center' />
            )}</div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(SourcingOrders);