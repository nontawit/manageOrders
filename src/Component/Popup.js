import React from 'react';
import './Popup.css';
import { Button } from 'react-bootstrap';

const Popup = ({ show, handleClose, handleFinishOrder }) => {
    return (
        <div className={show ? "popup show-popup" : "popup"} onClick={handleClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>ต้องการจัดการออเดอร์อย่างไร</h2>
                <div className="conBtnSubConfig">
                    <Button className="btnFinish" onClick={handleFinishOrder}>เสร็จสิ้น</Button>
                    <Button className="btnEdit" onClick={handleClose}>แก้ไข</Button>  
                </div>
            </div>
        </div>
    );
}

export default Popup;