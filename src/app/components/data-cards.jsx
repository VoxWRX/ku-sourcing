"use client"

import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../context/authContext';
import { db } from '../config/firebase';
import DashboardCard from './user-dashboard-card';
import { MdError } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";


const DataCards = () => {
    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState({
        totalOrders: 0,
        unpaidOrders: 0,
        paidOrders: 0
    });

    useEffect(() => {
        async function fetchData() {

            const ordersQuery = query(
                collection(db, "product_request_forms"),
                where("userId", "==", currentUser.uid),
            );

            try {
                const querySnapshot = await getDocs(ordersQuery);

                let totalOrders = 0;
                let unpaidOrders = 0;
                let paidOrders = 0;

                querySnapshot.forEach((doc) => {

                    totalOrders++;
                    const orderData = doc.data();
                    if (orderData.status === 'Unpaid') {
                        unpaidOrders++;
                    } else if (orderData.status === 'Arrived') {
                        paidOrders++;
                    } else if (orderData.status === 'Shipped') {
                        paidOrders++;
                    }
                    else if (orderData.status === 'Paid') {
                        paidOrders++;
                    }
                });

                setData({
                    totalOrders,
                    unpaidOrders,
                    paidOrders
                });

            } catch (err) {
                console.log(err);
            }
        }

        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    return (
        <>
            <h2 className='mt-8 ml-10 text-2xl font-bold tracking-tight text-gray-700 sm:text-3xl'>Recent Orders</h2>
            <div className="flex justify-center items-center p-4">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DashboardCard
                            title="Total Orders"
                            value={data.totalOrders}
                            trend={<FaClipboardList className="text-3xl text-blue-500" />
                            }
                            viewAll="View all"
                        />
                        <DashboardCard
                            title="Unpaid Orders"
                            value={data.unpaidOrders}
                            trend={<MdError className="text-3xl text-red-500" />}
                            viewAll="View all"
                        />
                        <DashboardCard
                            title="Paid Orders"
                            value={data.paidOrders}
                            trend={<FaThumbsUp className="text-3xl text-green-600" />}
                            viewAll="View all"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataCards;
