"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function OrderForm({ initialData }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData || {
    cusName: '',
    cusAddress: '',
    cusPhone: '',
    orderUnit: '',
    dateDelivery: '',
    orderStatus: 'Pending',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await axios.put(`https://restapi-tjap.onrender.com/api/orders/${initialData._id}`, formData);
      } else {
        await axios.post('https://restapi-tjap.onrender.com/api/orders', formData);
      }
      router.push('/'); // Redirect to homepage after submission
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">{initialData ? 'Edit Order' : 'Add Order'}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cusName" value={formData.cusName} onChange={handleInputChange} placeholder="Customer Name" className="mb-4 p-2 border border-gray-300 rounded" />
        <input type="text" name="cusAddress" value={formData.cusAddress} onChange={handleInputChange} placeholder="Customer Address" className="mb-4 p-2 border border-gray-300 rounded" />
        <input type="text" name="cusPhone" value={formData.cusPhone} onChange={handleInputChange} placeholder="Customer Phone" className="mb-4 p-2 border border-gray-300 rounded" />
        <input type="number" name="orderUnit" value={formData.orderUnit} onChange={handleInputChange} placeholder="Order Units" className="mb-4 p-2 border border-gray-300 rounded" />
        <input type="text" name="dateDelivery" value={formData.dateDelivery} onChange={handleInputChange} placeholder="Delivery Date" className="mb-4 p-2 border border-gray-300 rounded" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700">
          {initialData ? 'Update Order' : 'Add Order'}
        </button>
      </form>
    </div>
  );
}
