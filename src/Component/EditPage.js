import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './EditPage.css';

function EditPage() {
  const location = useLocation();
  const order = location.state && location.state.order;

  const navigate = useNavigate();

  const handleCancel = () => {
    // กลับไปยังหน้าหลัก (Orders)
    navigate("/");
  };

  return (
    <div className="container">
      <h2>แก้ไขออเดอร์ลูกค้า {order && order.cusName}</h2>
      <form>
        <label>
          ลูกค้า:
          <input type="text" value={order && order.cusName} />
        </label>
        <label>
          ที่อยู่:
          <input type="text" value={order && order.cusAddress} />
        </label>
        <label>
          จำนวน:
          <input type="text" value={order && order.orderUnit} />
        </label>
        <label>
          เบอร์โทร:
          <input type="text" value={order && order.cusPhone} />
        </label>
        <label>
          วันที่ส่ง:
          <input type="text" value={order && order.dateDelivery}/>
        </label>
        <button type="submit">บันทึก</button>
        <button onClick={handleCancel}>ยกเลิก</button>
      </form>
    </div>
  );
}

export default EditPage;