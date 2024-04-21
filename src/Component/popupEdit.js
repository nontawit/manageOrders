import React from "react";
import { Button, Card } from "react-bootstrap";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './popupEdit.css'


function PopupEdit({ handleClosePopupEdit}) {

    return (
    <div className="popEdit show-popEdit">
        <div className="conBtnClose">        
            <span><CloseOutlinedIcon className="btnClose" sx={{ fontSize: 30 }} onClick={handleClosePopupEdit} /></span>
        </div>
      <div className="popup-content">
        <Card>
             <Button className="btn">
                <span><EditOutlinedIcon sx={{ fontSize: 30 }} /></span>
                <h5>แก้ไขออเดอร์</h5>
            </Button>
            <Button className="btn">
                <span><DeleteOutlinedIcon sx={{ fontSize: 30 }} /></span>
                <h5>ลบออเดอร์</h5>
            </Button>
        </Card>
      </div>

    </div>
  );
}

export default PopupEdit;