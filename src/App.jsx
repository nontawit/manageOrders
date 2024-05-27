import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainOrder from './components/MainOrder';
import Orders from './components/Orders';
import AddOrder from './components/AddOrder';
import EditOrder from './components/EditOrder';
import Navbar from './components/Navbar';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><MainOrder /></>} />
        <Route path="/orders" element={<><Navbar /><Orders /></>} />
        <Route path="/add-order" element={<><Navbar /><AddOrder /></>} />
        <Route path="/edit-order/:id" element={<><Navbar /><EditOrder /></>} />
      </Routes>
    </Router>
  );
};

export default App;
