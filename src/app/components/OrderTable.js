import React, { useState } from 'react';
import { PhoneIcon } from '@heroicons/react/24/solid';
import Modal from 'react-modal';
import axios from 'axios';

// กำหนดค่าเริ่มต้นสำหรับ Modal
Modal.setAppElement(document.body); // ใช้ document.body แทน

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

  const handleFinishOrder = async () => {
    if (!selectedOrder) return;

    try {
      await axios.put(`https://restapi-tjap.onrender.com/api/orders/${selectedOrder._id}`, {
        orderStatus: 'Success',
      });
      setModalIsOpen(false);
      fetchOrders(); // Fetch orders again to get the updated list
    } catch (error) {
      console.error('Error finishing order:', error.message);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Customer Name', 'Address', 'Unit', 'Status'].map((header) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderUnit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.orderStatus === 'Success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.orderStatus}
                  </span>
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
            <div className="mt-4 flex justify-center">
              <a href={`tel:${selectedOrder.cusPhone}`} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full mr-2 flex items-center transition duration-300 ease-in-out">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Call Customer
              </a>
              <button onClick={handleFinishOrder} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mr-2 transition duration-300 ease-in-out">
                Finish Order
              </button>
              <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out">
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
