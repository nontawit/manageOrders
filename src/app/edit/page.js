"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import moment from "moment";
import "moment/locale/th";

export default function EditOrderForm({ order, onCancelEdit }) {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  useEffect(() => {
    // Format the date to DD/MM/YYYY with Thai year (Buddhist Era)
    if (order.dateDelivery) {
      const formattedDate = moment(order.dateDelivery, "YYYY-MM-DD").format("DD/MM/YYYY");
      setEditedOrder((prevOrder) => ({
        ...prevOrder,
        dateDelivery: formattedDate,
      }));
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the date is in DD/MM/YYYY format for the API
      const formattedDate = moment(editedOrder.dateDelivery, "DD/MM/YYYY").format("DD/MM/YYYY");
      await axios.put(`https://restapi-tjap.onrender.com/api/orders/${editedOrder._id}`, {
        ...editedOrder,
        dateDelivery: formattedDate,
      });
      console.log("Order edited successfully!");
      onCancelEdit(); // Close the edit form
      window.location.reload(); // Refresh the OrdersPage
    } catch (error) {
      console.error("Error editing order:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onCancelEdit}>
          <FaTimes />
        </button>
        <h2 className="text-center text-2xl font-bold mb-4">แก้ไขคำสั่งซื้อ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cusName" className="block text-gray-700 font-semibold">ชื่อลูกค้า:</label>
            <input
              type="text"
              id="cusName"
              name="cusName"
              value={editedOrder.cusName}
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
              value={editedOrder.cusPhone}
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
              value={editedOrder.cusAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="orderUnit" className="block text-gray-700 font-semibold">จำนวนชุด:</label>
            <input
              type="number"
              id="orderUnit"
              name="orderUnit"
              value={editedOrder.orderUnit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateDelivery" className="block text-gray-700 font-semibold">วันที่ส่ง:</label>
            <input
              type="text"
              id="dateDelivery"
              name="dateDelivery"
              value={editedOrder.dateDelivery}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg mr-2">บันทึก</button>
            <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg">ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  );
}
