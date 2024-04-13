"use client"

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useContext } from 'react';
import { LinkIcon } from '@heroicons/react/20/solid'
import { SiWise } from "react-icons/si";
import { BsBank } from "react-icons/bs";
import Navbar from '../components/navbar'
import withAuth from '../context/withAuth';
import LoadingIndicator from '../components/alerts/loading-indicator';
import Footer from '../components/footer';
import { BsBank2 } from "react-icons/bs";
import { AuthContext } from '../context/authContext';
import { db, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';


function Payments() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState({ name: '', details: [] });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const bankDetails = {
    'Transfer Wise': [
      'Account Number: 123456789',
      'SWIFT: TRWIUS33'
    ],
    'Cih Bank': [
      'Account Holder’s Name: Hamza Balakbiyech',
      'Bank Name: CIH BANK',
      'Account Number: 230330299677121101450088',
      'Swift Code: CIHMMAMC'
    ],
    'JPMorgan Chase': [
      'Bank Name: JPMorgan Chase Bank N.A. Hong Kong Branch',
      'Country: HONG KONG, CHINA',
      'Bank Address: CHATER HOUSE, 8 CONNAUGHT ROAD, CENTRAL, HONG KONG',
      'Account Type: Current',
      'Swift/BIC: CHASHKHH (CHASHKHHXXX, if 11 characters are required)',
      'Routing Number: 007863',
      'Bank Code: 007',
      'Branch Number: 863',
      'Account Number: 63001373435',
      'Holder Name: Shanghai Lanmeng Import and Export Co., Ltd.',
      'Support Currency: AUD CAD CHF DKK EUR GBP HKD JPY NOK NZD SEK SGD USD ZAR'
    ]
  };


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const openModal = (bank) => {
    setSelectedBank({ name: bank, details: bankDetails[bank] });
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);
    const fileRef = ref(storage, `proofOfPayment/${currentUser.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);

    // Save the file URL and the user ID to Firestore
    await setDoc(doc(db, "proofOfPayment", currentUser.uid), {
      url: fileUrl,
      userId: currentUser.uid
    });

    setUploading(false);
    alert('File uploaded successfully!');
    setFile(null);
  };

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-6 my-8 bg-white shadow-lg rounded-lg">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-semibold leading-7 text-gray-900">Payment Information</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">You can make a payment using one of the account options listed below.<br />
            Then submit a confirmation of your payment.</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {Object.keys(bankDetails).map((bank) => (
              <div key={bank} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900 flex items-center">
                  {bank} {bank === 'Transfer Wise' ? <SiWise className="ml-2" /> : bank === 'Cih Bank' ? <BsBank className="ml-2" /> : <BsBank2 className="ml-2" />}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <button onClick={() => openModal(bank)} className='flex items-center justify-center rounded-lg border border-transparent bg-blue-400 px-4 py-2 text-base text-white shadow-sm hover:bg-blue-500'>
                    Account details
                  </button>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {selectedBank.name} Account Details
                    </Dialog.Title>
                    <div className="mt-3">
                      {selectedBank.details.map((line, index) => (
                        <p key={index} className="text-sm text-gray-500">{line}</p>
                      ))}
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-semibold leading-6 text-gray-900">Proof of Payment</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div className="bg-white rounded-md border border-gray-200 shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="flex-shrink-0 flex space-x-3">
                    <label className="cursor-pointer rounded-md bg-slate-100 text-gray-700 shadow-sm hover:bg-gray-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 p-2">
                      <span>{file ? file.name : 'Choose File'}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                      />
                    </label>
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={uploadFile}
                      disabled={uploading || !file}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </dd>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default withAuth(Payments);



