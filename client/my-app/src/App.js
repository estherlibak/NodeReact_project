import logo from './logo.svg';
import React, { useState } from 'react';
import Home from './components/home/User';
import HomeManager from './components/home/Manager';
import LoginDemo from './components/logIn/LogIn'
import EmptyPage from './components/Empy';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AllApartments from './components/user_apartments/AllApartments';
import MyApartments from './components/user_apartments/MyApartments';
import MyFavorite from './components/user_apartments/MyFavoriteApartment';
import ConfirmedApartments from './components/manager_apartments/ConfirmedApartments';
import UnConfirmApartments from './components/manager_apartments/UnConfirmedApartments';
import Users from './components/manager_apartments/Users'

// import './App.css';

function App() {
  const { token, role, user } = useSelector((state) => state.token);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {role == "User" ? <Home></Home> : role == "Manager" ? <HomeManager></HomeManager> : <></>}

      <Routes>
        {/* נתיב ברירת מחדל לדף ההתחברות */}
        <Route path='/' element={<LoginDemo />} />

        {/* נתיב לדף הבית */}
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/allApartments' element={<AllApartments />} />
        <Route path='/myApartments' element={<MyApartments />} />
        <Route path ='/myFavorite' element={<MyFavorite/>}/>

        <Route path='/ConfimedApartments' element={<ConfirmedApartments/>}/>
        <Route path='/UnConfirmApartments' element={<UnConfirmApartments/>}/>
        <Route path='/Users' element={<Users/>}/>


        {/* נתיב לדף ריק */}
        <Route path='/empty' element={<EmptyPage />} />
      </Routes>
    </>

  );
}

export default App;
