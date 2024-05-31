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
        <h3 className="text-lg font-semibold mb-2 text-center">Success Orders</h3>
        <div className="w-24 h-24 md:w-48 md:h-48">
          <CircularProgressbarWithChildren
            value={successPercentage}
            styles={buildStyles({
              textColor: '#38A169',
              pathColor: '#38A169',
              trailColor: '#C6F6D5',
            })}
          >
            <div className="text-lg font-semibold text-green-600">
              {successOrdersCount} / {totalOrdersCount}
            </div>
            <div className="text-green-600">
              {successPercentage.toFixed(2)}%
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
