"use client"

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import QuotationFormModal from '../components/quotation-form-modal';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { MdClose } from 'react-icons/md';



const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [realImages, setRealImages] = useState({});


  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "product_request_forms"));
      const ordersData = [];
      let imagesData = {};

      querySnapshot.forEach((doc) => {
        const orderData = { id: doc.id, ...doc.data() };
        ordersData.push(orderData);

        // If the order has associated real images, update the imagesData object
        if (Array.isArray(orderData.realImages) && orderData.realImages.length > 0) {
          imagesData[orderData.id] = orderData.realImages;
        }
      });

      setOrders(ordersData);
      setRealImages(imagesData); // Update the realImages state with the fetched images
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    // Updating local state
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));

    // Updating Firestore
    const orderRef = doc(db, "product_request_forms", orderId);
    await updateDoc(orderRef, { status: newStatus });
  };


  const handleImageUpload = async (event, orderId) => {
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `realImages/${orderId}/${file.name}`);

    try {
      // Upload the image file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the realImages state with the new URL
      setRealImages(prev => ({ ...prev, [orderId]: [...(prev[orderId] || []), downloadURL] }));

      // Update the corresponding document in Firestore
      const orderRef = doc(db, "product_request_forms", orderId);

      // arrayUnion to add the new image URL to the realImages array in the Firestore document
      // This ensures that the new URL is added to the array without removing existing URLs
      await updateDoc(orderRef, {
        realImages: arrayUnion(downloadURL)
      });

    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleImageDelete = async (orderId, imageUrl) => {
    // Removing the image URL from the realImages state
    setRealImages(prev => ({
      ...prev,
      [orderId]: prev[orderId].filter(url => url !== imageUrl)
    }));

    const orderRef = doc(db, "product_request_forms", orderId);
    await updateDoc(orderRef, {
      realImages: arrayRemove(imageUrl)
    });
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{order.productName}</h2>
            <p className="text-gray-600 mb-4">Reference: <span className="font-semibold">{order.id}</span></p>
            {order.productImageUrl && (
              <img src={order.productImageUrl} alt='kuai sourcing' className="w-full h-48 object-cover object-center mb-4 rounded-lg" />
            )}
            <p className="text-gray-600 mb-4">Status: <span className="font-semibold">{order.status}</span></p>
            <select
              className="block w-full p-2 border rounded mb-4 text-gray-700"
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>

            <input
              type="file"
              onChange={(e) => handleImageUpload(e, order.id)}
              className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {realImages[order.id] && (
              <div className="mt-4 mb-2 flex flex-wrap gap-2">
                {realImages[order.id].map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img src={imageUrl} alt={`Real Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                    <MdClose
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer"
                      onClick={() => handleImageDelete(order.id, imageUrl)}
                      size={24} // adjust the size later as needed
                    />

                  </div>
                ))}
              </div>
            )}

            <button
              className={`block w-full p-2 rounded text-white transition-colors ${order.quotationFilled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={() => {
                if (!order.quotationFilled) {
                  setSelectedOrder(order);
                }
              }}
              disabled={order.quotationFilled}
            >
              {order.quotationFilled ? 'Quotation Filled' : 'Fill Quotation'}
            </button>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <QuotationFormModal order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onQuotationSubmit={(orderId) => {
            setOrders(orders.map(order => {
              if (order.id === orderId) {
                return { ...order, quotationFilled: true };
              }
              return order;
            }));
          }} />
      )}
    </div>
  );
};

export default AdminDashboard;
