import React, { useEffect, useState } from "react";
import axios from "axios";
import './Orders.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { 
    Card,
    Button,
} from 'react-bootstrap';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        axios.get('https://restapi-tjap.onrender.com/api/orders')
        .then(response => {
            setOrders(response.data);
            setLoading(false);
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
        );
    }

    const handleShowPopup = (order) => {
        setShowPopup(true);
        setSelectedOrder(order);
    }
    
    // เมื่อต้องการซ่อน popup
    const handleClosePopup = () => {
        setShowPopup(false);
    }
    

    const pendingOrders = orders.filter(order => order.orderStatus === 'รอดำเนินการ');

    const handleFinishOrder = async () => {
        try {
            if (selectedOrder) {
                await axios.put(`https://restapi-tjap.onrender.com/api/orders/${selectedOrder._id}`, {
                    orderStatus: 'เสร็จสิ้น'
                });
    
                setOrders(prevOrders => prevOrders.map(order => {
                    if (order._id === selectedOrder._id) {
                        return { ...order, orderStatus: 'เสร็จสิ้น' };
                    }
                    return order;
                }));
    
                setShowPopup(false);
            }
        } catch (error) {
            console.error('Error finishing order:', error);
        }
    }

    return (
        <div className="Page">
            <h1>ออเดอร์ทั้งหมด</h1>
            <div className="Container">
                {pendingOrders.length > 0 ? (
                    pendingOrders.map(order => (
                    <Card key={order._id} className="cardOrders">
                        <h3>ลูกค้า: {order.cusName}</h3>
                        <p>ที่อยู่: {order.cusAddress}</p>
                        <p>{order.orderUnit} ชุด</p>
                        <p>ติดต่อ: {order.cusPhone}</p>
                        <p> ส่ง: {order.dateDelivery}</p>
                        <p>สถานะ: {order.orderStatus}</p>
                        <div className="conBtnConfig">
                            <Button variant="outlined" className="btnConfig" onClick={() => handleShowPopup(order)}>
                                <SettingsOutlinedIcon />
                                จัดการ
                            </Button>
                        </div>
                    </Card>
                )) 
            ) : (
                <p><h1>- ยังไม่มีออเดอร์ -</h1></p>
            )}
                {}
            </div>
            {showPopup && (
                <div className="popup show-popup" onClick={handleClosePopup}>
                    <Card className="popup-content">
                        <h2>ต้องการจัดการออเดอร์อย่างไร</h2>
                        <div className="conBtnSubConfig">
                            <Button className="btnFinish" onClick={handleFinishOrder}>เสร็จสิ้น</Button>
                            <Button className="btnEdit" onClick={handleClosePopup}>แก้ไข</Button>  
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default Orders;