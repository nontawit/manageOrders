"use client";
import { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/th';
import th from 'moment/locale/th';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import thLocale from 'date-fns/locale/th';

registerLocale('th', thLocale);

export default function AddOrderForm({ onCancelAdd, onOrderAdded }) {
  const [newOrder, setNewOrder] = useState({
    cusName: '',
    cusPhone: '',
    cusAddress: '',
    orderUnit: '',
    dateDelivery: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevOrder => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    setNewOrder(prevOrder => ({
      ...prevOrder,
      dateDelivery: formattedDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedOrder = {
        ...newOrder,
        dateDelivery: moment(newOrder.dateDelivery, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      };
      await axios.post('https://restapi-tjap.onrender.com/api/orders', formattedOrder);
      console.log('Order added successfully!');
      onOrderAdded();
      onCancelAdd();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onCancelAdd}>
          <FaTimes />
        </button>
        <h2 className="text-center text-2xl font-bold mb-4">เพิ่มคำสั่งซื้อ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cusName" className="block text-gray-700 font-semibold">ชื่อลูกค้า:</label>
            <input
              type="text"
              id="cusName"
              name="cusName"
              value={newOrder.cusName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cusPhone" className="block text-gray-700 font-semibold">เบอร์โทร:</label>
            <input
              type="text"
              id="cusPhone"
              name="cusPhone"
              value={newOrder.cusPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cusAddress" className="block text-gray-700 font-semibold">ที่อยู่:</label>
            <input
              type="text"
              id="cusAddress"
              name="cusAddress"
              value={newOrder.cusAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="orderUnit" className="block text-gray-700 font-semibold">จำนวนชุด:</label>
            <input
              type="text"
              id="orderUnit"
              name="orderUnit"
              value={newOrder.orderUnit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateDelivery" className="block text-gray-700 font-semibold">วันที่ส่ง:</label>
            <DatePicker
              id="dateDelivery"
              selected={newOrder.dateDelivery ? moment(newOrder.dateDelivery, 'DD/MM/YYYY').toDate() : null}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              locale="th"
              className="w-full border border-gray-300 rounded p-2"
              placeholderText="DD/MM/YYYY"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg mr-2">บันทึก</button>
            <button type="button" onClick={onCancelAdd} className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg">ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  );
}
