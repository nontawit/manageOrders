import React, { useState } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Modal from 'react-modal';

const OrderTable = ({ orders, fetchOrders }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  const handleFinishOrder = async (orderId) => {
    // Logic for finishing the order
  };

  const handleDeleteOrder = async (orderId) => {
    // Logic for deleting the order
  };

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Customer Name', 'Address', 'Phone', 'Unit', 'Date Delivery', 'Actions'].map((header) => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                onClick={() => handleOpenModal(order)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.cusName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.cusAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.cusPhone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderUnit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.dateDelivery}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFinishOrder(order._id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <PencilSquareIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Order Details"
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      >
        {selectedOrder && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p className="text-lg mb-2"><strong>Customer Name:</strong> {selectedOrder.cusName}</p>
            <p className="text-lg mb-2"><strong>Address:</strong> {selectedOrder.cusAddress}</p>
            <p className="text-lg mb-2"><strong>Phone:</strong> {selectedOrder.cusPhone}</p>
            <p className="text-lg mb-2"><strong>Unit:</strong> {selectedOrder.orderUnit}</p>
            <p className="text-lg mb-2"><strong>Date Delivery:</strong> {selectedOrder.dateDelivery}</p>
            <div className="mt-4 flex justify-center">
              <button
                 onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full mr-2"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderTable;
