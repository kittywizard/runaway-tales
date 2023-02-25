import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/Dashboard';
import Settings from './components/auth/Settings';
import Main from "./Main";
import { AuthProvider } from "./AuthContext";
import Auth from './Auth';
import LayoutWrapper from './LayoutWrapper';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
          <Routes>
            <Route element={<LayoutWrapper />}>
              <Route path="/" element={<Main/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/dashboard" element={<Dashboard/>}>
                <Route path="/dashboard/settings" element={<Settings />}/>
              </Route>
            </Route>
          </Routes>
    </AuthProvider>
  </BrowserRouter>
);
