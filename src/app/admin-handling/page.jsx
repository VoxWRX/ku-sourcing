"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../config/firebase';
import QuotationFormModal from '../components/quotation-form-modal';




const AdminHandling = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showQuotationModal, setShowQuotationModal] = useState(false);
    const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const querySnapshot = await getDocs(collection(db, 'product_request_forms'));
            const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersData);

        };

        fetchOrders();
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
                    return { ...order, realImages: order.realImages ? [...order.realImages, downloadURL] : [downloadURL] };
                }
                return order;
            }));
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };

    const openQuotationModal = (order, destinationIndex) => {
        setSelectedOrder(order);
        setSelectedDestinationIndex(destinationIndex);
        setShowQuotationModal(true);
    };

    const checkQuotationExists = async (orderId, country) => {
        const quotationRef = collection(db, "quotation");
        const querySnapshot = await getDocs(query(quotationRef, where("orderId", "==", orderId), where("country", "==", country)));
        return !querySnapshot.empty;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{order.productName}</h2>
                        <p className="text-gray-600 mb-4">Reference: <span className="font-semibold">{order.id}</span></p>
                        <p className="text-gray-600 mb-4">Status: <span className="font-semibold">{order.status}</span></p>
                        <select
                            className="block w-full p-2 border rounded mb-4 text-gray-700"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                            <option value="Processing">Processing</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>

                        <input
                            type="file"
                            onChange={(e) => handleImageUpload(e, order.id)}
                            className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />

                        {order.destinations?.map((destination, index) => {
                            const orderId = order.id;
                            const country = destination.country;
                            const quotationExists = checkQuotationExists(orderId, country);

                            return (
                                <button
                                    key={index}
                                    className={`mt-2 mb-2 p-2 ${quotationExists ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} rounded`}
                                    onClick={() => !quotationExists && openQuotationModal(order, index)}
                                    disabled={quotationExists}
                                >
                                    {quotationExists ? 'Quotation Filled' : `Fill Quotation for ${destination.country}`}
                                </button>
                            );
                        })}


                        {/* Displaying uploaded images */}
                        {order.realImages?.map((imageUrl, index) => (
                            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg mt-2" />
                        ))}
                    </div>
                ))}
            </div>

            {showQuotationModal && (
                <QuotationFormModal
                    order={selectedOrder}
                    destinationIndex={selectedDestinationIndex}
                    onClose={() => setShowQuotationModal(false)}
                    onSave={(updatedOrder) => {
                        const updatedOrders = orders.map(order => {
                            if (order.id === updatedOrder.id) {
                                return updatedOrder;
                            }
                            return order;
                        });
                        setOrders(updatedOrders);
                    }}
                />
            )}
        </div>
    );
};

export default AdminHandling;
