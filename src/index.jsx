import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./auth/AuthContext";
import AuthRoute from './auth/AuthRoute';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Settings from './components/auth/Settings';
import PasswordReset from "./components/auth/PasswordReset";
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
                <Route path="/dashboard/settings/update-password" element={<PasswordReset/>} />
              </Route>
            </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
          </Routes>
    </AuthProvider>
  </BrowserRouter>
);
