import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import ProductDetails from './components/Products/ProductDetails';
import AuthContextProvider from './contexts/AuthContext';
import ProductsContextProvider from './contexts/ProductContext';
import Auth from './components/Auth/Auth';
const MainRoutes = () => {
  return (
    <ProductsContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ProductsContextProvider >
  );
};

export default MainRoutes;