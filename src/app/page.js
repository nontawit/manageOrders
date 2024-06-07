"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaClipboardList } from 'react-icons/fa';

export default function Home() {
  const [dashboardStats, setDashboardStats] = useState({
    pendingOrdersCount: 0,
    successOrdersCount: 0,
    pendingUnitsCount: 0,
    successUnitsCount: 0,
  });

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await axios.get('https://restapi-tjap.onrender.com/api/orders/dashboard/stats');
        setDashboardStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold my-8 text-center text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Pending Orders</h2>
          <p className="text-lg">Number of Orders: {dashboardStats.pendingOrdersCount}</p>
          <p className="text-lg">Total Units: {dashboardStats.pendingUnitsCount}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Success Orders</h2>
          <p className="text-lg">Number of Orders: {dashboardStats.successOrdersCount}</p>
          <p className="text-lg">Total Units: {dashboardStats.successUnitsCount}</p>
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
