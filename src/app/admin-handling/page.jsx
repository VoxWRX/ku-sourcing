"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion, query, where, arrayRemove } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../config/firebase';
import QuotationFormModal from '../components/quotation-form-modal';
import { MdClose } from 'react-icons/md';




const AdminHandling = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showQuotationModal, setShowQuotationModal] = useState(false);
    const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(null);
    const [showNotification, setShowNotification] = useState(false);



    useEffect(() => {
        const fetchOrdersAndCheckQuotations = async () => {
            // Fetch orders from 'product_request_forms' collection
            const querySnapshot = await getDocs(collection(db, 'product_request_forms'));
            const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


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

            // Update the state with the modified orders data
            setOrders(ordersData);
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

            // Update Firestore document
            const orderRef = doc(db, 'product_request_forms', orderId);
            await updateDoc(orderRef, { realImages: arrayUnion(downloadURL) });

            // Update the orders state
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


    const openQuotationModal = (order, destinationIndex) => {
        setSelectedOrder(order);
        setSelectedDestinationIndex(destinationIndex);
        setShowQuotationModal(true);
    };

    // When saving a quotation, update the filled status for the correct destination
    const handleSaveQuotation = (updatedOrder, destinationIndex) => {
        const updatedOrders = orders.map(order => {
            if (order.id === updatedOrder.id) {
                const updatedDestinationsQuotationFilled = [...order.destinationsQuotationFilled];
                // Here to mark the quotation as filled for the destination
                updatedDestinationsQuotationFilled[destinationIndex] = true;
                return { ...updatedOrder, destinationsQuotationFilled: updatedDestinationsQuotationFilled };
            }
            return order;
        });
        setOrders(updatedOrders);
        setShowQuotationModal(false);
    };


    const checkQuotationExists = async (orderId, country) => {
        const quotationRef = collection(db, "quotation");
        const querySnapshot = await getDocs(query(quotationRef, where("orderId", "==", orderId), where("country", "==", country)));
        return !querySnapshot.empty;
    };

    const handleShowNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-8 ">
            {showNotification && (
                <div className="absolute bottom-0 right-0 mb-4 mr-4 z-50 bg-blue-100 border border-blue-400 text-blue-700 px-6 py-4 rounded-lg">
                    <p className='font-semibold text-lg'>Quotation submitted successfully!</p>
                </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Admin Handling</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order, orderIndex) => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{order.productName}</h2>
                        <p className="text-gray-600 mb-2">Reference: <span className="font-semibold">{order.id}</span></p>
                        <p className="text-gray-600 mb-2">Shipping: <span className="font-semibold">{order.shippingType}</span></p>
                        <p className="text-gray-600 mb-4">Status: <span className="font-semibold">{order.status}</span></p>
                        <select
                            className="block w-full p-3 border-gray-300 rounded-md shadow-sm mb-4 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                            <option value="Processing">Processing</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
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
                            const isQuotationFilled = order.destinationsQuotationFilled[index];
                            return (
                                <button
                                    key={`${order.id}-${index}`}
                                    className={`mt-2 mb-2 p-2 w-full rounded-lg text-white transition-colors ${isQuotationFilled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    onClick={() => {
                                        if (!isQuotationFilled) {
                                            setSelectedOrder(orderIndex);
                                            setSelectedDestinationIndex(index);
                                            setShowQuotationModal(true);
                                        }
                                    }}
                                    disabled={isQuotationFilled}
                                >
                                    {isQuotationFilled ? `Quotation Filled for ${destination.country}` : `Fill Quotation for ${destination.country}`}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {showQuotationModal && selectedOrder !== null && (
                <QuotationFormModal
                    order={orders[selectedOrder]}
                    destinationIndex={selectedDestinationIndex}
                    onClose={() => setShowQuotationModal(false)}
                    onSave={() => {
                        const updatedOrders = [...orders];
                        updatedOrders[selectedOrder].destinationsQuotationFilled[selectedDestinationIndex] = true;
                        setOrders(updatedOrders);
                        setShowQuotationModal(false);
                        handleShowNotification();
                    }}
                />
            )}
        </div>
    );
};

export default AdminHandling;
