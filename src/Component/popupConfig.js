import React, { useState } from "react";
import "./popupConfig.css";
import { Button } from "react-bootstrap";
import PopupEdit from "./popupEdit";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Popup = ({ show, handleClosePopup, selectedOrder, setShowPopup }) => {
  const [showPopupEdit, setShowPopupEdit] = useState(false);

  const handleShowPopupEdit = () => {
    if (setShowPopup) {
        setShowPopupEdit(true);
    }
  };


  const handleClosePopupEdit = () => {
    setShowPopupEdit(false);
    setShowPopup(false);
  };

  const handleFinishOrder = async () => {
    try {
      if (selectedOrder) {
        // ... (โค้ดสำหรับการอัปเดตสถานะออเดอร์)
        handleClosePopup();
      }
    } catch (error) {
      console.error("Error finishing order:", error);
    }
  };

  if (!show || !selectedOrder) {
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
          <Button className="btnEdit" onClick={handleShowPopupEdit}>
            แก้ไข
          </Button>
        </div>

        {showPopupEdit && (
          <PopupEdit
            handleClosePopupEdit={handleClosePopupEdit}
            setShowPopupEdit={setShowPopupEdit}
            selectedOrder={selectedOrder}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;