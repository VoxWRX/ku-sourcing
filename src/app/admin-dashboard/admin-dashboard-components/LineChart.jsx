"use client"

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Legend, Tooltip, TimeScale } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Legend, Tooltip, TimeScale);

const LineChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartOptions({
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Product Requests & Total Cost' },
            },
            scales: {
                x: {
                    type: 'category',

                    title: { display: true, text: 'Date' }
                },
                y1: { // Y-axis for Total Cost
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Total Cost' },
                    beginAtZero: true,
                },
                y2: { // Y-axis for Product Requests
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Product Requests' },
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        });

        const fetchData = async () => {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const quotationSnapshot = await getDocs(collection(db, "quotation"));
            const totalCosts = quotationSnapshot.docs.map(doc => {
                const data = doc.data();
                const date = data.quotationCreationDate?.toDate ? data.quotationCreationDate.toDate() : new Date();
                console.log(date);

                return {
                    x: date,
                    formattedX: date.toLocaleDateString(), // for displaying in the chart
                    y: data.totalCost || 0
                };
            })
                .filter(point => point.x >= thirtyDaysAgo) // Only data from the last 30 days
                .sort((a, b) => a.x - b.x);


            const requestSnapshot = await getDocs(collection(db, "product_request_forms"));
            const productRequests = requestSnapshot.docs.map(doc => {
                const data = doc.data();
                const date = data.formCreationDate?.toDate ? data.formCreationDate.toDate() : new Date();
                console.log(date);

                return {
                    x: date,
                    formattedX: date.toLocaleDateString(), // for displaying in the chart
                    y: 1
                };
            })
                .filter(point => point.x >= thirtyDaysAgo)
                .sort((a, b) => a.x - b.x);

            // Aggregate product requests by date
            const aggregatedProductRequests = productRequests.reduce((acc, { x, y }) => {
                const dateStr = x.toISOString().split('T')[0];
                acc[dateStr] = (acc[dateStr] || 0) + y;
                return acc;
            }, {});

            const productRequestDataPoints = Object.entries(aggregatedProductRequests).map(([date, count]) => ({
                x: new Date(date),
                y: count
            })).sort((a, b) => new Date(a.x) - new Date(b.x));

            setChartData({
                datasets: [
                    {
                        label: 'Total Cost',
                        data: totalCosts.map(point => ({ x: point.formattedX, y: point.y })),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        yAxisID: 'y1', //  Total Cost y-axis

                    },
                    {
                        label: 'Product Requests',
                        data: productRequestDataPoints.map(point => ({ x: point.x.toLocaleDateString(), y: point.y })),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        yAxisID: 'y2', // Product Requests y-axis

                    }
                ],
            });
        };

        fetchData();

    }, []);

    return (
        <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default LineChart;
