import React from 'react';

const DashboardCard = ({ title, value, trend, viewAll }) => {
    return (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white flex flex-col justify-between">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <span>{trend}</span>
                </div>
                <div className="text-4xl font-bold text-gray-900">{value}</div>
            </div>
            <div className="px-6 py-4 bg-gray-50 text-right">
                <a href={'/user-handling'} className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition duration-300 ease-in-out text-sm"
                >
                    {viewAll}
                </a>
            </div>
        </div>
    );
};

export default DashboardCard;
