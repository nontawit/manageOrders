"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaClipboardList, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';

export default function Dashboard() {
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [pendingUnitsCount, setPendingUnitsCount] = useState(0);
  const [successOrdersCount, setSuccessOrdersCount] = useState(0);
  const [successUnitsCount, setSuccessUnitsCount] = useState(0);
  const [allOrdersCount, setAllOrdersCount] = useState(0);
  const [allUnitsCount, setAllUnitsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('dashboardData');
        if (cachedData) {
          const data = JSON.parse(cachedData);
          setPendingOrdersCount(data.pendingOrdersCount);
          setPendingUnitsCount(data.pendingUnitsCount);
          setSuccessOrdersCount(data.successOrdersCount);
          setSuccessUnitsCount(data.successUnitsCount);
        } else {
          const response = await axios.get('https://restapi-tjap.onrender.com/api/orders/dashboard/stats');
          const data = response.data;
          setPendingOrdersCount(data.pendingOrdersCount);
          setPendingUnitsCount(data.pendingUnitsCount);
          setSuccessOrdersCount(data.successOrdersCount);
          setSuccessUnitsCount(data.successUnitsCount);
          localStorage.setItem('dashboardData', JSON.stringify(data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">ระบบจัดการคำสั่งซื้อ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard 
          title="รอดำเนินการ" 
          totalOrders={pendingOrdersCount} 
          totalUnits={pendingUnitsCount} 
          color="yellow"
          icon={<FaClipboardList className="text-4xl mb-2" />} 
        />
        <DashboardCard 
          title="เสร็จสิ้น" 
          totalOrders={successOrdersCount} 
          totalUnits={successUnitsCount} 
          color="green"
          icon={<FaCheckCircle className="text-4xl mb-2" />} 
        />
        <DashboardCard 
          title="คำสั่งซื้อทั้งหมด" 
          totalOrders={pendingOrdersCount + successOrdersCount} 
          totalUnits={pendingUnitsCount + successUnitsCount} 
          color="blue"
          icon={<FaShoppingCart className="text-4xl mb-2" />} 
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, totalOrders, totalUnits, color, icon }) {
  return (
    <div className={`bg-${color}-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between cursor-pointer transform transition duration-300 hover:scale-105 hover:bg-${color}-600`}>
      <div>
        {icon}
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className='text-xl'>คำสั่งซื้อ: {totalOrders}</p>
        <p className='text-xl'>จำนวนชุด: {totalUnits}</p>
      </div>
      <FaArrowRight className="text-3xl" />
    </div>
  );
}
