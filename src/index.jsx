import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/auth/Dashboard';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./Main";
import { AuthProvider } from "./AuthContext";
import Auth from './Auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <div className="container mx-auto">
        <Header/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        <Footer />
      </div>
    </AuthProvider>
  </BrowserRouter>
);
