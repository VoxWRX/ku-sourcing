"use client"

import React, { useState, useEffect } from 'react';

const products = [
    { id: 1, name: "Product A", category: "Electronics", tags: ["innovative", "tech"], imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 1, name: "Product B", category: "Electronics", tags: ["innovative", "tech"], imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 1, name: "Product C", category: "Electronics", tags: ["innovative", "tech"], imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1501&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 1, name: "Product D", category: "Electronics", tags: ["innovative", "tech"], imageUrl: "https://images.unsplash.com/photo-1590130671075-1659f1607601?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 1, name: "Product E", category: "Electronics", tags: ["innovative", "tech"], imageUrl: "https://images.unsplash.com/photo-1586062129117-08db958ba215?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Product F", category: "Home Appliances", tags: ["convenient", "daily use"], imageUrl: "https://images.unsplash.com/photo-1618754246388-ef8a6be60ed6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    // Add more products with their respective images...
];
const userPreferences = {
    favoriteCategories: ["Electronics"],
    interests: ["innovative", "tech"],
    // Other preferences...
};

const ProductRecommendations = () => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const recommendations = products.filter(product =>
            userPreferences.favoriteCategories.includes(product.category) ||
            product.tags.some(tag => userPreferences.interests.includes(tag))
        );

        setRecommendedProducts(recommendations);
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-3xl text-gray-700 text-center font-bold mt-4 ml-6 mb-4">Not sure where to start?</h2>
            <p className="text-lg text-blue-500 text-center mb-4 ml-6">These top picks are just for you</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                    <div key={product.id} className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-2">
                            <h3 className="text-lg font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            {/* You can add more product details here */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductRecommendations;
