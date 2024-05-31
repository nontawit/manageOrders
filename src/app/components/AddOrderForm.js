import React, { useState } from 'react';

const AddOrderForm = ({ fetchOrders, closeForm }) => {
  const [formData, setFormData] = useState({
    cusName: '',
    cusAddress: '',
    cusPhone: '',
    orderUnit: '',
    dateDelivery: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for submitting the form and adding the order
    fetchOrders();
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cusName" className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              id="cusName"
              name="cusName"
              value={formData.cusName}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cusAddress" className="block text-sm font-medium text-gray-700">Customer Address</label>
            <input
              type="text"
              id="cusAddress"
              name="cusAddress"
              value={formData.cusAddress}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cusPhone" className="block text-sm font-medium text-gray-700">Customer Phone</label>
            <input
              type="text"
              id="cusPhone"
              name="cusPhone"
              value={formData.cusPhone}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="orderUnit" className="block text-sm font-medium text-gray-700">Order Unit</label>
            <input
              type="text"
              id="orderUnit"
              name="orderUnit"
              value={formData.orderUnit}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateDelivery" className="block text-sm font-medium text-gray-700">Date Delivery (DD/MM/YYYY)</label>
            <input
              type="text"
              id="dateDelivery"
              name="dateDelivery"
              value={formData.dateDelivery}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mr-2"
            >
              Add Order
            </button>
            <button
              onClick={closeForm}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderForm;