"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion, query, where, arrayRemove } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../config/firebase';
import QuotationFormModal from '../components/quotation-form-modal';
import { MdClose } from 'react-icons/md';
import BackgroundBeams from '../components/ui/backgound-beams';
import Sidebar from './Sidebar';




const AdminHandling = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showQuotationModal, setShowQuotationModal] = useState(false);
    const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [filter, setFilter] = useState({
        reference: '',
        status: '',
        productName: ''
    });




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


    const openQuotationModal = (orderIndex, destinationIndex) => { // Change 'order' to 'orderIndex' to clarify it's an index
        setSelectedOrder(orderIndex); // Set the index, not the object
        setSelectedDestinationIndex(destinationIndex);
        // Assuming 'orderIndex' is used to find the specific order in the 'orders' array:
        const order = orders[orderIndex]; // Access the order object using the index
        setSelectedQuantity(order.destinations[destinationIndex].quantity);
        setSelectedService(order.destinations[destinationIndex].service);
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    // Get filtered orders
    const filteredOrders = orders.filter((order) => {
        return (
            (filter.reference ? order.id.toLowerCase().includes(filter.reference.toLowerCase()) : true) &&
            (filter.status ? order.status.toLowerCase().includes(filter.status.toLowerCase()) : true) &&
            (filter.productName ? order.productName.toLowerCase().includes(filter.productName.toLowerCase()) : true)
        );
    });


    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-200 overflow-auto">
                <BackgroundBeams className="fixed top-0 left-0 h-full w-full" />
                <div className="relative max-w-6xl mx-auto  px-6 py-8">

                    {showNotification && (
                        <div className="absolute bottom-0 right-0 mb-4 mr-4 z-50 bg-blue-100 border border-blue-400 text-blue-700 px-6 py-4 rounded-lg">
                            <p className='font-semibold text-lg'>Quotation submitted successfully!</p>
                        </div>
                    )}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Handling</h1>
                    <p className="mt-6 text-lg mb-10 leading-8 text-gray-600 text-center">Update each order status, fill quotations and upload real images.</p>
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            name="reference"
                            placeholder="Filter by Reference"
                            onChange={handleFilterChange}
                            value={filter.reference}
                            className="px-4 py-2 z-40 border rounded-md shadow-sm"
                        />
                        <input
                            type="text"
                            name="status"
                            placeholder="Filter by Status"
                            onChange={handleFilterChange}
                            value={filter.status}
                            className="px-4 py-2 z-40 border rounded-md shadow-sm"
                        />
                        <input
                            type="text"
                            name="productName"
                            placeholder="Filter by Product Name"
                            onChange={handleFilterChange}
                            value={filter.productName}
                            className="px-4 py-2 z-40 border rounded-md shadow-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {filteredOrders.map((order, orderIndex) => (
                            <div key={order.id} className="bg-white p-6 z-40 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
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
                                                    openQuotationModal(orderIndex, index);
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
                            quantity={selectedQuantity} // Passing the selected quantity as a prop
                            service={selectedService} // Passing the selected service as a prop
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
            </div>
        </div>
    );
};

export default AdminHandling;
