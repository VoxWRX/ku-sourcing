"use client"

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGlobalContext } from '../context/globalContext';
import TranslateComponent from './translate-comp';


const ProductRecommendations = () => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const { selectedProduct, setSelectedProduct } = useGlobalContext();

    const handleProductSelect = (selectedProduct) => {
        setSelectedProduct(selectedProduct);
    };
    useEffect(() => {
        if (selectedProduct) {
            window.location.href = '/user-sourcing-requests';
        }
    }, [selectedProduct]);


    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "newProducts"));
            const productsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setRecommendedProducts(productsList);
        };

        fetchProducts();
    }, []);

    return (
        <div className="p-10">
            <h2 className="text-3xl text-gray-700 text-center font-bold mt-4 ml-6 mb-4">
                <TranslateComponent text="Not sure where to start?" /></h2>
            <p className="text-lg text-blue-500 text-center mb-4 ml-6">
                <TranslateComponent text="We have some top products just for you" /></p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                    <div key={product.id}
                        className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:scale-90 duration-150 flex flex-col items-center text-center"
                        onClick={() => handleProductSelect(product)}
                    >
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-2">
                            <h3 className="text-lg font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductRecommendations;
