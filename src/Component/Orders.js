import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://restapi-tjap.onrender.com/api/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching order: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div class="loader">
        <span class="l">L</span>
        <span class="o">o</span>
        <span class="a">a</span>
        <span class="d">d</span>
        <span class="i">i</span>
        <span class="n">n</span>
        <span class="g">g</span>
        <span class="d1">.</span>
        <span class="d2">.</span>
      </div>
    );
  }

  const handleFinishOrder = async () => {
    try {
      if (selectedOrder) {
        // ทำการอัปเดตสถานะออเดอร์ที่นี่
        await axios.put(`https://restapi-tjap.onrender.com/api/orders/${selectedOrder._id}`, { orderStatus: "เสร็จสิ้น" });
        // handleClosePopup();
      }
    } catch (error) {
      console.error("Error finishing order:", error);
    }
  };

  const popupConfig = (order) => {
    Swal.fire({
      title: `ลูกค้า "${order.cusName}"`,
      text: 'จัดการออเดอร์นี้อย่างไร ?',
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "เสร็จสิ้น",
      denyButtonText: `แก้ไข`,
  closeButtonText: "ลบ"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("ออเดอร์สถานะเสร็จสิ้น !", "", "success");
        handleFinishOrder();
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
        handleEditOrder(order);
      }
    });
  }

  const handleShowPopup = (order) => {
    if (order) {
      popupConfig(order);
      setSelectedOrder(order);
    }
  };

  
  const handleEditOrder = (order) => {
    navigate("/edit" ,{ state: { order } }); // เปลี่ยนเส้นทางไปยัง EditPage component
  };

  const pendingOrders = orders.filter((order) => order.orderStatus === "รอดำเนินการ");

  return (
    <div className="Page">
      <div className="header">
        <h1>ออเดอร์ทั้งหมด</h1>
      </div>
      <div className="Container">
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order) => (
            <Card key={order._id} className="cardOrders">
              <Card.Body>
                <Card.Title className="cTitle">
                  <PersonOutlineOutlinedIcon className="customerIcon" sx={{ fontSize: 45 }} />
                  <h3>{order.cusName}</h3>
                </Card.Title>
                <Card.Text className="cardText">
                  <div className="textContainer">
                    <span>
                      <MapOutlinedIcon sx={{ fontSize: 45 }} />
                    </span>
                    <h5>{order.cusAddress}</h5>
                  </div>
                  <div className="textContainer">
                    <span>
                      <ArticleOutlinedIcon sx={{ fontSize: 45 }} />
                    </span>
                    <h5>{order.orderUnit} ชุด</h5>
                  </div>
                  <div className="textContainer">
                    <span>
                      <PhoneAndroidOutlinedIcon sx={{ fontSize: 45 }} />
                    </span>
                    <h5>{order.cusPhone}</h5>
                  </div>
                  <div className="textContainer">
                    <span>
                      <LocalShippingOutlinedIcon sx={{ fontSize: 45 }} />
                    </span>
                    <h5>{order.dateDelivery}</h5>
                  </div>
                  <div className="textContainer">
                    <span>
                      <FactCheckOutlinedIcon sx={{ fontSize: 45 }} />
                    </span>
                    <h5>{order.orderStatus}</h5>
                  </div>
                </Card.Text>
              </Card.Body>
              <div className="conBtnConfig">
                <button title="filter" class="filter" onClick={() => handleShowPopup(order)}>
                  <svg viewBox="0 0 512 512" height="1em">
                    <path
                      d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
                    ></path>
                  </svg>
                </button>
              </div>
            </Card>
          ))
        ) : (
          <p>
            <h1>- ยังไม่มีออเดอร์ -</h1>
          </p>
        )}
      </div>
    </div>
  );
}

export default Orders;