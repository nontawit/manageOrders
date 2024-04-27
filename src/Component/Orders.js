import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { Card, Button } from "react-bootstrap";
import PopupConfig from "./popupConfig";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopupConfig, setShowPopupConfig] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      <div className="conLoader">
        <div className="txtLoader">กำลังประมวลผล.....</div>
        <div className="loader"></div>
      </div>
    );
  }

  const handleShowPopup = (order) => {
    if (order) {
      setShowPopupConfig(true);
      setSelectedOrder(order);
    }
  };

  const handleClosePopup = () => {
    setShowPopupConfig(false);
    setSelectedOrder(null);
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
                <Button
                  variant="outlined"
                  className="btnConfig"
                  onClick={() => handleShowPopup(order)}
                >
                <span><SettingsOutlinedIcon sx={{ fontSize: 30 }}/></span>
                  จัดการ
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p>
            <h1>- ยังไม่มีออเดอร์ -</h1>
          </p>
        )}
      </div>
      <PopupConfig
        showPopupConfig={showPopupConfig}
        handleClosePopup={handleClosePopup}
        selectedOrder={selectedOrder}
        setShowPopup={setShowPopupConfig}
      />
    </div>
  );
}

export default Orders;