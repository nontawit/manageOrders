import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SaveTwoTone, DeleteTwoTone, CancelTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '600px',
  margin: 'auto',
  marginTop: theme.spacing(10),
}));

const EditOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูล Order จาก API
    axios.get(`https://restapi-tjap.onrender.com/api/orders/${id}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        console.error('Error fetching order:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSave = () => {
    axios.put(`https://restapi-tjap.onrender.com/api/orders/${id}`, order)
      .then(response => {
        alert('Order updated successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating order:', error);
        alert('Failed to update order');
      });
  };
  
  const handleDelete = () => {
    axios.delete(`https://restapi-tjap.onrender.com/api/orders/${id}`)
      .then(response => {
        alert('Order deleted successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  // แสดงโค้ดฟอร์มเมื่อข้อมูล Order ถูกโหลดเสร็จเรียบร้อยแล้ว
  if (!order) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <FormContainer>
      <Typography variant="h4">Edit Order</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Customer Name"
            name="cusName"
            value={order.cusName}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Customer Address"
            name="cusAddress"
            value={order.cusAddress}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Customer Phone"
            name="cusPhone"
            value={order.cusPhone}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Order Unit"
            name="orderUnit"
            value={order.orderUnit}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Delivery Date"
            name="dateDelivery"
            value={order.dateDelivery}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Order Status"
            name="orderStatus"
            value={order.orderStatus}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveTwoTone />}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteTwoTone />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<CancelTwoTone />}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </FormContainer>
  );
};

export default EditOrder;
