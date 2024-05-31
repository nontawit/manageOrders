import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OrderProgress = ({ orders }) => {
  if (!orders || !Array.isArray(orders)) {
    return null;
  }

  const pendingOrders = orders.filter(order => order.orderStatus === 'Pending');
  const successOrdersCount = orders.filter(order => order.orderStatus === 'Success').length;
  const totalOrdersCount = orders.length;
  const totalOrderUnits = pendingOrders.reduce((total, order) => total + order.orderUnit, 0);

  const successPercentage = totalOrdersCount > 0 ? (successOrdersCount / totalOrdersCount) * 100 : 0;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">Order Status</h2>

      <div className="flex flex-col items-center justify-center mb-6 w-full">
        <h3 className="text-lg font-semibold mb-2 text-center">Pending Orders</h3>
        <div className="text-2xl font-semibold text-green-600 text-center">
          {pendingOrders.length} Orders
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-6 w-full">
        <h3 className="text-lg font-semibold mb-2 text-center">Order Units</h3>
        <div className="text-2xl font-semibold text-green-600 text-center">
          {totalOrderUnits} Units
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-2 text-center">Success Orders</h3>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{ width: `${successPercentage}%` }}
          ></div>
        </div>
        <div className="text-lg font-semibold text-green-600 text-center">
          {successOrdersCount} / {totalOrdersCount} ({successPercentage.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
