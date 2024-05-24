import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainOrder from './components/MainOrder';
import PinLogin from './components/PinLogin';
import Orders from './components/Orders';
import AddOrder from './components/AddOrder';
import EditOrder from './components/EditOrder';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PinLogin />} />
        <Route path="/main-order" element={<><Navbar /><MainOrder /></>} />
        <Route path="/orders" element={<><Navbar /><Orders /></>} />
        <Route path="/add-order" element={<><Navbar /><AddOrder /></>} />
        <Route path="/edit-order/:id" element={<><Navbar /><EditOrder /></>} />
      </Routes>
    </Router>
  );
};

export default App;
