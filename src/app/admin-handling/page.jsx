"use client"

import React, { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { collection, getDocs, doc, updateDoc, arrayUnion, query, where, arrayRemove } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../config/firebase';
import QuotationFormModal from '../components/quotation-form-modal';
import { MdClose } from 'react-icons/md';
import BackgroundBeams from '../components/ui/backgound-beams';
import Sidebar from './Sidebar';
import withAuth from '../context/withAuth';
import LoadingIndicator from '../components/alerts/loading-indicator';
import QuotationSuccess from '../components/alerts/quotation-filled-success';

const statuses = [
    { id: 1, name: 'Filter by status' },
    { id: 2, name: 'Processing' },
    { id: 3, name: 'Paid' },
    { id: 4, name: 'Unpaid' },
    { id: 5, name: 'Shipped' },
    { id: 6, name: 'Arrived' },

];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const AdminHandling = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrder, setFilteredOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showQuotationModal, setShowQuotationModal] = useState(false);
    const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [quotationsFilled, setQuotationsFilled] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(statuses[0]);

    const [filter, setFilter] = useState({
        reference: '',
        productName: ''
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);


    useEffect(() => {
        setIsLoading(true);

        const fetchOrdersAndCheckQuotations = async () => {
            const querySnapshot = await getDocs(collection(db, 'product_request_forms'));
            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                productImageUrl: doc.data().productImageUrl || ''
            }));

            let newQuotationsFilled = {};
            for (const order of ordersData) {
                for (const destination of order.destinations || []) {
                    const key = `${order.id}-${destination.country}`;
                    const filled = await checkQuotationExists(order.id, destination.country);
                    newQuotationsFilled[key] = filled;
                }
            }
            // Iterate over each order to check for existing quotations for each destination
            for (const order of ordersData) {
                order.shippingType = order.airFreight ? 'Express Shipping' : 'Normal Shipping';
                const destinationsQuotationFilled = [];

                // Check each destination for an existing quotation
                for (const destination of order.destinations || []) {
                    const quotationExists = await checkQuotationExists(order.id, destination.country);
                    destinationsQuotationFilled.push(quotationExists);
                }

                // Assign the filled statuses to the order
                order.destinationsQuotationFilled = destinationsQuotationFilled;
            }

            // State with the modified orders data
            setOrders(ordersData);
            setQuotationsFilled(newQuotationsFilled);
            setIsLoading(false);

        };
        fetchOrdersAndCheckQuotations();

    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        const orderRef = doc(db, 'product_request_forms', orderId);
        await updateDoc(orderRef, { status: newStatus });
        setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    };

    const handleImageUpload = async (event, orderId) => {
        const file = event.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `realImages/${orderId}/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const orderRef = doc(db, 'product_request_forms', orderId);
            await updateDoc(orderRef, { realImages: arrayUnion(downloadURL) });

            setOrders(orders.map(order => {
                if (order.id === orderId) {
                    return {
                        ...order,
                        realImages: order.realImages ? [...order.realImages, downloadURL] : [downloadURL],
                    };
                }
                return order;
            }));
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };


    const handleImageDelete = async (orderId, imageUrl) => {
        // Updating the orders state to remove the image URL
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    realImages: order.realImages.filter(url => url !== imageUrl),
                };
            }
            return order;
        }));

        // Removing the image URL from Firestore
        const orderRef = doc(db, "product_request_forms", orderId);
        await updateDoc(orderRef, {
            realImages: arrayRemove(imageUrl)
        });
    };


    const handleSaveQuotation = (updatedOrder) => {
        const updatedOrders = orders.map(order =>
            order.id === updatedOrder.id ? { ...order, status: "Unpaid" } : order
        );
        setOrders(updatedOrders);

        // Updating quotationsFilled state to disable the button for the filled destination
        const destinationCountry = updatedOrder.destinations[selectedDestinationIndex].country;
        const key = `${updatedOrder.id}-${destinationCountry}`;
        setQuotationsFilled(prev => ({ ...prev, [key]: true }));

        setShowQuotationModal(false);
        setShowSuccessModal(true);
    };

    const checkQuotationExists = async (orderId, country) => {
        const quotationRef = collection(db, "quotation");
        const q = query(quotationRef, where("orderId", "==", orderId), where("country", "==", country));
        const snapshot = await getDocs(q);
        return !snapshot.empty;
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };


    useEffect(() => {
        let filtered = orders.filter(order => {
            return (
                (filter.reference ? order.id.toLowerCase().includes(filter.reference.toLowerCase()) : true) &&
                (filter.productName ? order.productName.toLowerCase().includes(filter.productName.toLowerCase()) : true) &&
                (selectedStatus.name !== 'Filter by status' ? order.status === selectedStatus.name : true)
            );
        });
        setFilteredOrder(filtered);
    }, [selectedStatus, orders, filter.reference, filter.productName]);

    useEffect(() => {
        setSelectedOrder(new Set());
    }, [selectedStatus, orders]);


    if (isLoading) {
        return <LoadingIndicator />;
    }


    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-200 overflow-auto">
                <BackgroundBeams className="fixed top-0 left-0 h-full w-full" />
                <div className="relative max-w-7xl mx-auto px-6 py-8">

                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Handling</h1>
                    <p className="mt-6 text-lg mb-10 leading-8 text-gray-600 text-center">Update each order status, fill quotations and upload real images.</p>
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            name="reference"
                            placeholder="Filter by Reference"
                            onChange={handleFilterChange}
                            value={filter.reference}
                            className="px-4 py-2 z-40 border font-normal rounded-md shadow-sm"
                        />


                        <input
                            type="text"
                            name="productName"
                            placeholder="Filter by Product Name"
                            onChange={handleFilterChange}
                            value={filter.productName}
                            className="px-4 py-2 z-40 border font-normal rounded-md shadow-sm"
                        />

                        <Listbox value={selectedStatus} onChange={setSelectedStatus} className="hidden md:block">
                            {({ open }) => (
                                <>
                                    <div className="relative z-40">
                                        <Listbox.Button className="relative w-48 bg-white border border-gray-500 rounded-md shadow-sm pl-3 pr-14 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                            <span className="block truncate text-gray-600">{selectedStatus.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                {statuses.map((status) => (
                                                    <Listbox.Option
                                                        key={status.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-blue-600 text-white' : 'text-gray-700',
                                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={status}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                                                                    >
                                                                        {status.name}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-blue-600',
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {filteredOrder.map((order, orderIndex) => (
                            <div key={order.id} className="bg-white p-6 z-30 rounded-lg shadow-md  transition-all ease-in-out duration-150 hover:scale-105">
                                <h2 className="text-xl font-semibold mb-3 text-gray-800">{order.productName}</h2>
                                <div className="flex flex-wrap">
                                    {order.productImageUrl && (
                                        <img src={order.productImageUrl} alt="Product" className="w-full h-48 object-cover rounded-lg mb-3" />
                                    )}
                                </div>
                                <p className="text-gray-600 mb-2">Reference: <span className="font-semibold">{order.id}</span></p>
                                <p className="text-gray-600 mb-2">Category: <span className="font-semibold">{order.category}</span></p>
                                <p className="text-gray-600 mb-2">Shipping: <span className="font-semibold">{order.shippingType}</span></p>
                                <p className="text-gray-600 mb-4">Status: <span className="font-semibold">{order.status}</span></p>
                                {order.additionalNotes && (
                                    <p className="text-gray-600 mb-4">
                                        Notes: <span className="font-semibold">{order.additionalNotes}</span>
                                    </p>
                                )}
                                <select
                                    className="block w-full p-3 border-gray-300 rounded-md shadow-sm mb-4 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Arrived">Arrived</option>

                                </select>
                                <p className='text-gray-800 font-semibold mb-3'>Upload real images</p>
                                <input
                                    type="file"
                                    onChange={(e) => handleImageUpload(e, order.id)}
                                    className="block w-full mb-4 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {order.realImages?.map((imageUrl, index) => (
                                        <div key={index} className="relative group w-24 h-24 mb-4">
                                            <img src={imageUrl} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                            <button
                                                onClick={() => handleImageDelete(order.id, imageUrl)}
                                                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer"
                                                style={{ transform: 'translate(50%, -50%)' }}
                                            >
                                                <MdClose size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {order.destinations?.map((destination, index) => {
                                    const key = `${order.id}-${destination.country}`;
                                    const isQuotationFilled = quotationsFilled[key];
                                    return (
                                        <button
                                            key={key}
                                            className={`mt-2 mb-2 p-2 w-full rounded-lg text-white ${isQuotationFilled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setSelectedDestinationIndex(index);
                                                setSelectedQuantity(destination.quantity);
                                                setSelectedService(destination.service);
                                                setShowQuotationModal(true);

                                            }}
                                        >
                                            {isQuotationFilled ? `Quotation Filled for ${destination.country}` : `Fill Quotation for ${destination.country}`}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    {showSuccessModal && (
                        <QuotationSuccess open={showSuccessModal} setOpen={setShowSuccessModal} />
                    )}
                    {showQuotationModal && selectedOrder !== null && (
                        <QuotationFormModal
                            order={selectedOrder}
                            destinationIndex={selectedDestinationIndex}
                            quantity={selectedQuantity} // Passing the selected quantity as a prop
                            service={selectedService} // Passing the selected service as a prop
                            onClose={() => setShowQuotationModal(false)}
                            onSave={handleSaveQuotation}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default withAuth(AdminHandling, true);