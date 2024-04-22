import React, { useState, useEffect } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ServiceEditModal = ({ service, onClose, onSave, onDelete }) => {
    const [editedService, setEditedService] = useState(service);

    const handleChange = (e) => {
        setEditedService({ ...editedService, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const serviceRef = doc(db, 'services', service.id);
            await updateDoc(serviceRef, editedService);
            onSave(editedService); // Update local state
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error updating service: ", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteDoc(doc(db, 'services', service.id));
                onDelete(service.id); // Remove from local state
                onClose(); // Close the modal
            } catch (error) {
                console.error("Error deleting service: ", error);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-600 bg-opacity-50 flex">
            <div className="relative p-8 bg-gray-50 w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold">Edit Service</h1>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editedService.name}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={editedService.contact}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Address</label>
                        <textarea
                            name="address"
                            value={editedService.address}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={editedService.country}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="text-right space-x-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                        >
                            Save
                        </button>

                    </div>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};


export default ServiceEditModal;