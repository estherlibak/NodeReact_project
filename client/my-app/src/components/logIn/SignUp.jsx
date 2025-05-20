
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from "axios"; // ייבוא axios לביצוע בקשות HTTP

export default function Sinup() {
    const [visible, setVisible] = useState(false); // ניהול מצב הדיאלוג
    const [name, setName] = useState(''); // ניהול שם מלא
    const [username, setUsername] = useState(''); // ניהול שם המשתמש
    const [password, setPassword] = useState(''); // ניהול הסיסמה
    const [phone, setPhone] = useState(''); // ניהול מספר הטלפון
    const [email, setEmail] = useState(''); // ניהול כתובת האימייל
    // פונקציה לאיפוס השדות
    const resetFields = () => {
        setName('');
        setUsername('');
        setPassword('');
        setPhone('');
        setEmail('');
    };
    // פונקציה לטיפול בהרשמה
    const handleSignUp = async () => {
        // try {
            // console.log('Sending data:', { name, username, password, phone, email });

            // שליחת בקשה לשרת
            const response = await axios.post('http://localhost:1100/api/auth/register', {
                name,
                username,
                password,
                phone,
                email
            });
            console.log('Sign Up successful:', response.data);
            // if (response.status === 200) {
                setVisible(false); // סגירת הדיאלוג לאחר הצלחה
                resetFields(); // איפוס השדות
            // } else {
            //     throw new Error('Failed to sign up');
            // }
        // } catch (error) {
        //     // טיפול בשגיאות
        //     console.error('Error during sign up:', error.response?.data || error.message);
        //     alert('Failed to sign up. Please try again.');
        // }
    };

        // שליחת בקשה לשרת
        // fetch('http://localhost:1100/api/user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, username, password, phone, email }), // שליחת שם משתמש וסיסמה
        // })
        //     .then((response) => {
        //         console.log('Response status:', response.status);

        //         if (!response.ok) {
        //             throw new Error('Failed to sign up');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log('Sign Up successful:', data);
        //         setVisible(false); // סגירת הדיאלוג לאחר הצלחה
        //         resetFields(); // איפוס השדות
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    
    // const [posts, setPosts] = useState([])

    // const fetchPosts = async (data) => {
    //     const all = await axios.get('http://localhost:1100/api/user');
    //     setPosts(all.data);
    //     console.log(all.data)
    // }
    // useEffect(() => {
    //     fetchPosts()
    // }, [])

    return (
        <div className="card flex justify-content-center">
            <Button
                label="Sign Up"
                color="primary"
                icon="pi pi-user-plus"
                onClick={()=>setVisible(true)} // פתיחת הדיאלוג
            //resetFields(); // איפוס השדות לפני פתיחת הדיאלוג
            // setVisible(true); // פתיחת הדיאלוג
            />
            <Dialog
                header="Sign Up"
                visible={visible}
                modal
                onHide={() => {
                    setVisible(false);
                    resetFields(); // איפוס השדות כאשר הדיאלוג נסגר
                }}
            >

                <div className="flex flex-column px-8 py-5 gap-4">
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="name">Name</label>
                        <InputText
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // עדכון שם המשתמש
                            className="w-full"
                        />
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // עדכון שם המשתמש
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="password">Password</label>
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // עדכון הסיסמה
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="phone">Phone</label>
                        <InputText
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} // עדכון מספר הטלפון
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // עדכון כתובת האימייל
                            className="w-full"
                        />
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="Sign Up"
                            onClick={ handleSignUp}// קריאה לפונקציה לטיפול בהרשמה
                            
                        />
                        <Button
                            label="Cancel"
                            className="p-button-secondary"
                            onClick={() => {
                                setVisible(false); // סגירת הדיאלוג
                                resetFields(); // איפוס השדות כאשר הדיאלוג נסגר
                            }} />
                    </div>
                </div>
            </Dialog>
        </div>

    );
}


