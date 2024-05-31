import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const OrderTable = ({ orders, fetchOrders }) => {
  const handleFinishOrder = async (orderId) => {
    // Logic for finishing the order
  };

  const handleDeleteOrder = async (orderId) => {
    // Logic for deleting the order
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Customer Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Address</th>
            <th className="py-2 px-4 border-b border-gray-300">Phone</th>
            <th className="py-2 px-4 border-b border-gray-300">Order Unit</th>
            <th className="py-2 px-4 border-b border-gray-300">Date Delivery</th>
            <th className="py-2 px-4 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b border-gray-300">{order.cusName}</td>
              <td className="py-2 px-4 border-b border-gray-300">{order.cusAddress}</td>
              <td className="py-2 px-4 border-b border-gray-300">{order.cusPhone}</td>
              <td className="py-2 px-4 border-b border-gray-300">{order.orderUnit}</td>
              <td className="py-2 px-4 border-b border-gray-300">{order.dateDelivery}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFinishOrder(order.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <PencilSquareIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
