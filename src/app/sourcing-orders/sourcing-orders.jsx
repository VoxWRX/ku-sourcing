"use client"

import { FaEllipsisV } from 'react-icons/fa'; 
import { TruckIcon, CheckBadgeIcon, ClipboardDocumentListIcon, BanknotesIcon } from '@heroicons/react/20/solid';
import { useState } from 'react'; 

const products = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      id: 1,
      destination: 'Maroc',
      quantity: 200,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Paid',
      icon: <BanknotesIcon className='h-8 w-10 text-blue-500 justify-center'/>,
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      id: 2,
      destination: 'Maroc',
      quantity: 200,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1617350142147-7403b8fb9889?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        status: 'Shipped',
        icon: <TruckIcon className='h-8 w-10 text-blue-600 justify-center'/>,
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      id: 3,
      destination: 'Maroc',
      quantity: 100,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        status: 'Shipped',
        icon: <TruckIcon className='h-8 w-10 text-blue-600 justify-center'/>,

    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      id: 4,
      destination: 'Maroc',
      quantity: 500,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1505740106531-4243f3831c78?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        status: 'Arrived',
        icon: <CheckBadgeIcon className='h-8 w-10 text-green-400 justify-center'/>,

    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      id: 5,
      destination: 'Benin',
      quantity: 1200,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1630080644615-0b157f1574ec?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        status: 'Paid',
        icon: <BanknotesIcon className='h-8 w-10 text-blue-500 justify-center'/>,

    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      id: 6,
      destination: 'Algérie',
      quantity: 300,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1617350142147-7403b8fb9889?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        status: 'Shipped',
        icon: <TruckIcon className='h-8 w-10 text-blue-600 justify-center'/>,

    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        id: 7,
        destination: 'Maroc',
        quantity: 100,
        dateCreated: '2023-01-23T13:23Z',
        imageUrl:
          'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          status: 'Processing',
          icon: <ClipboardDocumentListIcon className='h-8 w-10 text-blue-400 justify-center'/>,

      },
      {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        id: 8,
        destination: 'Maroc',
        quantity: 500,
        dateCreated: '2023-01-23T13:23Z',
        imageUrl:
          'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          status: 'Processing',
          icon: <ClipboardDocumentListIcon className='h-8 w-10 text-blue-400 justify-center'/>,

      },
      {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        id: 9,
        destination: 'Benin',
        quantity: 1200,
        dateCreated: '2023-01-23T13:23Z',
        imageUrl:
          'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          status: 'Paid',
          icon: <BanknotesIcon className='h-8 w-10 text-blue-500 justify-center'/>,

      },
  ]
  
  export default function SourcingOrders() {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Options
            </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id} 
              className={`transition-transform duration-300 hover:bg-gray-50 ${isHovered === index ? 'scale-105' : ''}`}
              onMouseEnter={() => setIsHovered(index)} // Setting hovered row index on mouse enter
              onMouseLeave={() => setIsHovered(null)}   // Reseting hovered row index on mouse leave
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-xl" src={product.imageUrl} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.email}</div>
                  <div className="text-sm text-gray-500">
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.status}{product.icon}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.quantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.destination}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.dateCreated}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                <FaEllipsisV className="h-5 w-5" />
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  