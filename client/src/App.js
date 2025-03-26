import React, {useState, useEffect} from 'react';
import NavBar from './components/nav_bar/nav_bar.js';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductPage from './pages/product_page.js';
import HomePage from './pages/homepage.js';
import SignIn from './pages/sign_in.js';
import Register from './pages/register.js';
import ChangePassword from './pages/change_password.js';

function App() {

  return (
      <>
        <NavBar/>
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:product_id" element={<ProductPage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </>
  )
}

export default App;