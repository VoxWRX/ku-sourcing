"use client"

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,//xAxis
    LinearScale,//yAxis
    PointElement,
    Title,
    Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Legend,
    Tooltip
)

const LineChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Clients',
                data: [20, 56, 10, 120, 37, 18, 230],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235, 0.4)',

            },
            {
                label: 'Product Requests',
                data: [3, 5, 170, 60, 44, 290, 15],
                borderColor: 'rgb(112, 58, 194)',
                backgroundColor: 'rgb(112, 58, 194,0.4)'
            }],


        });
        setChartOptions({
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'data chart'
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        })
    }, []);


    return (
        <>
            <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
                <Line
                    data={chartData}
                    options={chartOptions}
                ></Line>
            </div>
        </>
    )
}

export default LineChart