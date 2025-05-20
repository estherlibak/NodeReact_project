import logo from './logo.svg';
import React, { useState } from 'react';
import Home from './components/Home'
import LoginDemo from './components/logIn/LogIn'
import EmptyPage from './components/Empy';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AllApartments from './components/apartments/AllApartments';
import MyApartments from './components/apartments/MyApartments';
// import './App.css';

function App() {
  const { token, role, user } = useSelector((state) => state.token);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {role == "User" ? <Home></Home> : role == "User" ? <Home></Home> : <></>}

      <Routes>
        {/* נתיב ברירת מחדל לדף ההתחברות */}
        <Route path='/' element={role === "User" ? <Navigate to="/home" /> : <LoginDemo />} />

        {/* נתיב לדף הבית */}
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/allApartments' element={<AllApartments />} />
        <Route path='/myApartments' element={<MyApartments />} />

        {/* נתיב לדף ריק */}
        <Route path='/empty' element={<EmptyPage />} />
      </Routes>
    </>

  );
}

export default App;
