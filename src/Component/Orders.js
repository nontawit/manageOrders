import React, { useEffect, useState } from "react";
import axios from "axios";
import './Orders.css';

function Orders(){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('https://restapi-tjap.onrender.com/api/orders')
        .then(response => {
            setOrders(response.data);
            console.log(setOrders);
        })
        .catch(error => {
            console.log('Error fetching order: ', error);
        });
    }, []);

    return(
        <div>
            <h1>Show orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <div className="Container">
                            <div>
                                ชื่อลูกค้า: {order.cusName}
                            </div>
                            <div>
                                ที่อยู่: {order.cusAddress}
                            </div>
                            <div>
                                เบอร์โทร: {order.cusPhone}
                            </div>
                            <div>
                                จำนวน: {order.orderUnit} ชุด
                            </div>
                            <div>
                                วันที่รับออเดอร์: {order.orderDate}
                            </div>
                            <div>
                                วันที่ส่ง: {order.dateDelivery}
                            </div>
                            <div>
                                สถานะ: {order.orderStatus}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Orders;