import React from "react";
import { useNavigate } from "react-router-dom";
import "./popupConfig.css";
import { Button } from "react-bootstrap";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from "axios"; // import axios for HTTP requests
import Swal from "sweetalert2";

const Popup = ({ showPopupConfig, handleClosePopup, selectedOrder, setShowPopup }) => {
  
  // const navigate = useNavigate(); 
   
  // const handleEditOrder = () => {
  //   navigate("/edit"); // เปลี่ยนเส้นทางไปยัง EditPage component
  //   handleClosePopup(); // ปิด PopupConfig
  // };

  const pConfig = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

 
  const handleFinishOrder = async () => {
    try {
      if (selectedOrder) {
        // ทำการอัปเดตสถานะออเดอร์ที่นี่
        await axios.put(`https://restapi-tjap.onrender.com/api/orders/${selectedOrder._id}`, { orderStatus: "เสร็จสิ้น" });
        handleClosePopup();
      }
    } catch (error) {
      console.error("Error finishing order:", error);
    }
  };

  if (!showPopupConfig || !selectedOrder) {
    return null;
  }

  return (
    
    <div className="popConfig show-popConfig">
        <div className="conBtnClose">        
            <span><CloseOutlinedIcon className="btnClose" sx={{ fontSize: 30 }} onClick={handleClosePopup} /></span>
        </div>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>ต้องการจัดการออเดอร์อย่างไร</h2>
        <div className="conBtnSubConfig">
          <Button className="btnFinish" onClick={handleFinishOrder}>
            เสร็จสิ้น
          </Button>
          <Button className="btnEdit" onClick={() => {
            // handleEditOrder();
            pConfig();
          }} >
            แก้ไข
          </Button>
        </div>
         
      
      </div>
    </div>
  );
};

export default Popup;