import React, { useEffect, useState } from "react";
import axios from "axios";
import './Orders.css';
import { 
    Card,
    Button,
} from 'react-bootstrap';

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
           <h1>Show Orders</h1>
            {orders.map(order => (
                <div className="Container">
                    <Card key={order._id} className="cardOrders">
                        <h3>ลูกค้า: {order.cusName}</h3>
                        <p>ที่อยู่: {order.cusAddress}</p>
                        <p>{order.orderUnit} ชุด</p>
                        <p> ส่ง: {order.dateDelivery}</p>
                        <p>สถานะ: {order.orderStatus}</p>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default Orders;