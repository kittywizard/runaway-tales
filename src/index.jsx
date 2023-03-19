import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import AuthRoute from './AuthRoute';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Settings from './components/auth/Settings';
import Main from "./Main";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Main/>}/>
              <Route path="/dashboard" element={<Dashboard/>}>
                <Route path="/dashboard/settings" element={<Settings />}/>
              </Route>
            </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
          </Routes>
    </AuthProvider>
  </BrowserRouter>
);
