import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './EditPage.css';
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function EditPage() {
  const location = useLocation();
  const order = location.state && location.state.order;

  const navigate = useNavigate();

  const handleCancel = () => {
    // กลับไปยังหน้าหลัก (Orders)
    navigate("/");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://restapi-tjap.onrender.com/api/orders/${order._id}`);
      console.log('ลบออเดอร์สำเร็จ');
      navigate("/");
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบออเดอร์:', error);
    }
  };

  const popupDelete = () => {
    console.log('popup delete')
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `ลูกค้า "${order.cusName}"`,
      text: "ต้องการลบออเดอร์นี้หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบออเดอร์!",
      cancelButtonText: "ไม่, ยกเลิก!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "ลบเสร็จสิ้น!",
          text: `ลบออเดอร์ "${order.cusName} เรียบร้อย"`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        });
        handleDelete(order._id);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "ยกเลิก",
          text: `ยังไม่ต้องการลบออเดอร์ "${order.cusName}"`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  } 

 
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
        <Button variant="success">บันทึก</Button>
        <Button variant="danger" onClick={popupDelete}>ลบ</Button>
        <Button  onClick={handleCancel}>ยกเลิก</Button>
      </form>
    </div>
  );
}

export default EditPage;