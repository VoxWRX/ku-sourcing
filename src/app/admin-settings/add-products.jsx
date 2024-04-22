"use client"

import React, { useState, useEffect } from 'react';
import { ref, getStorage, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productCategory, setProductCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [products, setProducts] = useState([]);
    const storage = getStorage();

    const category = [
        {
            id: 1,
            name: 'Home & Garden, Fourniture',
        },
        {
            id: 2,
            name: 'Electronics',
        },
        {
            id: 3,
            name: 'Healthcare & Beauty',
        },
        {
            id: 4,
            name: 'Bags & Shoes',
        },
        {
            id: 5,
            name: 'Sports & Outdoors',
        },
        {
            id: 6,
            name: 'Pet Supplies',
        },
        {
            id: 7,
            name: 'Jewelry & Watches',
        },
        {
            id: 8,
            name: 'Other',
        },
    ]


    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "newProducts"));
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Image to Firebase Storage
        const storageRef = ref(storage, `productImages/${productImage.name}`);
        await uploadBytes(storageRef, productImage);
        const imageUrl = await getDownloadURL(storageRef);

        const productRef = doc(collection(db, 'newProducts'));
        const newProduct = { name: productName, category: productCategory, imageUrl };
        await setDoc(productRef, newProduct);

        // Updating UI
        setProducts([...products, { ...newProduct, id: productRef.id }]);
        setIsSubmitting(false);
        setProductName('');
        setProductCategory('');
        setProductImage(null);
    };


    const handleDelete = async (productId) => {
        await deleteDoc(doc(db, "newProducts", productId));

        // Updating the UI
        setProducts(products.filter(product => product.id !== productId));
    };

    return (
        <div className="max-w-4xl mx-auto my-6">
            <form onSubmit={handleSubmit} className="p-6 shadow-xl rounded-lg bg-white space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Suggest products for users</h2>

                <div>
                    <label htmlFor="productName" className="block text-lg font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="productCategory" className="block text-lg font-medium text-gray-700">Category</label>
                    <select
                        id="productCategory"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        {category.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="productImage" className="block text-lg font-medium text-gray-700">Product Image</label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleImageChange}
                        className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300">
                    {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
            </form>

            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Added Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="border shadow-lg rounded-lg overflow-hidden">
                            <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                                <p className="p-4 text-gray-700">{product.category}</p>
                                <button
                                    onClick={() => handleDelete(product.id, product.imageName)}
                                    className="py-2 px-4 bg-red-400 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;