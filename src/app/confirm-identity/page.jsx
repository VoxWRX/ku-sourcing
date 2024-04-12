"use client"

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { db, auth } from '../config/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import withAuth from '../context/withAuth';


const IdentityConfirmation = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        familyName: '',
        phoneNumber: '',
    });
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        firstName: userData.firstName || '',
                        familyName: userData.familyName || '',
                        phoneNumber: userData.phoneNumber || '',
                    }));
                } else {
                    console.log("No such document!");
                }
            }
        };
        fetchUserData();
    }, [currentUser]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                firstName: formData.firstName,
                familyName: formData.familyName,
                phoneNumber: formData.phoneNumber,
                isVerified: true,
            });

        }
        catch (error) {
            console.error("Error saving user data: ", error);
            setIsSubmitting(false);
        }

        setIsSubmitting(false);
        setIsConfirmed(true);
    };


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-10 bg-white rounded-lg shadow-md">
                {!isConfirmed && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-3xl font-semibold text-center">Confirm Identity </h2>
                        <p className="mt-4 mb-8 text-lg text-center leading-8 text-gray-600">Please be sure to enter your full legal name, exactly as it appears on your identification documents</p>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="firstName" className="text-sm font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className={`px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${!formData.firstName && 'border-red-500'}`}

                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="familyName" className="text-sm font-medium">
                                Family Name
                            </label>
                            <input
                                type="text"
                                name="familyName"
                                id="familyName"
                                className={`px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${!formData.familyName && 'border-red-500'}`}

                                value={formData.familyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="phoneNumber" className="text-sm font-medium">
                                Phone Number
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder='+1'
                                    id="phoneNumber"
                                    className={`px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${!formData.phoneNumber && 'border-red-500'}`}

                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:text-sm w-full
                            ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} `}
                        >
                            {isSubmitting ? 'Submitting...' : 'Confirm'}

                        </button>
                    </form>
                )}
                {isConfirmed && (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibol">Identity Confirmed</h2>
                        <p className="text-gray-600 my-4">
                            You can now proceed to the payment page.
                        </p>
                        <a
                            href="/user-payment"
                            className="w-full px-4 py-2 mt-8 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Go to Payment
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withAuth(IdentityConfirmation);