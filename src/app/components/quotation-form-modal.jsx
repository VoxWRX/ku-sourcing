"use client"

import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const QuotationFormModal = ({ order, destinationIndex, onClose, onSave }) => {

    const [quotationData, setQuotationData] = useState({
        unitPrice: '',
        commissionOfService: '',
        unitWeight: '',
        deliveryCostInChina: '',
        totalCost: '',
        // Any additional fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuotationData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const destinationCountry = order.destinations[destinationIndex].country;

        // Adding the quotation to Firestore
        const quotationRef = collection(db, "quotation");
        await addDoc(quotationRef, {
            ...quotationData,
            orderId: order.id,
            country: destinationCountry,
        });


        // Marking the quotation as filled for the corresponding destination
        const updatedOrder = {
            ...order,
            destinations: order.destinations.map((dest, idx) => {
                if (idx === destinationIndex) {
                    return { ...dest, quotationFilled: true };
                }
                return dest;
            })
        };

        // onSave to update the parent component's state
        onSave(updatedOrder);


        onClose();
    };

    return (

        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                <h2 className="text-xl font-semibold">Quotation for {order.productName}</h2>
                <p className="text-sm text-gray-600">Once submitted you can't modify this quotation!</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(quotationData).map((key) => (
                        <input
                            key={key}
                            name={key}
                            type="number"
                            value={quotationData[key]}
                            onChange={handleChange}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    ))}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="py-2 px-4 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuotationFormModal;
