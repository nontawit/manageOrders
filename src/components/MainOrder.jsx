import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography, CircularProgress, useMediaQuery, useTheme, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import PhoneIphoneTwoTone from '@mui/icons-material/PhoneIphoneTwoTone';
import DoneTwoTone from '@mui/icons-material/DoneTwoTone';
import MoreHorizTwoTone from '@mui/icons-material/MoreHorizTwoTone';
import { Link } from 'react-router-dom';

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(year - 543, month - 1, day); // year - 543 สำหรับปีพุทธศักราช
};

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  fontWeight: 'bold',
  padding: theme.spacing(1),
  textAlign: 'center', // Center align the text
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled('div')(({ status, theme }) => ({
  padding: theme.spacing(0.5, 2),
  borderRadius: '16px',
  display: 'inline-block',
  color: theme.palette.common.white,
  backgroundColor: status === 'Pending' ? theme.palette.info.main : 
                    status === 'Success' ? theme.palette.success.main : 
                    theme.palette.grey[400],
  textAlign: 'center',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
}));

const MainOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get('https://restapi-tjap.onrender.com/api/orders')
      .then(response => {
        const pendingOrders = response.data.filter(order => order.orderStatus === 'Pending');
        const sortedOrders = pendingOrders.sort((a, b) => parseDate(b.dateDelivery) - parseDate(a.dateDelivery));
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id) => {
    setSelectedOrderId(id);
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (selectedOrderId) {
      axios.put(`https://restapi-tjap.onrender.com/api/orders/${selectedOrderId}`, { orderStatus: 'Success' })
        .then(response => {
          // อัพเดตสถานะในตัวแปร orders
          const updatedOrders = orders.map(order => {
            if (order.id === selectedOrderId) {
              return { ...order, orderStatus: 'Success' };
            }
            return order;
          });
          setOrders(updatedOrders);
          // แสดงข้อความยืนยัน
          alert('อัพเดทสถานะเป็น Success แล้ว');
          window.location.reload();
        })
        .catch(error => {
          console.error('Error updating order status:', error);
          alert('ไม่สามารถอัพเดทสถานะได้');
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    // Implement the edit logic here
    console.log('Edit order ID:', id);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error fetching data: {error.message}</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ textAlign: 'center', mb: 2, mt: 10 }}>
        <Typography variant="h4" gutterBottom>Pending Orders</Typography>
      </Box>
      {orders.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" color="success">Orders Successfully !!</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ maxWidth: isMobile ? '100%' : '80%' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Unit</StyledTableCell>
                  <StyledTableCell>Delivery</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell align="left">
                      <Box>
                        <Typography variant="body1" fontWeight="bold">{order.cusName}</Typography>
                        <Typography variant="body2" color="textSecondary">{order.cusAddress}</Typography>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>{order.orderUnit}</StyledTableCell>
                    <StyledTableCell>{parseDate(order.dateDelivery).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell>
                      <StatusChip status={order.orderStatus}>
                        {order.orderStatus}
                      </StatusChip>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton component="a" href={`tel:${order.cusPhone}`} sx={{ margin: '0 4px' }}>
                        <PhoneIphoneTwoTone />
                      </IconButton>
                      <IconButton onClick={() => handleStatusChange(order._id)} sx={{ margin: '0 4px' }}>
                        <DoneTwoTone />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(order._id)} sx={{ margin: '0 4px' }}>
                        <MoreHorizTwoTone />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {/* MUI Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ยืนยันการอัพเดทสถานะ?</DialogTitle>
        <DialogContent>
          <Typography>
            ต้องการอัพเดทสถานะออเดอร์เป็น Success หรือไม่?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default MainOrder;
