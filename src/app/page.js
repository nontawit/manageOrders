"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaClipboardList } from 'react-icons/fa';

export default function IndexPage() {
  const [orders, setOrders] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [pendingUnits, setPendingUnits] = useState(0);
  const [successUnits, setSuccessUnits] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('https://restapi-tjap.onrender.com/api/orders');
        setOrders(response.data);
        calculateCounts(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
  }, []);

  const calculateCounts = (orders) => {
    let pendingCount = 0;
    let successCount = 0;
    let pendingUnits = 0;
    let successUnits = 0;

    orders.forEach(order => {
      if (order.orderStatus === 'Pending') {
        pendingCount++;
        pendingUnits += order.orderUnit;
      } else if (order.orderStatus === 'Success') {
        successCount++;
        successUnits += order.orderUnit;
      }
    });

    setPendingCount(pendingCount);
    setSuccessCount(successCount);
    setPendingUnits(pendingUnits);
    setSuccessUnits(successUnits);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold my-8 text-center text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Pending Orders</h2>
          <p className="text-lg">Number of Orders: {pendingCount}</p>
          <p className="text-lg">Total Units: {pendingUnits}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Success Orders</h2>
          <p className="text-lg">Number of Orders: {successCount}</p>
          <p className="text-lg">Total Units: {successUnits}</p>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Link href="/orders" passHref>
          <button className="bg-blue-500 text-white py-3 px-6 rounded-full flex items-center justify-center shadow-lg transform transition duration-500 hover:scale-110 hover:bg-blue-700">
            <FaClipboardList className="text-3xl mr-2" />
            <span className="text-xl">View Orders</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
