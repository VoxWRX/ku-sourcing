"use client"

import { db } from '@/app/config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FiUserPlus } from "react-icons/fi";
import { TbClipboardList } from "react-icons/tb";
import { TbCheckupList } from "react-icons/tb";

const TopCards = () => {
    const [userCount, setUserCount] = useState(0);
    const [requestsCount, setRequestsCount] = useState(0);
    const [handledRequestsCount, setHandledRequestsCount] = useState(0);

    useEffect(() => {
        const fetchAndCountUsers = async () => {
            const usersCollectionRef = collection(db, "users");
            const querySnapshot = await getDocs(usersCollectionRef);
            setUserCount(querySnapshot.size);
        };

        fetchAndCountUsers();
    }, []);

    useEffect(() => {
        const fetchAndCountRequests = async () => {
            const requestsCollectionRef = collection(db, "product_request_forms");
            const querySnapshot = await getDocs(requestsCollectionRef);
            setRequestsCount(querySnapshot.size);
        };

        fetchAndCountRequests();
    }, []);

    useEffect(() => {
        const fetchAndCountHandledRequests = async () => {
            const requestsCollectionRef = collection(db, "product_request_forms");
            const queryRequestsProductStatus = query(requestsCollectionRef, where('status', 'in', ['Paid', 'Shipped', 'Arrived']));
            const querySnapshot = await getDocs(queryRequestsProductStatus);
            setHandledRequestsCount(querySnapshot.size)
        };

        fetchAndCountHandledRequests();
    }, []);

    return (
        <div className='grid lg:grid-cols-5 gap-4 p-4'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border shadow-md p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{requestsCount}</p>
                    <p className='text-gray-600'>Requests count</p>
                </div>
                <span className='bg-blue-200 flex justify-center items-center p-2 rounded-lg'><TbClipboardList size={40} /></span>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border shadow-md p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{userCount}</p>
                    <p className='text-gray-600'>Users count</p>
                </div>
                <span className='bg-blue-200 flex justify-center items-center p-2 rounded-lg'><FiUserPlus size={40} /></span>
            </div>
            <div className='bg-white flex justify-between w-full border shadow-md p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{handledRequestsCount}</p>
                    <p className='text-gray-600'>Requests Paid</p>
                </div>
                <span className='bg-blue-200 flex justify-center items-center p-2 rounded-lg'><TbCheckupList size={40} /></span>
            </div>
        </div>
    )
}

export default TopCards;