import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Orders from "./Component/Orders"; // นำเข้า Orders component หรือ component หลักของคุณ
import EditPage from "./Component/EditPage"; // นำเข้า EditPage component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Orders />} /> {/* สร้างเส้นทางสำหรับ Orders component */}
        <Route path="/edit" element={<EditPage />} /> {/* สร้างเส้นทางสำหรับ EditPage component */}
      </Routes>
    </Router>
  );
}

export default App;