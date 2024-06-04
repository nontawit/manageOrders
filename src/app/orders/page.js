"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft, FaPhone, FaCheck, FaMapMarkerAlt, FaBox, FaTruck } from 'react-icons/fa';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    cusName: '',
    cusAddress: '',
    cusPhone: '',
    orderUnit: '',
    dateDelivery: '',
    orderStatus: 'Pending',
  });

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('https://restapi-tjap.onrender.com/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAddOrder = async () => {
    try {
      const response = await axios.post('https://restapi-tjap.onrender.com/api/orders', newOrder);
      setOrders([...orders, response.data]);
      setShowForm(false);
      setNewOrder({
        cusName: '',
        cusAddress: '',
        cusPhone: '',
        orderUnit: '',
        dateDelivery: '',
        orderStatus: 'Pending',
      });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleEditOrder = async () => {
    try {
      const response = await axios.put(`https://restapi-tjap.onrender.com/api/orders/${currentOrder._id}`, newOrder);
      setOrders(orders.map((order) => (order._id === currentOrder._id ? response.data : order)));
      setShowForm(false);
      setIsEditMode(false);
      setCurrentOrder(null);
      setNewOrder({
        cusName: '',
        cusAddress: '',
        cusPhone: '',
        orderUnit: '',
        dateDelivery: '',
        orderStatus: 'Pending',
      });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`https://restapi-tjap.onrender.com/api/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const updatedOrder = orders.find((order) => order._id === id);
      if (updatedOrder) {
        updatedOrder.orderStatus = 'Success';
        await axios.put(`https://restapi-tjap.onrender.com/api/orders/${id}`, updatedOrder);
        setOrders(orders.map((order) => (order._id === id ? updatedOrder : order)));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleEditClick = (order) => {
    setCurrentOrder(order);
    setNewOrder(order);
    setShowForm(true);
    setIsEditMode(true);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white py-2 px-4 rounded-full flex items-center justify-center shadow-lg transform transition duration-500 hover:scale-110 hover:bg-gray-700"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="text-4xl font-extrabold text-gray-800">Orders</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditMode(false);
            setNewOrder({
              cusName: '',
              cusAddress: '',
              cusPhone: '',
              orderUnit: '',
              dateDelivery: '',
              orderStatus: 'Pending',
            });
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center shadow-lg transform transition duration-500 hover:scale-110 hover:bg-blue-700"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>
      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Order' : 'Add New Order'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="cusName"
              value={newOrder.cusName}
              onChange={handleInputChange}
              placeholder="Customer Name"
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              name="cusAddress"
              value={newOrder.cusAddress}
              onChange={handleInputChange}
              placeholder="Customer Address"
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="number"
              name="orderUnit"
              value={newOrder.orderUnit}
              onChange={handleInputChange}
              placeholder="Order Units"
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              name="dateDelivery"
              value={newOrder.dateDelivery}
              onChange={handleInputChange}
              placeholder="Delivery Date"
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <input
            type="text"
            name="cusPhone"
            value={newOrder.cusPhone}
            onChange={handleInputChange}
            placeholder="Customer Phone"
            className="border border-gray-300 p-2 rounded-lg mt-4"
          />
          <button
            onClick={isEditMode ? handleEditOrder : handleAddOrder}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-110 hover:bg-green-700"
          >
            {isEditMode ? 'Update Order' : 'Add Order'}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{order.cusName}</h2>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <p className="text-gray-700">{order.cusAddress}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaBox className="text-gray-500 mr-2" />
              <p className="text-gray-700">{order.orderUnit} Units</p>
            </div>
            <div className="flex items-center mb-2">
              <FaTruck className="text-gray-500 mr-2" />
              <p className="text-gray-700">Delivery: {order.dateDelivery}</p>
            </div>
            <p className={`text-lg font-bold mt-2 ${order.orderStatus === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
              {order.orderStatus}
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <a
                href={`tel:${order.cusPhone}`}
                className="text-blue-500 p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                title="Call Customer"
              >
                <FaPhone className="text-2xl" />
              </a>
              <button
                onClick={() => handleUpdateStatus(order._id)}
                className="text-green-500 p-2 rounded-full bg-green-100 hover:bg-green-200"
                title="Update Status"
              >
                <FaCheck className="text-2xl" />
              </button>
              <button
                onClick={() => handleEditClick(order)}
                className="text-blue-500 p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                title="Edit Order"
              >
                <FaEdit className="text-2xl" />
              </button>
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="text-red-500 p-2 rounded-full bg-red-100 hover:bg-red-200"
                title="Delete Order"
              >
                <FaTrash className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}