import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import ProductDetailPage from './components/ProductDetailPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 