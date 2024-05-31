import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const AddOrderForm = ({ fetchOrders, closeForm }) => {
  const [formData, setFormData] = useState({
    cusName: '',
    cusAddress: '',
    cusPhone: '',
    orderUnit: 0,
    dateDelivery: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateDelivery: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const convertedDate = moment(formData.dateDelivery).format('DD/MM/YYYY');
      const newOrder = { ...formData, dateDelivery: convertedDate };

      await axios.post('https://restapi-tjap.onrender.com/api/orders', newOrder);
      fetchOrders();
      closeForm();
    } catch (error) {
      console.error('Error adding order:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Name</label>
            <input
              type="text"
              name="cusName"
              value={formData.cusName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="cusAddress"
              value={formData.cusAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="cusPhone"
              value={formData.cusPhone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Order Unit</label>
            <input
              type="number"
              name="orderUnit"
              value={formData.orderUnit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date Delivery (DD/MM/YYYY)</label>
            <DatePicker
              selected={formData.dateDelivery}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeForm}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderForm;
