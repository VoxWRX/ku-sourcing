"use client"

import React, { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const QuotationFormModal = ({ order, destinationIndex, quantity, service, onClose, onSave }) => {

    const [quotationData, setQuotationData] = useState({
        unitPrice: '',
        commissionOfService: '',
        unitWeight: '',
        deliveryCostInChina: '',
        // Any additional fields as needed
    });

    const totalCost = React.useMemo(() => {
        const unitPrice = parseFloat(quotationData.unitPrice) || 0;
        const commissionOfService = parseFloat(quotationData.commissionOfService) || 0;
        const deliveryCostInChina = parseFloat(quotationData.deliveryCostInChina) || 0;
        return (unitPrice * quantity) + commissionOfService + deliveryCostInChina;
    }, [quotationData, quantity]); // Recalculate if these dependencies change


    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuotationData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const destinationCountry = order.destinations[destinationIndex].country;

        const quotationRef = collection(db, "quotation");
        await addDoc(quotationRef, {
            ...quotationData,
            totalCost: totalCost.toFixed(2),
            orderId: order.id,
            country: destinationCountry,
            quotationCreationDate: new Date(),
        });

        // Update the order status to "Unpaid"
        const orderDocRef = doc(db, "product_request_forms", order.id);
        await updateDoc(orderDocRef, {
            status: "Unpaid"
        });


        // Marking the quotation as filled for the corresponding destination
        const updatedOrder = {
            ...order,
            status: "Unpaid",
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

        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                <h2 className="text-xl font-medium"><b>Quotation for </b> {order.productName}</h2>
                <p className='text-sm text-gray-600'><b>with a quantity of :</b> {quantity}</p>
                <p className='text-sm text-gray-600'><b>and the selected service is : </b> {service}</p>
                <p className="text-sm text-red-500">Once submitted you can&apos;t modify this quotation!</p>

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
                    <div className="text-sm text-gray-800">
                        Total Cost: <span className="font-semibold">{totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="py-2 px-4 border rounded-lg text-gray-600 hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default QuotationFormModal;
