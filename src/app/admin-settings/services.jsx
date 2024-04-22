import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import ServiceEditModal from '../components/service-edit';
import AddServiceModal from '../components/new-service';
import NotificationService from '../components/alerts/service-saved-success';


const ServicesList = () => {

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "services"));
                const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(servicesData);
            } catch (error) {
                console.error("Error fetching services: ", error);
            }
        };

        fetchServices();
    }, []);

    const handleCloseModal = () => {
        setSelectedService(null);
    };

    const handleSaveEdit = (updatedService) => {
        setServices(services.map(serv => serv.id === updatedService.id ? updatedService : serv));
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const handleAddService = (newService) => {
        setServices([...services, newService]);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const handleDeleteService = (id) => {
        setServices(services.filter(service => service.id !== id));
    };
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow-lg overflow-hidden bg-white border-b border-gray-200 sm:rounded-lg">
                            <h2 className="text-xl leading-6 font-semibold p-3 mt-3 text-gray-900">Handle Services</h2>
                            <p className="ml-1 text-sm p-2 text-gray-600">
                                List of all services available for the users, the informations below will be printed in each order.
                            </p>
                            <table className="min-w-full divide-y divide-gray-200 mt-2">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Country
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {services.map((serv) => (
                                        <tr key={serv.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{serv.name}</td>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                {serv.contact.split('\n').map((line, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                {serv.address.split('\n').map((line, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{serv.country}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-blue-500 hover:text-blue-800"
                                                    onClick={() => setSelectedService(serv)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="px-6 py-3 bg-gray-50 text-right">
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add service
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedService && (
                <ServiceEditModal
                    service={selectedService}
                    onClose={handleCloseModal}
                    onSave={handleSaveEdit}
                    onDelete={handleDeleteService}
                />
            )}
            {isAddModalOpen && (
                <AddServiceModal
                    onAdd={handleAddService}
                    onClose={() => setIsAddModalOpen(false)}
                />
            )}
            {showNotification && <NotificationService />}

        </div>
    );
};

export default ServicesList;
