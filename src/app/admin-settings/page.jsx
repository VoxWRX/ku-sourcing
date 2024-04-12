"use client"

import React, { useContext, useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import Sidebar from './Sidebar';
import withAuth from '../context/withAuth';
import { AuthContext } from '../context/authContext';
import { db } from '../config/firebase';
import UpdateUser from '../components/alerts/update-user-profile';
import LoadingIndicator from '../components/alerts/loading-indicator';
import AddProductForm from './add-products';

const SettingsPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const storage = getStorage();

    const [activeTab, setActiveTab] = useState('profileSettings'); // New state for active tab

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

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
        window.location.href = '/admin-dashboard';
    };

    const handleCloseAlert = () => {
        setUpdateSuccess(false);
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <Sidebar />

            <div className="settings-container max-w-4xl mx-auto mb-10 p-5">
                <h1 className="text-4xl font-bold text-center mt-5 mb-10">Admin Settings</h1>
                {/* Tab Navigation */}

                <div className="flex border-b mb-4">
                    <button
                        className={`py-2 px-4 -mb-px font-semibold ${activeTab === 'profileSettings' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-500 border-transparent'}`}
                        onClick={() => setActiveTab('profileSettings')}
                    >
                        Profile Settings
                    </button>
                    <button
                        className={`py-2 px-4 -mb-px font-semibold ${activeTab === 'addProducts' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-500 border-transparent'}`}
                        onClick={() => setActiveTab('addProducts')}
                    >
                        Add Products
                    </button>
                </div>

                {activeTab === 'profileSettings' && (
                    <div className="settings-form bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Your first name"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="familyName" className="block text-gray-700 text-sm font-bold mb-2">
                                    Family Name
                                </label>
                                <input
                                    type="text"
                                    name="familyName"
                                    id="familyName"
                                    value={familyName}
                                    onChange={(e) => setFamilyName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Your family name"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-bold mb-2">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    name="profilePicture"
                                    id="profilePicture"
                                    onChange={handleProfilePictureChange}
                                    className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {profilePictureUrl && (
                                    <img src={profilePictureUrl} alt="Profile" className="h-40 w-40 mt-4 object-cover rounded-full mx-auto" />
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-sm py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 'addProducts' && (
                    <div>
                        <AddProductForm />
                    </div>
                )}

            </div>
            {updateSuccess && <UpdateUser open={updateSuccess} handleClose={handleCloseAlert} />}
        </>
    );
};

export default withAuth(SettingsPage);
