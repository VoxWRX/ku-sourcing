import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const AddServiceModal = ({ onClose, onAdd }) => {
    const [newService, setNewService] = useState({
        name: '',
        contact: '',
        address: '',
        country: ''
    });

    const handleChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const docRef = await addDoc(collection(db, 'services'), newService);
            onAdd({ id: docRef.id, ...newService }); // Add to local state
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error adding new service: ", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-600 bg-opacity-50 flex">
            <div className="relative p-8 bg-gray-50 w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold">Add New Service</h1>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newService.name}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={newService.contact}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Address</label>
                        <textarea
                            name="address"
                            value={newService.address}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={newService.country}
                            onChange={handleChange}
                            className="px-4 py-2 w-full border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="text-right space-x-4 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            Add
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServiceModal;