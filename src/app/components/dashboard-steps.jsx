import React from 'react';
import TranslateComponent from './translate-comp';

const steps = [
    { number: 1, title: "Select Your Product", description: "Fill the form about the product you wish to source.", href: '/user-sourcing-requests' },
    { number: 2, title: "Confirmation", description: "Wait for admin to confirm your sourcing request.", href: '/user-handling' },
    { number: 3, title: "Complete Purchase", description: "Complete your purchase with secure online payment options.", href: '/user-handling' },
    { number: 4, title: "Get Your Products", description: "Receive your sourced products at your specified location.", href: '/user-sourcing-orders' },
];

const Step = ({ step, isLast }) => {
    return (
        <div className={`flex flex-col items-center  sm:flex-row sm:items-center text-gray-600 ${isLast ? '' : 'pb-4 sm:pb-0'}`}>
            <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full z-10 scale-100 hover:scale-110 transition-transform duration-300 ease-in-out flex items-center justify-center cursor-pointer group">
                    <a href={step.href}>
                        {step.number}
                    </a>
                    <span className="absolute w-auto p-2 -mt-24 sm:-mt-16 bg-white text-sm text-gray-700 rounded-md shadow-lg min-w-max invisible group-hover:visible transition-opacity duration-300 ease-in-out">
                        <TranslateComponent text={step.description} />
                    </span>
                </div>
                {!isLast && (
                    <div className="flex-auto border-t-2 border-blue-300 sm:border-l-0 sm:border-t-2 transition-width duration-300 ease-in-out"></div>
                )}
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-4 min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wider text-center sm:text-left">
                    <TranslateComponent text={step.title} />
                </p>
            </div>
        </div>
    );
};

const StepsComponent = () => {
    return (
        <div className="py-8">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl text-gray-700 font-bold text-center sm:text-center mt-6 mb-6">
                    <TranslateComponent text="4 Easy Steps" /></h2>
                <div className="flex flex-col sm:flex-row justify-start sm:justify-between space-y-4 sm:space-y-0">
                    {steps.map((step, index) => (
                        <Step key={step.number} step={step} isLast={index === steps.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepsComponent;
