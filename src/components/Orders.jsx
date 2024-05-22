import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography, CircularProgress, useMediaQuery, useTheme, IconButton
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import PhoneIphoneTwoTone from '@mui/icons-material/PhoneIphoneTwoTone';
import MoreHorizTwoTone from '@mui/icons-material/MoreHorizTwoTone';
import { useNavigate } from 'react-router-dom';

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(year - 543, month - 1, day); // year - 543 สำหรับปีพุทธศักราช
};

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  fontWeight: 'bold',
  padding: theme.spacing(1),
  textAlign: 'center',
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://restapi-tjap.onrender.com/api/orders')
      .then(response => {
        const sortedOrders = response.data.sort((a, b) => parseDate(b.dateDelivery) - parseDate(a.dateDelivery));
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-order/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error">Error fetching data: {error.message}</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ textAlign: 'center', mb: 2, mt: 10 }}>
        <Typography variant="h4" gutterBottom>All Orders</Typography>
      </Box>
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
    </ThemeProvider>
  );
};

export default Orders;
