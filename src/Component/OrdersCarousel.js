import React, { useEffect, useState } from "react";
import axios from "axios";
import './Orders.css';
import CarouselCard from "./CarouselCard";

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
           <CarouselCard orders={orders}/>
        </div>
    )
}

export default Orders;