"use client"

import { FaEllipsisV } from 'react-icons/fa'; 
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
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Paid',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      id: 2,
      destination: 'Maroc',
      quantity: 200,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Processing',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      id: 3,
      destination: 'Maroc',
      quantity: 100,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Processing',
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      id: 4,
      destination: 'Maroc',
      quantity: 500,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Processing',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      id: 5,
      destination: 'Benin',
      quantity: 1200,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Paid',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      id: 6,
      destination: 'Algérie',
      quantity: 300,
      dateCreated: '2023-01-23T13:23Z',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'paid',
    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        id: 7,
        destination: 'Maroc',
        quantity: 100,
        dateCreated: '2023-01-23T13:23Z',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          status: 'Processing',
      },
      {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        id: 8,
        destination: 'Maroc',
        quantity: 500,
        dateCreated: '2023-01-23T13:23Z',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          status: 'Processing',
      },
      {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        id: 9,
        destination: 'Benin',
        quantity: 1200,
        dateCreated: '2023-01-23T13:23Z',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          status: 'Paid',
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
                  <div className="text-sm text-gray-900">{product.status}</div>
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
  