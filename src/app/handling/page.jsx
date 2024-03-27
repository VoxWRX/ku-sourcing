import React from "react";
import { FlagIcon, CurrencyDollarIcon, Square3Stack3DIcon, CalendarDaysIcon } from '@heroicons/react/20/solid'
import Navbar from "../components/navbar";
import Details from "../components/request-details";


const data = [
  {
    id: 1,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Maroc",
    product: "Shampoo",
    reference:
      "BM3245",
    price: "800$",
    quantity: "200",
    status: "Processing",
    dateCreated: "2024-01-01T00:00:00",
  },
  {
    id: 2,
    photo:
      "https://images.unsplash.com/photo-1683009426952-13567b4fa28b?q=80&w=1619&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Niger",
    product: "Shampoo",
    reference:
      "BM323345",
    price: "1000$",
    quantity: "300",
    status: "Paid",
    dateCreated: "2023-01-01T00:00:00",

  },
  {
    id: 3,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Senegal",
    product: "Shampoo",
    reference:
      "BM30245",
    price: "500$",
    quantity: "1200",
    status: "Paid",
    dateCreated: "2021-01-01T00:00:00",

  },
  {
    id: 4,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Coté d'ivoire",
    product: "Shampoo",
    reference:
      "BM3232445",
      price: "500$",
    quantity: "1382",
    status: "Unpaid",
    dateCreated: "2023-01-01T00:00:00",

  },
  {
    id: 5,
    photo:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    country: "Coté d'ivoire",
    product: "Shampoo",
    reference:
      "BM323212445",
      price: "5000$",
    quantity: "1382",
    status: "Pending confirmation",
    dateCreated: "2023-01-01T00:00:00",

  },
];
const OrderCards = () => {
    return (
      <>
      <Navbar />
      <div className="bg-transparent py-10 sm:py-14">
      <div className="mx-auto sm:text-center max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Sourcing Requests</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          After submitting your request, receive our confirmation within 24h then you can handle payments. Click Get Details to 
          see more informations.
          </p>
        </div>

        {data.map(item => (
           <div key={item.id} className="mx-auto mt-14 max-w-2xl rounded-3xl shadow-lg bg-white ring-1 ring-gray-200 sm:mt-16 lg:mx-0 lg:flex items-center justify-center lg:max-w-none">
           <div className="p-6 sm:p-8 lg:flex-auto">
             <h3 className="text-2xl font-bold tracking-tight text-gray-900">Product name: {item.product}</h3>
             <p className="mt-6 text-base leading-7 text-gray-600 flex justify-center items-center">
               <b>Date created:&nbsp; &nbsp; </b> {item.dateCreated}
             <CalendarDaysIcon className="h-6 w-5 ml-2 text-gray-500" />
            </p>
             <div className="mt-10 flex items-center gap-x-4">
               <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">Informations</h4>
               <div className="h-px flex-auto bg-gray-100" />
             </div>
             <ul
               role="list"
               className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
             >
             
                   <li key={item} className="flex gap-x-3">
                   <FlagIcon className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                    <b>Country: </b> {item.country}
                 </li>     
                 <li key={item} className="flex gap-x-3">
                   <Square3Stack3DIcon className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                    <b>Quantity: </b> {item.quantity}
                 </li>  
                 <li key={item} className="flex gap-x-3">
                   <CurrencyDollarIcon className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                    <b>Price: </b> {item.price}
                 </li>             
         
             </ul>
           </div>
 
           <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
             <div className="rounded-2xl bg-gray-50 py-4 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-4">
               <div className="mx-auto max-w-xs px-4">
                 <p className="text-gray-600 text-base font-semibold mb-4 mt-2 md:mt-3">Reference: {item.reference}</p>
                 <div className="md:w-48 h-48 md:h-auto">
               <img
                  src={item.photo}
                  alt=""
                  className="object-cover rounded-lg transition-opacity duration-300 w-full h-full"
                  style={{width: '100%', height: '100%'}}
              />
                </div>
               
                 <Details products={item.id}/>

                 <div
                className={`px-2 py-1 mt-4 rounded-full text-center text-white font-semibold text-xs md:text-sm ${
                  item.status === "Paid"
                    ? "bg-green-400"
                    : item.status === "Processing"
                    ? "bg-blue-400"
                    : item.status === "Unpaid"
                    ? "bg-red-400"
                    : "bg-blue-300"
                }`}
              >
                {item.status}
              </div>
               </div>
             </div>
           </div>
           </div>
       
        ))}

       </div>
     </div>

      </>
    );
  };
  
  export default OrderCards;
  


