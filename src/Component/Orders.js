import React, { useEffect, useState } from "react";
import axios from "axios";
import './Orders.css';
import { 
    Card,
    Button,
} from 'react-bootstrap';

function Orders(){
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://restapi-tjap.onrender.com/api/orders')
        .then(response => {
            setOrders(response.data);
            setLoading(false);
            console.log(setOrders);
        })
        .catch(error => {
            console.log('Error fetching order: ', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="conLoad">
                <div className="loader">
                    Loading
                    <span></span>
                </div>
            </div>
        )
    }

    return(
        <div className="Page">
           <h1>Show Orders</h1>
            <div className="Container">
                {orders.map(order => (
                    <Card key={order._id} className="cardOrders">
                        <h3>ลูกค้า: {order.cusName}</h3>
                        <p>ที่อยู่: {order.cusAddress}</p>
                        <p>{order.orderUnit} ชุด</p>
                        <p> ส่ง: {order.dateDelivery}</p>
                        <p>สถานะ: {order.orderStatus}</p>
                        <p><Button>จัดการออเดอร์</Button></p>
                        <footer className="cardFooter">สร้าง {order.orderDate}</footer>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Orders;