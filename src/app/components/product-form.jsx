"use client"

import { PhotoIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useContext, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Destinations from './destinations'
import { TypewriterEffectSourcing } from './writer-source'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase'
import { AuthContext } from '../context/authContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import NotificationForm from './alerts/form-submit-success'
import { useGlobalContext } from '../context/globalContext'
import TranslateComponent from './translate-comp'


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
  const [selectedCategory, setSelectedCategory] = useState(category[3]);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const { selectedProduct } = useGlobalContext();
  const [formData, setFormData] = useState({
    productName: '',
    productImage: null,
    productURL: '',
    category: selectedCategory.name,
    additionalNotes: '',
    airFreight: false,
    status: 'Processing',
    formCreationDate: new Date(),
    // other fields here as needed
  });

  const [destinations, setDestinations] = useState([]);


  const handleUpdateDestinations = (newDestinations) => {
    setDestinations(newDestinations);
  };

  const { currentUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setImageUrl(fileUrl); // The file URL for preview
    }
  };
  const uploadFile = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `product-images/${file.name}-${Date.now()}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (!currentUser) {
      alert('You must be logged in to submit a request.');
      return;
    }

    //  Additional validation as needed
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadFile(file);
    }

    try {

      // Save the form data to Firestore
      await addDoc(collection(db, 'product_request_forms'), {
        ...formData,
        userId: currentUser.uid, // here the request with the current user id
        formCreationDate: Timestamp.fromDate(formData.formCreationDate), // Convert to Timestamp here for firebase format
        productImageUrl: fileUrl,
        destinations: destinations,
        proofUploaded: false,
      });

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        window.location.href = '/user-handling';
      }, 4000);

    } catch (error) {
      console.error('Error submitting the sourcing request: ', error);
      alert('Failed to submit the sourcing request.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      console.log('Selected product in form:', selectedProduct);
      setFormData({
        ...formData,
        productName: selectedProduct.name,
        productImage: selectedProduct.imageUrl,
        productURL: selectedProduct.productURL || '',
        category: selectedProduct.category,
        additionalNotes: '',
        airFreight: false,
        status: 'Processing',
        formCreationDate: new Date(),
      });
      setImageUrl(selectedProduct.productImageUrl || '');
      const categoryObj = category.find(cat => cat.name === selectedProduct.category);
      setSelectedCategory(categoryObj || category[0]);

    }

  }, [selectedProduct]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <TypewriterEffectSourcing />
        <p className="text-sm leading-6 text-gray-600">
          <TranslateComponent text="All information with * below are required." />
        </p>

        <div className="mt-10 container grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
          <div className="sm:col-span-4">
            <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500">
              <TranslateComponent text="Product Name" />
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-blue-500 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm ">kuaisourcing.com/</span>
                <input
                  type="text"
                  name="productName"
                  id="product"
                  autoComplete="product"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="name here..."
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>



          <div className="col-full max-w-xl">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500">
              <TranslateComponent text="Product Image" />
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">

              {
                !imageUrl && (
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md p-1 bg-white font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span><TranslateComponent text="Upload a file" /></span>
                        <input onChange={handleFileChange} required id="file-upload" name="productImage" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1"><TranslateComponent text="or drag and drop" /></p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )
              }
              {imageUrl && (
                <div className="mt-4 flex justify-center">
                  <img src={imageUrl} alt="Preview" className="max-w-xs max-h-64" />
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-4 max-w-xl">
            <label htmlFor="urlField" className="block text-sm font-medium leading-6 text-gray-900">
              <TranslateComponent text=" Product URL" />
            </label>
            <div className="mt-2">
              <input
                id="urlField"
                name="productURL"
                type="url"
                autoComplete="urlField"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>


            <Listbox value={selectedCategory} onChange={(newCategory) => {
              setSelectedCategory(newCategory);
              setFormData({ ...formData, category: newCategory.name });
            }}>

              {({ open }) => (
                <>
                  <Listbox.Label className="block mt-5 text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500"><TranslateComponent text="Category" /></Listbox.Label>
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
          <h2 className="text-base font-semibold leading-7 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500"><TranslateComponent text="Destination Country" /></h2>
          <p className="mt-1 text-sm leading-6 text-gray-600"><TranslateComponent text="You can use more than one destination for the same product." /></p>

          <Destinations onUpdateDestinations={handleUpdateDestinations} />

        </div>

        <div className="col-span-full">
          <label htmlFor="additionalNotes" className="block text-sm font-medium leading-6 text-gray-900">
            <TranslateComponent text="Additional Notes" />
          </label>
          <div className="mt-2">
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              defaultValue={''}
              onChange={handleInputChange}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600"><TranslateComponent text="Extra details for specific orders." /></p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base mt-4 font-semibold leading-7 text-gray-900"><TranslateComponent text="Shipping Methods" /></h2>

          <div className="mt-10 space-y-10">
            <fieldset>

              <div className="space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="air"
                      name="airFreight"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      onChange={handleCheckboxChange}
                      checked={formData.airFreight}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="air" className="font-medium text-gray-900">
                      <TranslateComponent text="Air freight" />
                    </label>
                    <p className="text-gray-500"><TranslateComponent text="Estimated delivery time 15-20 working days." /></p>
                  </div>
                </div>

              </div>
            </fieldset>

          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href='/user-dashboard'>
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900 rounded-md ">
            <TranslateComponent text="Cancel" />
          </button>
        </a>

        <button
          type="submit"
          className={`rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
          disabled={isUploading}
        >
          <TranslateComponent text="Request the product" />
        </button>
      </div>
      {showNotification && <NotificationForm />}

    </form>
  )
}
