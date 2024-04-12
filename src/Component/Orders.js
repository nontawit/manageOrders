import React, { useEffect, useState } from "react";
import axios from "axios";

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
                        Name: {order.cusName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Orders;