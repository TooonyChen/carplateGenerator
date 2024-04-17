import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlateGeneratePage from "./pages/PlateGeneratePage";
import PDFPage from "./pages/PDFPage";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/generate" element={<PlateGeneratePage />} />
          <Route path="/pdf" element={<PDFPage />} />
          {/* 其他路由 */}
        </Routes>
      </Router>
  );
}

export default App;
