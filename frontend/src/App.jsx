import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Signup from './components/RegisterForm';
import ProfileCard from './components/LoginForm';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-cyan-500">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <ProfileCard />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
