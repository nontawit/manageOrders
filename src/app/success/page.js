"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhone, FaBox, FaTruck, FaPhoneAlt, FaCheck, FaTrash, FaEdit, FaPlus, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function SuccessOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('https://restapi-tjap.onrender.com/api/orders/status/success');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
  }, []);

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://restapi-tjap.onrender.com/api/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit order with ID: ${id}`);
  };

  const filteredOrders = orders.filter(order =>
    order.cusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.cusPhone.includes(searchTerm) ||
    order.cusAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className=" text-center text-4xl font-extrabold text-gray-800 mb-8">คำสั่งซื้อที่เสร็จสิ้น</h1>
      
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href="/add-order">
          <button className="bg-green-500 text-white p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-green-700">
            <FaPlus />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">{order.cusName}</h2>
            <p className="text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline-block mr-2" /> {order.cusAddress}
            </p>
            <p className="text-gray-700 mb-1">
              <FaBox className="inline-block mr-2" /> {order.orderUnit} ชุด
            </p>
            <p className="text-gray-700" mb-1>
              <FaTruck className="inline-block mr-2" /> {order.dateDelivery}
            </p>
            <p className="text-gray-700">
              {order.orderStatus === 'Pending' ? (
                <span className="text-yellow-500">Pending</span>
              ) : (
                <span className="text-green-500">Success</span>
              )}
            </p>
            <div className="flex space-x-2 mt-4">
              <button onClick={() => handleCall(order.cusPhone)} className="bg-blue-500 text-white p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-blue-700">
                <FaPhoneAlt />
              </button>
              <button onClick={() => handleDelete(order._id)} className="bg-red-500 text-white p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-red-700">
                <FaTrash />
              </button>
              <button onClick={() => handleEdit(order._id)} className="bg-yellow-500 text-white p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-yellow-700">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link href="/">
        <button className="fixed bottom-8 left-8 bg-gray-500 text-white p-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <FaArrowLeft />
        </button>
      </Link>
    </div>
  );
}
