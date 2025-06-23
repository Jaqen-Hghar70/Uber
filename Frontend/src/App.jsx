import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/start';
import UserLogin from './pages/userLogin';
import UserSignup from './pages/userSignUp';
import Captainlogin from './pages/captainLogin';
import CaptainSignUp from './pages/captainSignUp';
import Home from './pages/Home';
import UserProtectedWrapper from './pages/userProtectedWrapper';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/home" element={<UserProtectedWrapper><Home /></UserProtectedWrapper>} />
      </Routes>
    </div>
  )
}

export default App