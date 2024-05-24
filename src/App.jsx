import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import MainOrder from './components/MainOrder.jsx'; 
import Orders from './components/Orders.jsx';
import EditOrder from './components/EditOrder.jsx';
import AddOrder from './components/AddOrder.jsx';
import PinLogin from './components/PinLogin.jsx';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<PinLogin />} />
            <Route path="/main-order" element={<MainOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/edit-order/:id" element={<EditOrder />} />
            <Route path="/add-order" element={<AddOrder />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
