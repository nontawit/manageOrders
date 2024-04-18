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
        setSelectedOrder(order); // เก็บ order ที่ถูกเลือกไว้
    }
    const handleClosePopup = () => {
        setShowPopup(false); 
    }

    const pendingOrders = orders.filter(order => order.orderStatus === 'รอดำเนินการ');

    const handleFinishOrder = async () => {
        try {
            // ส่งคำร้องขอแก้ไขฟิลด์ orderStatus ไปยัง API
            await axios.put(`https://restapi-tjap.onrender.com/api/orders/${selectedOrder._id}`, {
                orderStatus: 'เสร็จสิ้น'
            });

            // อัปเดต orders ใหม่โดยไม่รวม order ที่เป็นเสร็จสิ้นแล้ว
            setOrders(prevOrders => prevOrders.filter(order => order._id !== selectedOrder._id));
            
            // ปิด popup
            setShowPopup(false);
        } catch (error) {
            console.error('Error finishing order:', error);
            // แสดงข้อผิดพลาดหรือดำเนินการเพิ่มเติมตามความเหมาะสม
        }
    }

    return (
        <div className="Page">
            <h1>Show Orders</h1>
            <div className="Container">
                {pendingOrders.map(order => (
                    <Card key={order._id} className="cardOrders">
                        <h3>ลูกค้า: {order.cusName}</h3>
                        <p>ที่อยู่: {order.cusAddress}</p>
                        <p>{order.orderUnit} ชุด</p>
                        <p> ส่ง: {order.dateDelivery}</p>
                        <p>สถานะ: {order.orderStatus}</p>
                        <div className="conBtnConfig">
                            <Button variant="outlined" className="btnConfig" onClick={() => handleShowPopup(order)}>
                                <SettingsOutlinedIcon />
                                จัดการ
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
            {showPopup && (
                <div className="popup" onClick={handleClosePopup}>
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