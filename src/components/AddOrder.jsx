import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const AddOrder = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    // แปลงค่าปีให้เป็น พ.ศ. (Thai Buddhist Era)
    const dateParts = formDataObj["dateDelivery"].split("-");
    const thaiYear = parseInt(dateParts[0]) + 543;
    formDataObj["dateDelivery"] = `${dateParts[2]}/${dateParts[1]}/${thaiYear}`;

    try {
      // ส่งข้อมูลไปยัง API
      const response = await axios.post('https://restapi-tjap.onrender.com/api/orders', formDataObj);
      console.log('Response:', response.data);
      // ทำการเปลี่ยนหน้าหลังจากบันทึกข้อมูลสำเร็จ
      window.location.href = '/';
    } catch (error) {
      console.error('Error adding order:', error);
      // แสดงข้อความแจ้งเตือนหากมีข้อผิดพลาดในการบันทึกข้อมูล
      alert('Failed to add order. Please try again later.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Add Order</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="cusName" label="Customer Name" fullWidth sx={{ marginBottom: 1 }} />
        <TextField name="cusAddress" label="Customer Address" fullWidth sx={{ marginBottom: 1 }} />
        <TextField name="cusPhone" label="Customer Phone" fullWidth sx={{ marginBottom: 1 }} />
        <TextField name="orderUnit" label="Order Unit" fullWidth sx={{ marginBottom: 1 }} />
        <TextField
          name="dateDelivery"
          label="Delivery Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" color="success" variant="contained" sx={{ marginRight: 1 }}>Add</Button>
        <Button variant="outlined" color="warning" component={Link} to="/" sx={{ marginLeft: 1 }}>Cancel</Button>
      </form>
    </Box>
  );
};

export default AddOrder;
