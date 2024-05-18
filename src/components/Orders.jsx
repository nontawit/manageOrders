import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar, Box, Paper, Table, TableBody, TableCell, TableHead,
  TableRow, Typography, CircularProgress, useMediaQuery, useTheme
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(year - 543, month - 1, day); // year - 543 สำหรับปีพุทธศักราช
};

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled('div')(({ status, theme }) => ({
  padding: theme.spacing(0.5, 2),
  borderRadius: '16px',  // ขอบมน
  display: 'inline-block',
  color: theme.palette.common.white,
  backgroundColor: status === 'Pending' ? theme.palette.info.main : 
                    status === 'Success' ? theme.palette.success.main : 
                    theme.palette.grey[400],
  textAlign: 'center',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',  // ป้องกันการขึ้นบรรทัดใหม่
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error fetching data: {error.message}</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{display: 'flex', justifyContent: 'start', mt: 10}}>
      <Typography variant="h4" gutterBottom>All Orders</Typography>
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Paper sx={{ width: '100%', overflowX: 'auto', mx: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Telephone</StyledTableCell>
                <StyledTableCell>Unit</StyledTableCell>
                <StyledTableCell>Delivery</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order.id}>
                  <StyledTableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar alt={order.cusName} src="https://via.placeholder.com/150" sx={{ marginRight: 2 }} />
                      <Box>
                        <Typography variant="body1" fontWeight="bold">{order.cusName}</Typography>
                        <Typography variant="body2" color="textSecondary">{order.cusAddress}</Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{order.cusPhone}</StyledTableCell>
                  <StyledTableCell>{order.orderUnit}</StyledTableCell>
                  <StyledTableCell>{parseDate(order.dateDelivery).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusChip status={order.orderStatus}>
                      {order.orderStatus}
                    </StatusChip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Orders;
