"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTable from './components/OrderTable';
import OrderProgress from './components/OrderProgress';
import AddOrderForm from './components/AddOrderForm';
import { PlusIcon } from '@heroicons/react/24/solid';
import moment from 'moment';

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://restapi-tjap.onrender.com/api/orders', {
        timeout: 20000, // เพิ่ม timeout เป็น 20 วินาที
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      setError('Error fetching orders. Please try again later.');
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 60000); // อัปเดตทุก 1 นาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  const convertThaiDateToGregorian = (thaiDate) => {
    const [day, month, year] = thaiDate.split('/').map(Number);
    return moment(`${day}/${month}/${year - 543}`, 'DD/MM/YYYY');
  };

  const pendingOrders = orders?.filter(order => order.orderStatus === 'Pending') || [];
  const successOrdersCount = orders?.filter(order => order.orderStatus === 'Success').length || 0;
  const totalOrdersCount = orders?.length || 0;

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Management Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex flex-col md:flex-row md:space-x-4">
        <OrderProgress orders={orders} />
        <div className="mt-4 md:mt-0 md:flex-1">
          <OrderTable orders={pendingOrders} fetchOrders={fetchOrders} />
          <div className="flex justify-center mt-4">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setIsFormOpen(true)}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isFormOpen && <AddOrderForm fetchOrders={fetchOrders} closeForm={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default Home;
