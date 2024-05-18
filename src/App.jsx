import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import MainOrder from './components/MainOrder.jsx'; 
import Orders from './components/Orders.jsx'; 

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/main-order" element={<MainOrder />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
