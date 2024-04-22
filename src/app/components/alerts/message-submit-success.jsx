import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XIcon } from 'lucide-react';
import React, { useState } from 'react';

const NotificationMessage = () => {
    const [showNotification, setShowNotification] = useState(true);

    return (
        <>
            {showNotification && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 w-full max-w-xs bg-white shadow-lg rounded-lg pointer-events-auto">
                    <div className="rounded-lg shadow-xs overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm leading-5 font-medium text-gray-900">
                                        Successfully sent!
                                    </p>
                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                        We will get back to you shortly.
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                        onClick={() => setShowNotification(false)}
                                    >
                                        <XIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotificationMessage;

