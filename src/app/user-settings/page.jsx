"use client"

import React, { useState, useContext, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../context/authContext';
import { db } from '../config/firebase';
import withAuth from '../context/withAuth';
import UpdateUser from '../components/alerts/update-user-profile';

const SettingsPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false); // State to control the modal
    const storage = getStorage();

    useEffect(() => {
        if (currentUser) {
            setFirstName(currentUser.firstName || '');
            setFamilyName(currentUser.familyName || '');
            setProfilePictureUrl(currentUser.profilePicture || '');
        }
    }, [currentUser]);

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(storageRef, file);

        const url = await getDownloadURL(storageRef);
        setProfilePictureUrl(url);
        setProfilePicture(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
            firstName,
            familyName,
            profilePicture: profilePictureUrl,
        });

        setUpdateSuccess(true);
    };

    const handleClose = () => {
        setUpdateSuccess(false); // To close the modal
        window.location.href = '/user-dashboard';
    };

    return (
        <div className="max-w-4xl mx-auto mb-10 p-5">
            <h1 className="text-3xl font-semibold text-center mt-5 mb-10">Settings</h1>
            <p className="mt-4 mb-8 text-lg text-center leading-8 text-gray-600">Please be sure to enter your full legal name, exactly as it appears on your identification documents</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Your first name"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="familyName" className="block text-sm font-medium text-gray-700">
                        Family Name
                    </label>
                    <input
                        type="text"
                        name="familyName"
                        id="familyName"
                        value={familyName}
                        onChange={(e) => setFamilyName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Your family name"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        onChange={handleProfilePictureChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {profilePictureUrl && (
                        <img src={profilePictureUrl} alt="Profile" className="mt-4 h-32 w-32 object-cover rounded-full" />
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
            {updateSuccess && <UpdateUser open={updateSuccess} setOpen={handleClose} />}

        </div>
    );
};

export default withAuth(SettingsPage);
