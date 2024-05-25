import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const AddOrder = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    // แปลงค่าปีให้เป็น พ.ศ. (Thai Buddhist Era)
    const dateParts = formDataObj["dateDelivery"].split("-");
    const thaiYear = parseInt(dateParts[0]) + 543;
    formDataObj["dateDelivery"] = `${dateParts[2]}/${dateParts[1]}/${thaiYear}`;

    // ส่งข้อมูลใหม่ไปยัง API
    axios.post('https://restapi-tjap.onrender.com/api/orders', formDataObj)
      .then(response => {
        alert('Order added successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error adding order:', error);
        alert('Failed to add order');
      });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Add Order</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="cusName" label="Customer Name" fullWidth sx={{ marginBottom: 1 }} required />
        <TextField name="cusAddress" label="Customer Address" fullWidth sx={{ marginBottom: 1 }} required />
        <TextField name="cusPhone" label="Customer Phone" fullWidth sx={{ marginBottom: 1 }} required />
        <TextField name="orderUnit" label="Order Unit" fullWidth sx={{ marginBottom: 1 }} required />
        <TextField
          name="dateDelivery"
          label="Delivery Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
          required
        />
        <Button type="submit" variant="contained" sx={{ marginRight: 1 }}>Add</Button>
        <Button variant="outlined" component={Link} to="/main-order" sx={{ marginLeft: 1 }}>Cancel</Button>
      </form>
    </Box>
  );
};

export default AddOrder;
