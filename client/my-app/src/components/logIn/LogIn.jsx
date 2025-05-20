import React, { useState } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import SignUp from './SignUp';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import EmptyPage from '../Empy';
import Home from '../Home';
import axios from 'axios';
import { setUser } from '../../redux/tokenSlice';
import { setToken } from '../../redux/tokenSlice';
import { setRole } from '../../redux/tokenSlice';
import { logOut } from '../../redux/tokenSlice';
import { useEffect } from 'react';

export default function LoginDemo() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false); // ניהול הצגת קומפוננטת ההרשמה
    const navigate = useNavigate(); // יצירת פונקציית ניווט
    const dispatch=useDispatch();

    const handleLogin = () => {
        // שליחת בקשה לשרת
        axios.post('http://localhost:1100/api/auth/login', {
            username,
            password
        })
            .then((response) => {
                dispatch(setUser(response.data.user)); // עדכון הסטור של המשתמש
                dispatch(setToken(response.data.accessToken)); // עדכון הסטור של הטוקן
                dispatch(setRole(response.data.role)); // עדכון הסטור של התפקיד
                console.log('Token:', response.data.accessToken);
                // setIsLoggedIn(true); // עדכון מצב הכניסה
                navigate('/allApartments'); // נווט לדף הבית

                // נווט לדף הבית
                // if (!response.ok) {
                //     throw new Error('Invalid credentials');
                // }
                // return response.json();
            })
            .then((data) => {
                console.log('Login successful:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText
                            id="username"
                            type="text"
                            className="w-12rem"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText
                            id="password"
                            type="password"
                            className="w-12rem"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        label="Login"
                        icon="pi pi-user"
                        className="w-10rem mx-auto"
                        onClick={handleLogin
                        }
                    ></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    {/* <Button
                        label="Sign Up"
                        icon="pi pi-user-plus"
                        severity="success"
                        className="w-10rem"
                        onClick={() => SignUp(true)} // הצגת קומפוננטת ההרשמה
                    ></Button>
                     */}
                    <SignUp /> {/* הצגת קומפוננטת ההרשמה */}
                </div>
            </div>
            {/* הצגת קומפוננטת ההרשמה */}
        </div>
    );
}