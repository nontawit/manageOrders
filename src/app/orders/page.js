"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt, FaBox, FaPhoneAlt, FaTrash, FaEdit, FaPlus, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import AddOrderForm from "../add/page"; // Adjust the import path as necessary
import EditOrderForm from "../edit/page"; // Adjust the import path as necessary

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://restapi-tjap.onrender.com/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://restapi-tjap.onrender.com/api/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setIsEditing(true);
  };

  const handleAddOrder = () => {
    setIsAdding(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingOrder(null);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.cusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cusPhone.includes(searchTerm) ||
      order.cusAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">คำสั่งซื้อทั้งหมด</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleAddOrder}
          className="bg-green-500 text-white p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-green-700"
        >
          <FaPlus />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">{order.cusName}</h2>
            <p className="text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline-block mr-2" /> {order.cusAddress}
            </p>
            <p className="text-gray-700 mb-1">
              <FaBox               className="inline-block mr-2" /> จำนวนชุด: {order.orderUnit}
            </p>
            <p className="text-gray-700 mb-1">
              <FaCalendarAlt className="inline-block mr-2" /> วันที่ส่ง: {order.dateDelivery}
            </p>
            <p className="text-gray-700 mb-1">
              <FaPhoneAlt className="inline-block mr-2" /> {order.cusPhone}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleCall(order.cusPhone)}
                className="bg-blue-500 text-white p-2 rounded-lg shadow-lg mr-2 transform transition duration-300 hover:scale-105 hover:bg-blue-700"
              >
                <FaPhoneAlt />
              </button>
              <button
                onClick={() => handleEdit(order)}
                className="bg-yellow-500 text-white p-2 rounded-lg shadow-lg mr-2 transform transition duration-300 hover:scale-105 hover:bg-yellow-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 text-white p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <EditOrderForm
          order={editingOrder}
          onCancelEdit={handleCancelEdit}
          onOrderUpdated={fetchOrders} // Fetch orders to update the list after editing
        />
      )}

      {isAdding && (
        <AddOrderForm
          onCancelAdd={handleCancelAdd}
          onOrderAdded={fetchOrders} // Fetch orders to update the list after adding
        />
      )}
    </div>
  );
}

