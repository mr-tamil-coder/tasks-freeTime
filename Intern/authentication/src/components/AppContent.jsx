import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import Login from './Auth/Login';
import PrivateRoute from './Auth/PrivateRoute';
import Products from './Products/Products';
import ProductDetail from './Products/ProductDetail';
import ProductForm from './Products/ProductForm';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 p-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route   
            path="/" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/products/add" 
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/products/edit/:id" 
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/products/:id" 
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>

      <footer className="bg-black p-8 text-center text-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <p>© Buy it! Enjoy it!</p>
      </footer>
    </div>
  );
}

export default AppContent;
