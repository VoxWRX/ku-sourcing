import React from "react";
import { CheckIcon } from '@heroicons/react/20/solid'
import Navbar from "../components/navbar";

const includedFeatures = [
  'Private forum access',
  'Member resources',
  'Entry to annual conference',
  'Official member t-shirt',
]

const data = [
  {
    id: 1,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Maroc",
    product: "Shakti Nirvana",
    reference:
      "BM3245",
    price: "50 L",
    quantity: "1,382 sq.ft.",
    status: "Processing",
  },
  {
    id: 2,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Niger",
    product: "Shakti Nirvana",
    reference:
      "BM323345",
    price: "50 L",
    quantity: "1,382 sq.ft.",
    status: "Paid",

  },
  {
    id: 3,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Senegal",
    product: "Shakti Nirvana",
    reference:
      "BM30245",
    price: "50 L",
    quantity: "1,382 sq.ft.",
    status: "Paid",

  },
  {
    id: 4,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Coté d'ivoire",
    product: "Shakti Nirvana",
    reference:
      "BM3232445",
    quantity: "1,382 sq.ft.",
    status: "Paid",

  },
];
const OrderCards = () => {
    return (
      <>
      <Navbar />
     <div className="mx-auto mt-6 max-w-2xl rounded-3xl ring-1 ring-gray-200 shadow-lg sm:mt-20 lg:mx-12 lg:flex lg:max-w-none">
          <div className="p-6 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
              repellendus etur quidem assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-6 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-10">
              <div className="mx-auto max-w-xs px-6">
                <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get access
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      
      
      
      <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-auto flex flex-row space-x-4 px-4 py-6 mx-20 bg-white shadow-xl rounded-xl mb-6"
          >
            <div className="relative w-full md:w-48 h-48 md:h-auto ">
              <img
                src={item.photo}
                alt=""
                className=" object-cover rounded-lg transition-opacity duration-300"
              />
            </div>
            <div className="flex-grow">
              <div
                className={`px-2 py-1 rounded-full text-center text-white font-semibold text-xs md:text-sm ${
                  item.status === "Paid"
                    ? "bg-green-200"
                    : item.status === "Processing"
                    ? "bg-blue-200"
                    : "bg-red-200"
                }`}
              >
                {item.status}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-2 md:mt-3">
                {item.product}
              </h2>
              <p className="text-gray-600 mt-2 md:mt-3">{item.reference}</p>
              <table className="mt-4 w-full md:w-full"> {/* Apply w-full on larger screens */}
              <tbody>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Use grid on mobile */}
                 <tr className="border-b">
                <td className="text-gray-700 font-semibold text-sm md:text-base py-2">
                     country:
                 </td>
                 <td className="text-gray-700 font-semibold text-sm md:text-base py-2">
                   {item.country}
                 </td>
                </tr>
             <tr className="border-b">
              <td className="text-gray-700 font-semibold text-sm md:text-base py-2">
                   Price:
               </td>
               <td className="text-gray-700 font-semibold text-sm md:text-base py-2">
                   {`₹ ${item.price}`}
                  </td>
                 </tr>
                  <tr className="border-b">
                    <td className="text-gray-700 font-semibold text-sm md:text-base py-2">
                      quantity:
                    </td>
                    <td className="text-gray-700 font-semibold text-sm md:text-base py-2">
                      {item.quantity}
                    </td>
                  </tr>
                  </div>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="px-3 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded-xl font-semibold text-lg">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      </>
    );
  };
  
  export default OrderCards;
  


